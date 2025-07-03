const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const customerModel = require("../models/customerModel");

// Register
exports.registerCustomer = (req, res) => {
  const { name, email, phone, password, gender, city, date_of_birth } = req.body;

  customerModel.findCustomerByEmail(email, async (err, existing) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      customerModel.createCustomer(name, email, phone, hashedPassword, gender, city, date_of_birth, (err, id) => {
        if (err) return res.status(500).json({ message: "Error creating customer" });
        res.status(201).json({ message: "Customer registered", customerId: id });
      });
    } catch (hashErr) {
      res.status(500).json({ message: "Error hashing password" });
    }
  });
};

// Login
exports.loginCustomer = (req, res) => {
  const { email, password } = req.body;

  customerModel.findCustomerByEmail(email, async (err, customer) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const valid = await bcrypt.compare(password, customer.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: customer.id, email: customer.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    console.log("Login successful for:", customer.name);
    console.log("Returning customer data:", {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      gender: customer.gender,
      city: customer.city,
      date_of_birth: customer.date_of_birth,
    });

    res.status(200).json({
      message: "Login successful",
      token,
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        gender: customer.gender,  
        city: customer.city,      
        date_of_birth: customer.date_of_birth 
      },
    });
  });
};

// Get all customers
exports.getCustomers = (req, res) => {
  customerModel.getAllCustomers((err, customers) => {
    if (err) return res.status(500).json({ message: "Error fetching customers" });
    res.status(200).json(customers);
  });
};

// Get customer by ID
exports.getCustomerById = (req, res) => {
  const { id } = req.params;
  customerModel.getCustomerById(id, (err, customer) => {
    if (err) return res.status(500).json({ message: "Error fetching customer" });
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json(customer);
  });
};

exports.updateCustomer = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, gender, city, date_of_birth } = req.body;
  console.log("Update customer request received");

  customerModel.updateCustomer(id, name, email, phone, gender, city, date_of_birth, (err, updated) => {
    if (err) return res.status(500).json({ message: "Update failed" });
    if (!updated) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json({ message: "Customer updated" });
  });
};

// Profile update (self)
exports.updateProfile = (req, res) => {
  const customerId = req.user.id;
  const { name, email, phone, gender, city, date_of_birth } = req.body;
  console.log("Updating profile for customer ID:", customerId);
  console.log("Profile data:", { name, email, phone, gender, city, date_of_birth });

  customerModel.updateCustomer(customerId, name, email, phone, gender, city, date_of_birth, (err, updated) => {
    if (err) {
      console.error("Error updating profile:", err);
      return res.status(500).json({ message: "Profile update failed" });
    }
    if (!updated) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json({ message: "Profile updated" });
  });
};


// Refresh customer info (from token)
exports.refreshCustomer = (req, res) => {
  const customerId = req.user.id;
  customerModel.getCustomerById(customerId, (err, customer) => {
    if (err) return res.status(500).json({ message: "Error fetching profile" });
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json(customer);
  });
};

// Change password
exports.changePassword = (req, res) => {
  console.log("Change password request received");
  console.log("Request body:", req.user);
  console.log("Request body:", req.body);

  const customerId = req.user.id;
  const { currentPassword, newPassword } = req.body;
  console.log("Changing password for customer ID:", customerId);
  console.log("Current password:", currentPassword, newPassword);

  customerModel.findCustomerByEmail(req.user.email, async (err, customer) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const valid = await bcrypt.compare(currentPassword, customer.password);
    if (!valid) return res.status(401).json({ message: "Incorrect current password" });

    const password = await bcrypt.hash(newPassword, 10);
    customerModel.updateCustomerPassword(customerId, password, (err, updated) => {
      if (err) return res.status(500).json({ message: "Password update failed" });
      if (!updated) return res.status(404).json({ message: "Customer not found" });
      res.status(200).json({ message: "Password changed successfully" });
    });
  });
};
