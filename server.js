// --- Configuration ---
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const app = express();
// *** CHANGE 1: Fix the Node.js server port to 3000 to avoid conflict ***
const port = 3000; //balls

// IMPORTANT: Replace these with your actual MySQL credentials
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "Iloveballs@2014",
  port: 5500, //balls
  database: "datastructures_db",
};

// Create MySQL connection pool
const pool = mysql.createPool(dbConfig);

// --- Middleware ---
// Enable CORS to allow your HTML file (which runs on a different protocol/port) to access the API
app.use(cors());
app.use(express.json()); // Enable JSON body parsing

// --- Data Transformation Helper ---
// This function takes the flat SQL results and structures them into the nested JSON array
function structureData(results) {
  const modulesMap = new Map();

  results.forEach((row) => {
    const moduleId = row.id;

    // 1. Create or retrieve the main module object
    if (!modulesMap.has(moduleId)) {
      modulesMap.set(moduleId, {
        id: moduleId,
        title: row.title,
        longDescription: row.long_description,
        prerequisites: [],
      });
    }

    // 2. Add the prerequisite to the module's prerequisites array
    if (row.prereq_id) {
      // Only add if a prerequisite exists
      const module = modulesMap.get(moduleId);
      module.prerequisites.push({
        id: row.prereq_id,
        title: row.prereq_title,
        description: row.prereq_description,
        order: row.prereq_order,
      });
    }
  });

  // 3. Convert Map values back to an array
  const finalModules = Array.from(modulesMap.values());

  // Ensure prerequisites within each module are sorted by order
  finalModules.forEach((module) => {
    module.prerequisites.sort((a, b) => a.order - b.order);
  });

  return finalModules;
}

// --- API Endpoint ---
app.get("/api/modules", (req, res) => {
  // This is the SQL query from the previous step
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
      return res.status(500).json({ error: "Database query failed." });
    }

    // Transform the flat results into the nested structure the frontend expects
    const structuredData = structureData(results);

    // Send the JSON response to the browser
    res.json(structuredData);
  });
});

// --- Compilation Endpoint ---
app.post("/api/compile", (req, res) => {
  const { code, input } = req.body;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  // Create a unique temporary file name
  const timestamp = Date.now();
  const filePath = path.join(__dirname, `temp_${timestamp}.c`);
  const outPath = path.join(__dirname, `temp_${timestamp}.out`);

  // Write code to file
  fs.writeFile(filePath, code, (err) => {
    if (err) {
      console.error("File Write Error:", err);
      return res.status(500).json({ error: "Failed to write code to file" });
    }

    // Compile the code
    exec(`gcc "${filePath}" -o "${outPath}"`, (compileErr, stdout, stderr) => {
      if (compileErr) {
        // Cleanup source file
        fs.unlink(filePath, () => {});
        return res.json({ output: stderr, error: true }); // Return compilation error as output
      }

      // Execute the compiled binary
      // Use printf to pipe input if provided
      const runCommand = input ? `echo "${input}" | "${outPath}"` : `"${outPath}"`;

      exec(runCommand, { timeout: 2000 }, (runErr, runStdout, runStderr) => {
        // Cleanup files
        fs.unlink(filePath, () => {});
        fs.unlink(outPath, () => {});

        if (runErr) {
            // Handle timeout or runtime errors
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

// --- Start Server ---
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Access API at: http://localhost:${port}/api/modules`);
});

// Helper function to handle map key case sensitivity that can arise from SQL results
function normalizeKey(key) {
  return key.toLowerCase().replace(/_/g, "");
}
