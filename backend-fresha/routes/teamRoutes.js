const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  createTeamMember,
  getTeamByBusiness,
  updateTeamMember,
  deleteTeamMember,
  getAllTeamMembers,
} = require('../controllers/teamController');

router.post('/create', upload.single('photo'), createTeamMember);
router.get('/business/:business_id', getTeamByBusiness);
router.put('/update/:id', upload.single('photo'), updateTeamMember);
router.delete('/delete/:id', deleteTeamMember);
router.get('/display', getAllTeamMembers);



module.exports = router;
