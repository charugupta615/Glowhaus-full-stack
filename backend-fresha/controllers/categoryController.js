const Category = require('../models/categoryModel');

exports.getAll = (req, res) => {
  Category.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.create = (req, res) => {
  Category.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId });
  });
};

exports.update = (req, res) => {
  Category.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.sendStatus(200);
  });
};

exports.delete = (req, res) => {
  Category.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.sendStatus(200);
  });
};
