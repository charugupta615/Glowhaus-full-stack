const db = require("../config/db");

// Find admin by email
exports.findAdminByEmail = (email, callback) => {
  db.query("SELECT * FROM admins WHERE email = ?", [email], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]); // single admin
  });
};

// Create a new admin
exports.createAdmin = (name, email, password, callback) => {
  db.query(
    "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.insertId);
    }
  );
};
