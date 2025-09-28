const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

const adminAuth = (req, res, next) => {
    const token = req.headers['x-admin-token'] || req.query.admin_token;
    if (!process.env.ADMIN_TOKEN) {
        return res.status(500).json({ message: 'Admin token not configured on server' });
    }
    if (!token || token !== process.env.ADMIN_TOKEN) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    return next();
};

router.get('/bookings', adminAuth, adminController.listBookings);
router.post('/bookings/:id/assign', adminAuth, adminController.assignBooking);

module.exports = router;
