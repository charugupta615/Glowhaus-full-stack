const db = require('../config/db');

exports.getAvailabilityByTeamMemberAndDate = (team_member_id, date, callback) => {
  db.query(
    'SELECT * FROM availability WHERE team_member_id = ? AND date = ? AND is_available = TRUE',
    [team_member_id, date],
    callback
  );
};

exports.addAvailability = (data, callback) => {
  db.query('INSERT INTO availability (team_member_id, date, start_time, end_time, is_available) VALUES ?', 
    [data.map(slot => [slot.team_member_id, slot.date, slot.start_time, slot.end_time, slot.is_available])],
    callback
  );
};

exports.updateAvailability = (id, data, callback) => {
  db.query('UPDATE availability SET ? WHERE id = ?', [data, id], callback);
};
