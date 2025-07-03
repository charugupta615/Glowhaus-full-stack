const db = require('../config/db');

const FavoritesModel = {
  addFavorite: (customer_id, business_id, callback) => {
    const sql = 'INSERT IGNORE INTO favorites (customer_id, business_id) VALUES (?, ?)';
    db.query(sql, [customer_id, business_id], callback);
  },

  getFavoritesByCustomer: (customer_id, callback) => {
    const sql = `
      SELECT 
        f.id AS id,
        f.created_at,
        b.id AS business_id,
        b.name AS business_name,
        b.slug AS business_slug,
        b.rating AS business_rating,
        b.votes AS business_votes,
        b.status AS business_status,
        b.address AS business_address,
        b.main_image,
        b.side_image,
        b.side_image1,
        b.open_until,
        c.id AS category_id,
        c.name AS category_name
      FROM favorites f
      JOIN business b ON f.business_id = b.id
      LEFT JOIN categories c ON b.category_id = c.id
      WHERE f.customer_id = ?
    `;
    db.query(sql, [customer_id], callback);
  },

  removeFavorite: (customer_id, business_id, callback) => {
    const sql = 'DELETE FROM favorites WHERE customer_id = ? AND business_id = ?';
    db.query(sql, [customer_id, business_id], callback);
  }
};

module.exports = FavoritesModel;
