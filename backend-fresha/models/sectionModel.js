const db = require('../config/db');

module.exports = {
  getAll: (cb) => db.query('SELECT * FROM sections', cb),

  create: (data, cb) => db.query('INSERT INTO sections SET ?', data, cb),

  update: (id, data, cb) => db.query('UPDATE sections SET ? WHERE id = ?', [data, id], cb),

  delete: (id, cb) => db.query('DELETE FROM sections WHERE id = ?', [id], cb),
  getAllWithBusiness: (cb) => {
    const query = `
      SELECT 
        s.id,
        s.name,
        s.slug,
        s.priority,
        s.isActive,
        s.isEnabled,
        b.id AS business_id,
        b.name AS businessName,
        b.slug AS businessSlug,
        IFNULL(AVG(r.rating), 0) AS average_rating,
        COUNT(r.id) AS total_reviews,
        b.address,
        b.status,
        b.main_image AS image,
        c.id AS category_id,
        c.name AS categoryName
      FROM sections s
      LEFT JOIN section_business sb ON s.id = sb.section_id
      LEFT JOIN business b ON b.id = sb.business_id
      LEFT JOIN categories c ON b.category_id = c.id
      LEFT JOIN reviews r ON r.business_id = b.id
      GROUP BY 
        s.id, s.name, s.slug, s.priority, s.isActive, s.isEnabled, 
        b.id, b.name, b.slug, b.address, b.status, b.main_image, 
        c.id, c.name
      ORDER BY s.priority ASC;
    `;
    db.query(query, cb);
  }
  
};

