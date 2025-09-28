const rideModel = require('../models/ride.model');
const captainModel = require('../models/captain.model');
const { sendMessageToSocketId } = require('../socket');

module.exports.listBookings = async (req, res) => {
    const status = req.query.status || 'pending';
    try {
        const bookings = await rideModel.find({ bookingStatus: status }).populate('user').populate('captain');
        return res.status(200).json(bookings);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.assignBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const { captainId, assignedBy } = req.body;
        if (!captainId) return res.status(400).json({ message: 'captainId required' });

        const captain = await captainModel.findById(captainId);
        if (!captain) return res.status(404).json({ message: 'Captain not found' });

        const booking = await rideModel.findByIdAndUpdate(bookingId, {
            captain: captain._id,
            bookingStatus: 'assigned',
            assignedAt: new Date(),
            assignedBy: assignedBy || 'operator'
        }, { new: true }).populate('user').populate('captain');

        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        // notify user via socket (if user has socketId)
        if (booking.user && booking.user.socketId) {
            sendMessageToSocketId(booking.user.socketId, {
                event: 'driver-assigned',
                data: booking
            });
        }

        // notify captain via socket (if captain has socketId)
        if (captain.socketId) {
            sendMessageToSocketId(captain.socketId, {
                event: 'assigned-ride',
                data: booking
            });
        }

        return res.status(200).json(booking);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
