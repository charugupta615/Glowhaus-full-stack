const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModel");

exports.registerAdmin = (req, res) => {
  const { name, email, password } = req.body;

  adminModel.findAdminByEmail(email, async (err, existing) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      adminModel.createAdmin(name, email, hashedPassword, (err, id) => {
        if (err) return res.status(500).json({ message: "Error creating admin" });
        res.status(201).json({ message: "Admin registered", adminId: id });
      });
    } catch (hashErr) {
      res.status(500).json({ message: "Error hashing password" });
    }
  });
};

exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;

  adminModel.findAdminByEmail(email, async (err, admin) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin.id, email: admin.email, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email },
    });
  });
};
