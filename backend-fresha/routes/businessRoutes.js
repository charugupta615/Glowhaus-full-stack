// const express = require("express");
// const router = express.Router();
// const controller = require('../controllers/businessController');
// const upload = require('../middleware/upload');

// // CREATE
// router.post(
//   "/create",
//   upload.fields([
//     { name: "main_image", maxCount: 1 }, 
//     { name: "side_image", maxCount: 1 }, 
//     { name: "side_image1", maxCount: 1 },
//     { name: 'image', maxCount: 1 },
//   ]),
//   controller.create
// );

// // UPDATE
// router.put(
//   "/update/:id",
//   upload.fields([
//     { name: "main_image", maxCount: 1 },
//     { name: "side_image", maxCount: 1 },
//     { name: "side_image1", maxCount: 1 },
//     { name: 'image', maxCount: 1 },
//   ]),
//   controller.update
// );

// // GET ALL
// router.get("/display", controller.getAll);

// // GET FULL DETAILS BY ID
// router.get("/display/:id", controller.displayById);
// // GET FULL DETAILS BY SLUG
// router.get("/display/slug/:slug", controller.displayBySlug);



// // DELETE
// router.delete("/delete/:id", controller.delete);

// // UPDATE STATUS
// router.put("/update-status/:id", controller.updateStatus);

// router.post('/login', controller.login);

// module.exports = router;



const express = require("express");
const router = express.Router();
const controller = require('../controllers/businessController');
const upload = require('../middleware/upload');
const auth = require('../middleware/authMiddleware'); 

// CREATE
router.post(
  "/create",
  upload.fields([
    { name: "main_image", maxCount: 1 }, 
    { name: "side_image", maxCount: 1 }, 
    { name: "side_image1", maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]),
  controller.create
);

// UPDATE
router.put(
  "/update/:id",
  upload.fields([
    { name: "main_image", maxCount: 1 },
    { name: "side_image", maxCount: 1 },
    { name: "side_image1", maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]),
  controller.update
);

// GET ALL
router.get("/display", controller.getAll);

// GET FULL DETAILS BY ID
router.get("/display/:id", controller.displayById);

// GET FULL DETAILS BY SLUG
router.get("/display/slug/:slug", controller.displayBySlug);

// DELETE
router.delete("/delete/:id", controller.delete);

// UPDATE STATUS
router.put("/update-status/:id", controller.updateStatus);

// LOGIN
router.post("/login", controller.login);

router.get("/dashboard", auth.verifyToken, controller.dashboard);

// ✅ New: Count customers for a business
router.get("/count/customers/:id", controller.countCustomers);

// ✅ New: Count bookings for a business
router.get("/count/bookings/:id", controller.countBookings);

// ✅ New: Count team for a business
router.get("/count/team/:id", controller.countTeam);

// ✅ New: Count services for a business
router.get("/count/services/:id", controller.countServices);

module.exports = router;



