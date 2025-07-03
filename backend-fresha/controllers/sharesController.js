const SharesModel = require('../models/sharesModel');

exports.logShare = (req, res) => {
  const { customer_id, business_id, platform } = req.body;

  SharesModel.logShare(customer_id, business_id, platform, (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(201).json({ message: 'Share logged' });
  });
};
