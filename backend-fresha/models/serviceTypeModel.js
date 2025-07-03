const db = require('../config/db');

exports.createServiceType = (data, callback) => {
  db.query('INSERT INTO service_type SET ?', data, callback);
};

exports.getServiceTypesByBusiness = (business_id, callback) => {
  db.query('SELECT * FROM service_type WHERE business_id = ?', [business_id], callback);
};

exports.updateServiceType = (id, data, callback) => {
  db.query('UPDATE service_type SET ? WHERE id = ?', [data, id], callback);
};

exports.deleteServiceType = (id, callback) => {
  db.query('DELETE FROM service_type WHERE id = ?', [id], callback);
};
