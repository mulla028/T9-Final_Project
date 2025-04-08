const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, notificationController.getUserNotifications);
// router.post('/', authMiddleware, notificationController.createNotification);
router.delete('/:id', authMiddleware, notificationController.dismissNotification);
router.patch('/mark-all-read', authMiddleware, notificationController.markAllAsRead);
router.patch('/:id', authMiddleware, notificationController.markAsRead);
router.get('/unread-count', authMiddleware, notificationController.getUnreadCount);

module.exports = router;
