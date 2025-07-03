// const db = require('../config/db');
// module.exports = {
//   addBusinessToSection: (section_id, business_id, cb) =>
//     db.query('INSERT INTO section_business (section_id, business_id) VALUES (?, ?)', [section_id, business_id], cb),

//   removeBusinessFromSection: (section_id, business_id, cb) =>
//     db.query('DELETE FROM section_business WHERE section_id = ? AND business_id = ?', [section_id, business_id], cb),

//   getBusinessBySection: (cb) =>
//     db.query(
//       `SELECT 
//         s.id,
//         s.name,
//         s.slug AS business_slug,
//         s.rating,
//         s.votes,
//         s.address,
//         s.status,
//         s.image,
//         sec.id AS section_id,
//         sec.name AS section_name,
//         sec.slug AS section_slug,
//         sec.priority,
//         sec.isActive,
//         sec.isEnabled,
//         c.id AS category_id,
//         c.name AS category_name
//      FROM sections sec
//      JOIN section_business ss ON sec.id = ss.section_id
//      JOIN business s ON s.id = ss.business_id
//      JOIN categories c ON s.category_id = c.id`,
//     cb
//     ),
// };





const db = require('../config/db');

module.exports = {
  addBusinessToSection: (section_id, business_id, cb) =>
    db.query(
      'INSERT INTO section_business (section_id, business_id) VALUES (?, ?)',
      [section_id, business_id],
      cb
    ),

  removeBusinessFromSection: (section_id, business_id, cb) =>
    db.query(
      'DELETE FROM section_business WHERE section_id = ? AND business_id = ?',
      [section_id, business_id],
      cb
    ),

  getBusinessBySection: (cb) =>
    db.query(
      `SELECT 
        b.id,
        b.name,
        b.slug AS business_slug,
        b.address,
        b.status,
        b.image,
        b.main_image,
        
        sec.id AS section_id,
        sec.name AS section_name,
        sec.slug AS section_slug,
        sec.priority,
        sec.isActive,
        sec.isEnabled,

        c.id AS category_id,
        c.name AS category_name,

        ROUND(AVG(r.rating), 1) AS average_rating,
        COUNT(r.id) AS total_reviews

      FROM section_business sb
      JOIN sections sec ON sec.id = sb.section_id
      JOIN business b ON b.id = sb.business_id
      LEFT JOIN categories c ON b.category_id = c.id
      LEFT JOIN reviews r ON r.business_id = b.id

      GROUP BY b.id, sec.id
      ORDER BY sec.priority ASC`,
      cb
    ),
};
