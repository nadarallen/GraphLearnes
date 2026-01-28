const { Pool } = require("pg");
require("dotenv").config();

// Config helper to handle DATABASE_URL or component parts
let dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "datastructures_db",
  ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false
};

if (process.env.DATABASE_URL) {
    dbConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false } // Required for most cloud Postgres providers (Render, Neon)
    };
}

const pool = new Pool(dbConfig);

const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS ds_modules (
        module_id SERIAL PRIMARY KEY,
        module_title VARCHAR(255) NOT NULL,
        long_description TEXT
    );

    CREATE TABLE IF NOT EXISTS prerequisites (
        prereq_id SERIAL PRIMARY KEY,
        module_fk INTEGER REFERENCES ds_modules(module_id) ON DELETE CASCADE,
        prereq_title VARCHAR(255),
        prereq_description TEXT,
        prereq_order INTEGER
    );
`;

const seedDataQuery = `
    INSERT INTO ds_modules (module_title, long_description) VALUES
    ('Introduction to Data Structures', 'Fundamentals of data organization and storage formats.'),
    ('Stacks & Queues', 'LIFO and FIFO linear data structure implementation.'),
    ('Linked Lists', 'Dynamic memory allocation and pointer manipulation.'),
    ('Trees', 'Hierarchical data structures, BST, and traversals.')
    ON CONFLICT DO NOTHING;

    -- Note: We assume IDs 1-4 for the above. In a real script we might look them up, 
    -- but for a fresh start with SERIAL, this usually works on first run.
    
    INSERT INTO prerequisites (module_fk, prereq_title, prereq_description, prereq_order) VALUES
    (1, 'Basic C/C++/Java', 'Control loops and syntax', 1),
    (1, 'Variables', 'Data types', 2),
    (2, 'Array Operations', 'Indexing and loops', 1),
    (2, 'Functions', 'Modular code', 2),
    (3, 'Pointers', 'Memory addresses', 1),
    (3, 'Structs', 'Custom data types', 2),
    (4, 'Recursion', 'Self-calling functions', 1),
    (4, 'Linked Lists', 'Node based structures', 2)
    ON CONFLICT DO NOTHING;
`;

async function initDB() {
  try {
    console.log("Initializing Database...");
    
    // 1. Create Tables
    await pool.query(createTablesQuery);
    console.log("Tables created successfully.");

    // 2. Check if data exists
    const res = await pool.query('SELECT COUNT(*) FROM ds_modules');
    const count = parseInt(res.rows[0].count);

    if (count === 0) {
        console.log("Database empty. Seeding data...");
        await pool.query(seedDataQuery);
        console.log("Data seeded successfully.");
    } else {
        console.log("Database already contains data. Skipping seed.");
    }

  } catch (err) {
    console.error("Error initializing database:", err);
  } finally {
    await pool.end();
  }
}

// Run if executed directly
if (require.main === module) {
  initDB();
}

module.exports = initDB;
