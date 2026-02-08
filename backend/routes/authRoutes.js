const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb, saveDatabase } = require('../database/db');
const { authenticateToken } = require('../middleware/auth');

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const db = await getDb();

        // Check if user already exists
        const existingUser = db.exec(`SELECT * FROM users WHERE email = '${email}'`);
        if (existingUser.length > 0 && existingUser[0].values.length > 0) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Insert user
        db.run(`INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)`,
            [username, email, passwordHash, 'customer']);
        saveDatabase();

        // Get last inserted ID
        const result = db.exec('SELECT last_insert_rowid() as id');
        const userId = result[0].values[0][0];

        res.status(201).json({
            message: 'User registered successfully',
            userId
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error during registration' });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const db = await getDb();

        // Find user
        const result = db.exec(`SELECT * FROM users WHERE email = '${email}'`);
        if (result.length === 0 || result[0].values.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const userRow = result[0].values[0];
        const user = {
            id: userRow[0],
            username: userRow[1],
            email: userRow[2],
            password_hash: userRow[3],
            role: userRow[4]
        };

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
});

// Logout user
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
});

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
    try {
        const db = await getDb();
        const result = db.exec(`SELECT id, username, email, role FROM users WHERE id = ${req.user.id}`);

        if (result.length === 0 || result[0].values.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userRow = result[0].values[0];
        const user = {
            id: userRow[0],
            username: userRow[1],
            email: userRow[2],
            role: userRow[3]
        };

        res.json({ user });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
