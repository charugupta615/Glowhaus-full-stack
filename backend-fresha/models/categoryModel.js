const db = require('../config/db');
module.exports = {
  getAll: (cb) => db.query('SELECT * FROM categories', cb),
  create: (data, cb) => db.query('INSERT INTO categories SET ?', data, cb),
  update: (id, data, cb) => db.query('UPDATE categories SET ? WHERE id = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM categories WHERE id = ?', [id], cb),
};
