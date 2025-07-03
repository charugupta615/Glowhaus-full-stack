const db = require('../config/db');

const SharesModel = {
  logShare: (customer_id, business_id, platform, callback) => {
    const sql = 'INSERT INTO shares (customer_id, business_id, platform) VALUES (?, ?, ?)';
    db.query(sql, [customer_id, business_id, platform], callback);
  }
};

module.exports = SharesModel;
