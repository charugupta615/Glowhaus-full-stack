const Section = require('../models/sectionModel');
const Mapping = require('../models/mappingModel');

exports.getSectionsWithBusiness = (req, res) => {
  Section.getAllWithBusiness((err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const sectionMap = new Map();

    results.forEach(row => {
      if (!sectionMap.has(row.id)) {
        sectionMap.set(row.id, {
          id: row.id,
          name: row.name,
          slug: row.slug,
          priority: row.priority,
          isActive: !!row.isActive,
          isEnabled: !!row.isEnabled,
          business: []
        });
      }

      if (row.business_id) {
        sectionMap.get(row.id).business.push({
          id: row.business_id,
          name: row.businessName,
          slug: row.businessSlug,
          average_rating: parseFloat(row.average_rating).toFixed(1), 
    total_reviews: row.total_reviews,
          address: row.address,
          status: row.status,
          image: row.main_image || row.image,
          category: {
            id: row.category_id,
            name: row.categoryName
          }
        });
      }
    });

    res.json({ data: { sections: Array.from(sectionMap.values()) } });
  });
};

exports.getAll = (req, res) => {
  Section.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.create = (req, res) => {
  Section.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId });
  });
};

exports.update = (req, res) => {
  Section.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.sendStatus(200);
  });
};

exports.delete = (req, res) => {
  Section.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.sendStatus(200);
  });
};

exports.addBusiness = (req, res) => {
  Mapping.addBusinessToSection(req.params.sectionId, req.params.businessId, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.sendStatus(200);
  });
};

exports.removeBusiness = (req, res) => {
  Mapping.removeBusinessFromSection(req.params.sectionId, req.params.businessId, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.sendStatus(200);
  });
};
