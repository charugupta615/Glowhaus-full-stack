const serviceModel = require('../models/serviceModel');

exports.createService = (req, res) => {
  serviceModel.createService(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Service created', id: result.insertId });
  });
};

exports.getServicesByType = (req, res) => {
  serviceModel.getServicesByType(req.params.service_type_id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.getServicesByBusiness = (req, res) => {
  serviceModel.getServicesByBusiness(req.params.business_id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.updateService = (req, res) => {
  serviceModel.updateService(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Service updated' });
  });
};

exports.deleteService = (req, res) => {
  serviceModel.deleteService(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Service deleted' });
  });
};

exports.getAllServices = (req, res) => {
  serviceModel.getAllServices((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
