const notificationService = require('../services/notificationService');

async function getNotifications(req, res, next) {
  try {
    const list = await notificationService.getNotifications(req.user.id);
    res.json(list);
  } catch (error) {
    next(error);
  }
}

async function markAsRead(req, res, next) {
  try {
    const notif = await notificationService.markAsRead(req.params.id);
    if (!notif) {
      return res.status(404).json({ message: 'Notification not found.' });
    }
    res.json(notif);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getNotifications,
  markAsRead
};
