const db = require('../config/db');
const mockData = require('../seed/mockData');
const crypto = require('crypto');

async function getNotifications(userId) {
  if (db.getIsFallback()) {
    return mockData.notifications.filter(n => n.user_id === userId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  const result = await db.pool.query(
    'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
}

async function markAsRead(id) {
  if (db.getIsFallback()) {
    const notification = mockData.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      return notification;
    }
    return null;
  }

  const result = await db.pool.query(
    'UPDATE notifications SET read = true WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0] || null;
}

async function createNotification(userId, title, message) {
  const id = crypto.randomUUID();
  const newNotif = {
    id,
    user_id: userId,
    title,
    message,
    read: false,
    created_at: new Date().toISOString()
  };

  if (db.getIsFallback()) {
    mockData.notifications.push(newNotif);
    return newNotif;
  }

  const queryText = `
    INSERT INTO notifications (id, user_id, title, message)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const result = await db.pool.query(queryText, [id, userId, title, message]);
  return result.rows[0];
}

module.exports = {
  getNotifications,
  markAsRead,
  createNotification
};
