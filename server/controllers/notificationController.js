const Notification = require('../models/Notification');

// GET /api/notifications
exports.getUserNotifications = async (req, res) => {
    const notifications = await Notification.find({ userId: req.user.id, isRead: false }).sort({ timestamp: -1 });
    res.json(notifications);
};

// POST /api/notifications
exports.createNotification = async (req, res) => {
    const { type, message, icon, relatedId } = req.body;
    const newNotification = new Notification({
        userId: req.user.id,
        type,
        message,
        icon,
        relatedId,
    });
    await newNotification.save();
    res.status(201).json(newNotification);
};

// PATCH /api/notifications/:id/read
exports.markAsRead = async (req, res) => {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.sendStatus(204);
};

exports.markAllAsRead = async (req, res) => {
    await Notification.updateMany({ userId: req.user.id, isRead: false }, { isRead: true });
    res.sendStatus(204);
}

// DELETE /api/notifications/:id
exports.dismissNotification = async (req, res) => {
    await Notification.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
};

// GET /api/notifications/unread-count
exports.getUnreadCount = async (req, res) => {
    const count = await Notification.countDocuments({ userId: req.user.id, isRead: false });
    res.json({ unreadCount: count });
};