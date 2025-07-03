// const db = require('../config/db');

// module.exports = {
//   // getAll: (cb) => db.query('SELECT * FROM business', cb),
//   getAll: (cb) => {
//     db.query(`
//       SELECT 
//         b.*, 
//         COALESCE(SUM(r.rating), 0) AS rating,
//         COUNT(r.id) AS votes
//       FROM business b
//       LEFT JOIN reviews r ON b.id = r.business_id
//       GROUP BY b.id
//     `, cb);
//   },
  
//   create: (data, cb) => db.query('INSERT INTO business SET ?', data, cb),
//   update: (id, data, cb) => db.query('UPDATE business SET ? WHERE id = ?', [data, id], cb),
//   delete: (id, cb) => db.query('DELETE FROM business WHERE id = ?', [id], cb),
//   updateStatus: (id, status, cb) => db.query('UPDATE business SET status = ? WHERE id = ?', [status, id],cb),

//   getById: (id, cb) => db.query('SELECT * FROM business WHERE id = ?', [id], cb),
//   // ✅ NEW: Get business by slug
//   getBySlug: (slug, cb) => db.query('SELECT * FROM business WHERE slug = ?', [slug], cb),
  
//   // Fetch services related to the business
//   getServicesByBusinessId: (businessId, cb) => {
//     db.query(`
//       SELECT 
//         s.id AS service_id, s.service_name, s.service_description, s.price, s.duration, s.status,
//         st.id AS service_type_id, st.service_type
//       FROM services s
//       JOIN service_type st ON s.service_type_id = st.id
//       WHERE s.business_id = ?
//     `, [businessId], cb);
//   },

//   // Fetch team members related to the business
//   getTeamByBusinessId: (businessId, cb) => {
//     db.query(`
//       SELECT * FROM team WHERE business_id = ?
//     `, [businessId], cb);
//   },

//   // Fetch reviews related to the business
//   getReviewsByBusinessId: (businessId, cb) => {
//     db.query(`
//       SELECT * FROM reviews WHERE business_id = ?
//     `, [businessId], cb);
//   },

//   getByEmail : (email, callback) => {
//   db.query('SELECT * FROM business WHERE email = ?', [email], callback);
// }
// };




const db = require('../config/db');

module.exports = {
  // Get all businesses with rating summary
  getAll: (cb) => {
    db.query(`
      SELECT 
        b.*, 
        COALESCE(SUM(r.rating), 0) AS rating,
        COUNT(r.id) AS votes
      FROM business b
      LEFT JOIN reviews r ON b.id = r.business_id
      GROUP BY b.id
    `, cb);
  },

  create: (data, cb) => db.query('INSERT INTO business SET ?', data, cb),
  update: (id, data, cb) => db.query('UPDATE business SET ? WHERE id = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM business WHERE id = ?', [id], cb),
  updateStatus: (id, status, cb) => db.query('UPDATE business SET status = ? WHERE id = ?', [status, id], cb),

  getById: (id, cb) => db.query('SELECT * FROM business WHERE id = ?', [id], cb),
  getBySlug: (slug, cb) => db.query('SELECT * FROM business WHERE slug = ?', [slug], cb),

  getServicesByBusinessId: (businessId, cb) => {
    db.query(`
      SELECT 
        s.id AS service_id, s.service_name, s.service_description, s.price, s.duration, s.status,
        st.id AS service_type_id, st.service_type
      FROM services s
      JOIN service_type st ON s.service_type_id = st.id
      WHERE s.business_id = ?
    `, [businessId], cb);
  },

  getTeamByBusinessId: (businessId, cb) => {
    db.query('SELECT * FROM team WHERE business_id = ?', [businessId], cb);
  },

getBookingsByBusinessId: (businessId, callback) => {
  const query = `
    SELECT 
      b.id AS booking_id,
      b.business_id,
      b.customer_id,
      c.name AS customer_name,
      b.team_id,
      b.service_ids,
      b.time,
      b.selected_date,
      b.status
    FROM bookings b
    JOIN customers c ON b.customer_id = c.id
    WHERE b.business_id = ?
  `;

  db.query(query, [businessId], (err, results) => {
    if (err) {
      console.error('Error in query:', err);
      return callback(err);
    }

    console.log('Booking results:', results);

    // Step 1: Parse all service_ids into one array
    const allServiceIds = [];
    results.forEach(booking => {
      try {
        // Ensure service_ids is an array
        const serviceIds = Array.isArray(booking.service_ids) ? booking.service_ids : [booking.service_ids];
        console.log('Parsed service_ids:', serviceIds);
        booking.service_ids_array = serviceIds;
        allServiceIds.push(...serviceIds);
      } catch (parseError) {
        console.error('Error parsing service_ids:', parseError);
        booking.service_ids_array = [];
      }
    });

    // If no services are associated with any booking, return early
    if (allServiceIds.length === 0) {
      console.log('No service IDs found.');
      results.forEach(booking => {
        booking.services = [];
        delete booking.service_ids_array;
      });
      return callback(null, results);
    }

    // Step 2: Fetch complete service details in bulk
    const uniqueServiceIds = [...new Set(allServiceIds)];
    db.query(
      `SELECT id, service_name, price FROM services WHERE id IN (?)`,
      [uniqueServiceIds],
      (err, serviceRows) => {
        if (err) {
          console.error('Error fetching services:', err);
          return callback(err);
        }

        console.log('Fetched services:', serviceRows);

        // Map service ids to service objects (containing name, price, etc.)
        const serviceMap = {};
        serviceRows.forEach(s => {
          serviceMap[s.id] = {
            id: s.id,
            service_name: s.service_name,
            price: s.price
          };
        });

        console.log('Service Map:', serviceMap);

        // Step 3: Map complete service details to each booking
        results.forEach(booking => {
          const services = booking.service_ids_array.map(id => serviceMap[id] || { service_name: 'Unknown Service', price: null });
          booking.services = services;
          delete booking.service_ids_array;
          delete booking.service_ids; // Optional: remove raw service_ids if you don't want it
        });

        // Return the final result with full service details included
        callback(null, results);
      }
    );
  });
},







  getReviewsByBusinessId: (businessId, cb) => {
    db.query('SELECT * FROM reviews WHERE business_id = ?', [businessId], cb);
  },

  getByEmail: (email, callback) => {
    db.query('SELECT * FROM business WHERE email = ?', [email], callback);
  },

  // ✅ New: Count customers for a business
  countCustomers: (businessId, cb) => {
    db.query(`
      SELECT COUNT(DISTINCT customer_id) AS customerCount
      FROM bookings
      WHERE business_id = ?
    `, [businessId], cb);
  },

  // ✅ New: Count bookings for a business
  countBookings: (businessId, cb) => {
    db.query(`
      SELECT COUNT(*) AS bookingCount
      FROM bookings
      WHERE business_id = ?
    `, [businessId], cb);
  },

  // ✅ New: Count team members for a business
  countTeam: (businessId, cb) => {
    db.query(`
      SELECT COUNT(*) AS teamCount
      FROM team
      WHERE business_id = ?
    `, [businessId], cb);
  },

  // ✅ New: Count services for a business
  countServices: (businessId, cb) => {
    db.query(`
      SELECT COUNT(*) AS serviceCount
      FROM services
      WHERE business_id = ?
    `, [businessId], cb);
  }
};
