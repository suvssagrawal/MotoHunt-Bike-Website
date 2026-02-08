const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

// Database file path
const dbPath = path.join(__dirname, 'motohunt.db');
const schemaPath = path.join(__dirname, 'schema.sql');
const seedPath = path.join(__dirname, 'seed.sql');

let db;

async function initDatabase() {
    const SQL = await initSqlJs();
    const dbExists = fs.existsSync(dbPath);

    if (dbExists) {
        // Load existing database
        const buffer = fs.readFileSync(dbPath);
        db = new SQL.Database(buffer);
        console.log('✓ Database loaded successfully');
    } else {
        // Create new database
        console.log('Database does not exist. Creating and initializing...');
        db = new SQL.Database();

        try {
            // Execute schema
            const schema = fs.readFileSync(schemaPath, 'utf8');
            db.exec(schema);
            console.log('✓ Schema created successfully');

            // Execute seed data
            const seed = fs.readFileSync(seedPath, 'utf8');
            db.exec(seed);
            console.log('✓ Seed data inserted successfully');

            // Save database to file
            const data = db.export();
            fs.writeFileSync(dbPath, data);
            console.log('✓ Database initialized and saved successfully!');
        } catch (error) {
            console.error('Error initializing database:', error);
            throw error;
        }
    }

    return db;
}

// Helper function to save database after writes
function saveDatabase() {
    const data = db.export();
    fs.writeFileSync(dbPath, data);
}

// Export promise that resolves to database
let dbPromise = initDatabase();

module.exports = {
    getDb: async () => {
        if (!db) {
            await dbPromise;
        }
        return db;
    },
    saveDatabase
};
