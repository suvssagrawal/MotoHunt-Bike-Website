require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Import routes
const authRoutes = require('./routes/authRoutes');
const bikeRoutes = require('./routes/bikeRoutes');
const brandRoutes = require('./routes/brandRoutes');
const dealerRoutes = require('./routes/dealerRoutes');
const testRideRoutes = require('./routes/testRideRoutes');

// Initialize database
require('./database/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bikes', bikeRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/dealers', dealerRoutes);
app.use('/api/test-rides', testRideRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'MotoHunt API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`
  ╔═══════════════════════════════════════╗
  ║     🏍️  MotoHunt API Server 🏍️      ║
  ╠═══════════════════════════════════════╣
  ║  Status: Running                      ║
  ║  Port: ${PORT}                           ║
  ║  Environment: ${process.env.NODE_ENV || 'development'}              ║
  ║  Database: SQLite                     ║
  ╚═══════════════════════════════════════╝
  `);
});
