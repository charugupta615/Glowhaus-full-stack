const db = require('../config/db');

// Get reviews by business ID
exports.getByBusinessId = (businessId, callback) => {
  const sql = 'SELECT * FROM reviews WHERE business_id = ? ORDER BY created_at DESC';
  db.query(sql, [businessId], callback);
};

// Get all reviews (for homepage)
exports.getAll = (callback) => {
  const sql = 'SELECT * FROM reviews ORDER BY created_at DESC';
  db.query(sql, callback);
};

// Add a new review
exports.create = (data, callback) => {
  const { business_id, customer_name, rating, comment } = data;
  const sql = 'INSERT INTO reviews (business_id, customer_name, rating, comment) VALUES (?, ?, ?, ?)';
  db.query(sql, [business_id, customer_name, rating, comment], callback);
};
