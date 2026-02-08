const express = require('express');
const router = express.Router();
const { getDb, saveDatabase } = require('../database/db');
const { authenticateToken } = require('../middleware/auth');

// Create test ride booking
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { bike_id, booking_date } = req.body;
        const user_id = req.user.id;

        if (!bike_id || !booking_date) {
            return res.status(400).json({ error: 'Bike ID and booking date are required' });
        }

        const db = await getDb();

        // Get random dealer
        const dealersResult = db.exec('SELECT id FROM dealers');

        if (!dealersResult || dealersResult.length === 0 || !dealersResult[0].values || dealersResult[0].values.length === 0) {
            return res.status(500).json({ error: 'No dealers available' });
        }

        const dealers = dealersResult[0].values.map(row => ({ id: row[0] }));
        const randomDealer = dealers[Math.floor(Math.random() * dealers.length)];

        // Create booking using exec
        db.exec(`
      INSERT INTO test_rides (user_id, bike_id, dealer_id, booking_date, status) 
      VALUES (${user_id}, ${bike_id}, ${randomDealer.id}, '${booking_date}', 'Pending')
    `);
        saveDatabase();

        // Get last inserted ID
        const lastIdResult = db.exec('SELECT last_insert_rowid() as id');
        const bookingId = lastIdResult[0].values[0][0];

        console.log('Booking created with ID:', bookingId);

        // Return simple success response
        res.status(201).json({
            message: 'Test ride booked successfully',
            booking: {
                id: bookingId,
                user_id: user_id,
                bike_id: bike_id,
                dealer_id: randomDealer.id,
                booking_date: booking_date,
                status: 'Pending'
            }
        });
    } catch (error) {
        console.error('Create test ride error:', error);
        res.status(500).json({ error: 'Server error while booking test ride' });
    }
});

// Get user's test ride bookings
router.get('/user/:userId', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if user is requesting their own bookings
        if (parseInt(userId) !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const db = await getDb();
        const result = db.exec(`
      SELECT 
        test_rides.*,
        bikes.model_name,
        bikes.image_url as bike_image,
        brands.name as brand_name,
        dealers.name as dealer_name,
        dealers.city,
        dealers.location_area,
        dealers.contact_number
      FROM test_rides
      JOIN bikes ON test_rides.bike_id = bikes.id
      JOIN brands ON bikes.brand_id = brands.id
      JOIN dealers ON test_rides.dealer_id = dealers.id
      WHERE test_rides.user_id = ${userId}
      ORDER BY test_rides.created_at DESC
    `);

        const bookings = result.length > 0 && result[0].values ? result[0].values.map(row => ({
            id: row[0],
            user_id: row[1],
            bike_id: row[2],
            dealer_id: row[3],
            booking_date: row[4],
            status: row[5],
            created_at: row[6],
            model_name: row[7],
            bike_image: row[8],
            brand_name: row[9],
            dealer_name: row[10],
            city: row[11],
            location_area: row[12],
            contact_number: row[13]
        })) : [];

        res.json({ bookings, count: bookings.length });
    } catch (error) {
        console.error('Get user bookings error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Cancel test ride booking
router.patch('/:bookingId/cancel', authenticateToken, async (req, res) => {
    try {
        const { bookingId } = req.params;
        const userId = req.user.id;

        const db = await getDb();

        // Check if booking exists and belongs to user
        const checkResult = db.exec(`
      SELECT user_id, status FROM test_rides WHERE id = ${bookingId}
    `);

        if (!checkResult || checkResult.length === 0 || !checkResult[0].values || checkResult[0].values.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        const bookingUserId = checkResult[0].values[0][0];
        const currentStatus = checkResult[0].values[0][1];

        // Check if booking belongs to user (unless admin)
        if (bookingUserId !== userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Check if already cancelled
        if (currentStatus === 'Cancelled') {
            return res.status(400).json({ error: 'Booking is already cancelled' });
        }

        // Update status to Cancelled
        db.exec(`
      UPDATE test_rides SET status = 'Cancelled' WHERE id = ${bookingId}
    `);
        saveDatabase();

        res.json({
            message: 'Booking cancelled successfully',
            bookingId: parseInt(bookingId)
        });
    } catch (error) {
        console.error('Cancel booking error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
