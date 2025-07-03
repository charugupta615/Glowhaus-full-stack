const db = require("../config/db"); 

// Find customer by email
exports.findCustomerByEmail = (email, callback) => {
  db.query("SELECT * FROM customers WHERE email = ?", [email], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]); 
  });
};

// Create a new customer
exports.createCustomer = (name, email, phone, hashedPassword, gender, city, dateOfBirth, callback) => {
  db.query(
    "INSERT INTO customers (name, email, phone, password, gender, city, date_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [name, email, phone, hashedPassword, gender, city, dateOfBirth],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.insertId); 
    }
  );
};

// Get all customers
exports.getAllCustomers = (callback) => {
  db.query("SELECT id, name, email, phone, gender, city, date_of_birth FROM customers", (err, results) => {
    if (err) return callback(err, null);
    callback(null, results); 
  });
};

// Get customer by ID
exports.getCustomerById = (id, callback) => {
  db.query(
    "SELECT id, name, email, phone, gender, city, date_of_birth FROM customers WHERE id = ?",
    [id],
    (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]); 
    }
  );
};

// Update customer details (name, email, phone, gender, city, date_of_birth)
exports.updateCustomer = (id, name, email, phone, gender, city, dateOfBirth, callback) => {
  console.log("Updating customer with ID:", id);
  console.log("New customer data:", { name, email, phone, gender, city, dateOfBirth });

  db.query(
    "UPDATE customers SET name = ?, email = ?, phone = ?, gender = ?, city = ?, date_of_birth = ? WHERE id = ?",
    [name, email, phone, gender, city, dateOfBirth, id],
    (err, result) => {
      if (err) return callback(err, null);
      console.log("Update result:", result); // Add this for debugging
      callback(null, result.affectedRows > 0);
    }
  );
};

// Update customer password
exports.updateCustomerPassword = (id, password, callback) => {
  db.query(
    "UPDATE customers SET password = ? WHERE id = ?",
    [password, id],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.affectedRows > 0); 
    }
  );
};
