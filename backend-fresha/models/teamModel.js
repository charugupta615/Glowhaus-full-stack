const db = require('../config/db');

exports.createTeamMember = (data, callback) => {
  db.query('INSERT INTO team SET ?', data, callback);
};

exports.getTeamByBusiness = (business_id, callback) => {
  db.query('SELECT * FROM team WHERE business_id = ?', [business_id], callback);
};
// exports.getTeamByBusiness = (business_id, callback) => {
//   db.query(`
//     SELECT team.*, business.name AS business_name
//     FROM team
//     JOIN business ON team.business_id = business.id
//     WHERE team.business_id = ?
//   `, [business_id], callback);
// };

exports.updateTeamMember = (id, data, callback) => {
  db.query('UPDATE team SET ? WHERE id = ?', [data, id], callback);
};

exports.deleteTeamMember = (id, callback) => {
  db.query('DELETE FROM team WHERE id = ?', [id], callback);
};
exports.getAllTeamMembers = (callback) => {
  db.query('SELECT * FROM team', callback);
};
