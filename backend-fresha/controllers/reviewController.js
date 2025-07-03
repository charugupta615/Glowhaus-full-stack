const Review = require('../models/reviewModel');

exports.getByBusinessId = (req, res) => {
  const { business_id } = req.params;
  Review.getByBusinessId(business_id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Get all reviews (for homepage)
exports.getAll = (req, res) => {
  Review.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};


exports.create = (req, res) => {
  const data = req.body;

  if (!data.business_id || !data.rating) {
    return res.status(400).json({ error: 'Business ID and rating are required' });
  }

  Review.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, message: 'Review added successfully' });
  });
};
