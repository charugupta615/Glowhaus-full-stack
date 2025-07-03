const db = require('../config/db');

exports.createService = (data, callback) => {
  db.query('INSERT INTO services SET ?', data, callback);
};

exports.getServicesByType = (typeId, callback) => {
  db.query('SELECT * FROM services WHERE service_type_id = ?', [typeId], callback);
};

exports.getServicesByBusiness = (business_id, callback) => {
  db.query('SELECT * FROM services WHERE business_id = ?', [business_id], callback);
};

exports.updateService = (id, data, callback) => {
  db.query('UPDATE services SET ? WHERE id = ?', [data, id], callback);
};

exports.deleteService = (id, callback) => {
  db.query('DELETE FROM services WHERE id = ?', [id], callback);
};
exports.getAllServices = (callback) => {
  db.query('SELECT * FROM services', callback);
};
