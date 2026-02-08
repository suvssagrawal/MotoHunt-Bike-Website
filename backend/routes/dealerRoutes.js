const express = require('express');
const router = express.Router();
const { getDb } = require('../database/db');

// Get all dealers
router.get('/', async (req, res) => {
    try {
        const db = await getDb();
        const result = db.exec('SELECT * FROM dealers ORDER BY city ASC');

        const dealers = result.length > 0 && result[0].values ? result[0].values.map(row => ({
            id: row[0],
            name: row[1],
            city: row[2],
            location_area: row[3],
            contact_number: row[4]
        })) : [];

        res.json({ dealers, count: dealers.length });
    } catch (error) {
        console.error('Get dealers error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
