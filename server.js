// --- Configuration ---
require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");
const app = express();

const port = process.env.PORT || 3000;

// Database Configuration
// NOTE: For Vercel, you receive a single DATABASE_URL or specific host/user/pass params from a cloud DB provider.
// Database Configuration
let dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Iloveballs@2014",
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || "datastructures_db",
  connectTimeout: 10000 
};

// Support "One-Click" Database strings (Render/Railway/Heroku)
if (process.env.DATABASE_URL) {
  try {
    const dbUrl = new URL(process.env.DATABASE_URL);
    dbConfig = {
      host: dbUrl.hostname,
      user: dbUrl.username,
      password: dbUrl.password,
      port: dbUrl.port,
      database: dbUrl.pathname.substr(1),
      connectTimeout: 10000
    };
  } catch (e) {
    console.error("Failed to parse DATABASE_URL:", e);
  }
}

// Create MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Check DB Connection on start (Non-blocking)
pool.getConnection((err, connection) => {
  if (err) {
    console.error("WARNING: Database connection failed:", err.message);
    console.error(
      "Ensure your database is running and configuration is correct.",
    );
  } else {
    console.log("Database connected successfully.");
    connection.release();
  }
});

// Check for GCC availability
exec("gcc --version", (err) => {
  if (err) {
    console.warn("WARNING: GCC not found. Compilation endpoint will not work.");
  } else {
    console.log("GCC detected. Compilation endpoint ready.");
  }
});

// --- Middleware ---
app.use(cors());
app.use(express.json());

//Serve Static Files (Frontend)
app.use(express.static(path.join(__dirname, "frontend/dist")));

// --- Data Transformation Helper ---
function structureData(results) {
  const modulesMap = new Map();

  results.forEach((row) => {
    const moduleId = row.id;

    if (!modulesMap.has(moduleId)) {
      modulesMap.set(moduleId, {
        id: moduleId,
        title: row.title,
        longDescription: row.long_description,
        prerequisites: [],
      });
    }

    if (row.prereq_id) {
      const module = modulesMap.get(moduleId);
      module.prerequisites.push({
        id: row.prereq_id,
        title: row.prereq_title,
        description: row.prereq_description,
        order: row.prereq_order,
      });
    }
  });

  const finalModules = Array.from(modulesMap.values());
  finalModules.forEach((module) => {
    module.prerequisites.sort((a, b) => a.order - b.order);
  });

  return finalModules;
}

// --- API Endpoint ---
app.get("/api/modules", (req, res) => {
  const sql = `
        SELECT
            m.module_id AS id,
            m.module_title AS title,
            m.long_description,
            p.prereq_id AS prereq_id,
            p.prereq_title AS prereq_title,
            p.prereq_description AS prereq_description,
            p.prereq_order AS prereq_order
        FROM
            ds_modules m
        LEFT JOIN
            prerequisites p ON m.module_id = p.module_fk
        ORDER BY
            m.module_id, p.prereq_order;
    `;

  pool.query(sql, (err, results) => {
    if (err) {
      console.error("MySQL Query Error:", err);
      return res
        .status(500)
        .json({ error: "Database query failed or DB not connected." });
    }
    const structuredData = structureData(results);
    res.json(structuredData);
  });
});

// --- Compilation Endpoint ---
app.post("/api/compile", (req, res) => {
  const { code, input } = req.body;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  // USE SYSTEM GENERIC TEMP DIR (Required for Vercel/Serverless read-only filesystems)
  const timestamp = Date.now();
  const tempDir = os.tmpdir();
  const filePath = path.join(tempDir, `temp_${timestamp}.c`);
  const outPath = path.join(tempDir, `temp_${timestamp}.out`);

  fs.writeFile(filePath, code, (err) => {
    if (err) {
      console.error("File Write Error:", err);
      return res.status(500).json({ error: "Failed to write code to file" });
    }

    exec(`gcc "${filePath}" -o "${outPath}"`, (compileErr, stdout, stderr) => {
      if (compileErr) {
        fs.unlink(filePath, () => {});
        // If GCC command not found
        if (stderr.includes('not found') || compileErr.message.includes('not found')) {
            return res.json({ output: "Server Error: GCC compiler not available in this environment.", error: true });
        }
        return res.json({ output: stderr, error: true });
      }

      const runCommand = input
        ? `echo "${input}" | "${outPath}"`
        : `"${outPath}"`;

      exec(runCommand, { timeout: 2000 }, (runErr, runStdout, runStderr) => {
        fs.unlink(filePath, () => {});
        fs.unlink(outPath, () => {});

        if (runErr) {
          if (runErr.killed) {
            return res.json({ output: "Time Limit Exceeded", error: true });
          }
          return res.json({ output: runStderr || runErr.message, error: true });
        }

        res.json({ output: runStdout, error: false });
      });
    });
  });
});

// --- Catch-All for Client-Side Routing ---
// This must be the LAST route
app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "frontend/dist", "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res
      .status(404)
      .send("Frontend not built. Run 'npm run build' in frontend directory.");
  }
});

// --- Start Server (Conditional) ---
// Only listen if executed directly (node server.js).
// Vercel imports this as a module, so we export the app instead.
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Access API at: http://localhost:${port}/api/modules`);
  });
}

module.exports = app;

function normalizeKey(key) {
  return key.toLowerCase().replace(/_/g, "");
}
