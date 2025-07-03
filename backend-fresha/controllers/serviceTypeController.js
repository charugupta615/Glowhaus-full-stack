const serviceTypeModel = require('../models/serviceTypeModel');

exports.createServiceType = (req, res) => {
  serviceTypeModel.createServiceType(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Service type created', id: result.insertId });
  });
};

exports.getServiceTypesByBusiness = (req, res) => {
  serviceTypeModel.getServiceTypesByBusiness(req.params.business_id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.updateServiceType = (req, res) => {
  serviceTypeModel.updateServiceType(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Service type updated' });
  });
};

exports.deleteServiceType = (req, res) => {
  serviceTypeModel.deleteServiceType(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Service type deleted' });
  });
};

