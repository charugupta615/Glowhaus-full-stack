const Mapping = require('../models/mappingModel');

exports.display = (req, res) => {
  Mapping.getBusinessBySection((err, results) => {
    console.log("results", results);
    
    if (err) return res.status(500).json({ error: err });

    const sectionsMap = {};
    results.forEach(row => {
      if (!sectionsMap[row.section_id]) {
        sectionsMap[row.section_id] = {
          id: row.section_id,
          name: row.section_name,
          slug: row.section_slug,
          priority: row.priority,
          isActive: !!row.isActive,
          isEnabled: !!row.isEnabled,
          business: []
        };
      }

      sectionsMap[row.section_id].business.push({
        id: row.id,
        name: row.name,
        slug: row.business_slug,
        average_rating: parseFloat(row.average_rating).toFixed(1), 
    total_reviews: row.total_reviews,
        address: row.address,
        status: row.status,
        image: row.image,
        main_image: row.main_image,
        category: {
          id: row.category_id,
          name: row.category_name
        }
      });
    });

    res.json({ sections: Object.values(sectionsMap) });
  });
};
