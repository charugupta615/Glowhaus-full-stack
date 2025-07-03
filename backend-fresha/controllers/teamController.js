const teamModel = require('../models/teamModel');

exports.createTeamMember = (req, res) => {
  const { business_id, team_name, role, email, phone, rating } = req.body;
  const photo = req.file ? req.file.filename : null;
  const newTeamMember = { business_id, team_name, role, email, phone, photo, rating };

  teamModel.createTeamMember(newTeamMember, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Team member created', id: result.insertId });
  });
};

exports.getTeamByBusiness = (req, res) => {
  teamModel.getTeamByBusiness(req.params.business_id, (err, result) => {
    if (err) return res.status(500).json(err);

    const updatedResult = result.map(member => ({
      ...member,
      photo: member.photo ? `uploads/${member.photo}` : null,
    }));

    res.json(updatedResult);
  });
};

exports.updateTeamMember = (req, res) => {
  const { team_name, role, email, phone, rating, business_id } = req.body;
  const data = { team_name, role, email, phone, rating, business_id };

  if (req.file) {
    data.photo = req.file.filename;
  }

  teamModel.updateTeamMember(req.params.id, data, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Team member updated' });
  });
};

exports.deleteTeamMember = (req, res) => {
  teamModel.deleteTeamMember(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Team member deleted' });
  });
};
exports.getAllTeamMembers = (req, res) => {
  teamModel.getAllTeamMembers((err, result) => {
    if (err) return res.status(500).json(err);

    const updatedResult = result.map(member => ({
      ...member,
      photo: member.photo ? `uploads/${member.photo}` : null,
    }));

    res.json(updatedResult);
  });
};
