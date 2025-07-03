const express = require("express");
const router = express.Router();

const {
  registerCustomer,
  loginCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  updateProfile,
  refreshCustomer,
  changePassword,
} = require("../controllers/customerController");

const auth = require("../middleware/authMiddleware");


router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.get("/display", auth.verifyToken, getCustomers);
router.put("/change-password", auth.verifyToken, changePassword);
router.put("/profile/update", auth.verifyToken, updateProfile);
router.get("/refresh/me", auth.verifyToken, refreshCustomer);
router.get("/:id", auth.verifyToken, getCustomerById);
//Update customer by ID (admin)
router.put("/display/:id", auth.verifyToken, updateCustomer);

module.exports = router;
