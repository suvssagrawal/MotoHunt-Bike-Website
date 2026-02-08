const express = require('express');
const router = express.Router();
const { getDb } = require('../database/db');

// Get all brands
router.get('/', async (req, res) => {
    try {
        const db = await getDb();
        const result = db.exec('SELECT * FROM brands ORDER BY name ASC');

        const brands = result.length > 0 && result[0].values ? result[0].values.map(row => ({
            id: row[0],
            name: row[1],
            logo_url: row[2],
            country_of_origin: row[3]
        })) : [];

        res.json({ brands, count: brands.length });
    } catch (error) {
        console.error('Get brands error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
