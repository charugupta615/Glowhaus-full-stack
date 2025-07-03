const db = require('../config/db');

const formatDate = (date) => {
  const dateObj = new Date(date);
  return dateObj.toISOString().slice(0, 19).replace('T', ' ');
};

exports.createBooking = (customer_id, business_id, team_id, service_ids, selected_date, time, callback) => {
  const formattedDate = formatDate(selected_date);
  const query = `INSERT INTO bookings 
                 (customer_id, business_id, team_id, service_ids, selected_date, time)
                 VALUES (?, ?, ?, ?, ?, ?)`;

  const values = [
    customer_id,
    business_id,
    team_id,
    JSON.stringify(service_ids),
    formattedDate,
    time,
  ];

  db.query(query, values, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result.insertId);
  });
};

exports.getBookingsByCustomer = (customer_id, callback) => {
  const query = `SELECT b.id AS booking_id, b.status, b.selected_date, b.time,
                        b.service_ids, c.name AS customer_name, bus.id AS business_id, bus.name AS business_name, 
                        bus.main_image, bus.address AS business_address, 
                        t.id AS team_id, t.team_name, t.photo AS team_photo
                 FROM bookings b
                 JOIN business bus ON b.business_id = bus.id
                 JOIN team t ON b.team_id = t.id
                 JOIN customers c ON b.customer_id = c.id
                 WHERE b.customer_id = ?`;

  db.query(query, [customer_id], async (err, results) => {
    if (err) return callback(err, null);

    const bookingsWithServices = [];

    for (const booking of results) {
      let serviceIds = [];
      try {
        serviceIds = Array.isArray(booking.service_ids) ? booking.service_ids : JSON.parse(booking.service_ids || '[]');
      } catch (err) {
        console.error('Error parsing service_ids:', err);
        serviceIds = [];
      }

      if (serviceIds.length > 0) {
        const placeholders = serviceIds.map(() => '?').join(',');
        const serviceQuery = `SELECT id, service_name, price FROM services WHERE id IN (${placeholders})`;

        try {
          await new Promise((resolve, reject) => {
            db.query(serviceQuery, serviceIds, (err, services) => {
              if (err) return reject(err);
              booking.services = services;
              bookingsWithServices.push(booking);
              resolve();
            });
          });
        } catch (err) {
          return callback(err, null);
        }
      } else {
        booking.services = [];
        bookingsWithServices.push(booking);
      }
    }

    const formattedBookings = bookingsWithServices.map(booking => {
      return {
        id: booking.booking_id,
        selected_date: booking.selected_date,
        time: booking.time,
        business: {
          id: booking.business_id,
          customer_name: booking.customer_name,
          name: booking.business_name,
          main_image: booking.main_image,
          address: booking.business_address,
        },
        team: {
          id: booking.team_id,
          team_name: booking.team_name,
          photo: booking.team_photo,
        },
        services: booking.services.map(service => ({
          id: service.id,
          service_name: service.service_name,
          price: service.price,
        })),
      };
    });

    callback(null, formattedBookings);
  });
};

// Get all bookings
exports.getAllBookings = (callback) => {
  const query = `SELECT b.id AS booking_id, b.status, b.selected_date, b.time,
                        b.service_ids, b.customer_id, c.name AS customer_name,
                        bus.id AS business_id, bus.name AS business_name, 
                        bus.main_image, bus.address AS business_address, 
                        t.id AS team_id, t.team_name, t.photo AS team_photo
                 FROM bookings b
                 JOIN business bus ON b.business_id = bus.id
                 JOIN team t ON b.team_id = t.id
                 JOIN customers c ON b.customer_id = c.id`; 

  db.query(query, async (err, results) => {
    if (err) return callback(err, null);

    const bookingsWithServices = [];

    for (const booking of results) {
      let serviceIds = [];
      try {
        serviceIds = Array.isArray(booking.service_ids) ? booking.service_ids : JSON.parse(booking.service_ids || '[]');
      } catch (err) {
        console.error('Error parsing service_ids:', err);
        serviceIds = [];
      }

      if (serviceIds.length > 0) {
        const placeholders = serviceIds.map(() => '?').join(',');
        const serviceQuery = `SELECT id, service_name, price FROM services WHERE id IN (${placeholders})`;

        try {
          await new Promise((resolve, reject) => {
            db.query(serviceQuery, serviceIds, (err, services) => {
              if (err) return reject(err);
              booking.services = services;
              bookingsWithServices.push(booking);
              resolve();
            });
          });
        } catch (err) {
          return callback(err, null);
        }
      } else {
        booking.services = [];
        bookingsWithServices.push(booking);
      }
    }

    const formattedBookings = bookingsWithServices.map(booking => {
      return {
        id: booking.booking_id,
        customer_name: booking.customer_name,
        customer_id: booking.customer_id,
        selected_date: booking.selected_date,
        time: booking.time,
        status: booking.status,
        business: {
          id: booking.business_id,
          name: booking.business_name,
          main_image: booking.main_image,
          address: booking.business_address,
        },
        team: {
          id: booking.team_id,
          team_name: booking.team_name,
          photo: booking.team_photo,
        },
        services: booking.services.map(service => ({
          id: service.id,
          service_name: service.service_name,
          price: service.price,
        })),
      };
    });

    callback(null, formattedBookings);
  });
};

exports.getBookingById = (booking_id, callback) => {
  const query = `SELECT * FROM bookings WHERE id = ?`;

  db.query(query, [booking_id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
};

exports.updateBookingStatus = (booking_id, status, callback) => {
  const query = `UPDATE bookings SET status = ? WHERE id = ?`;

  db.query(query, [status, booking_id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result.affectedRows > 0);
  });
};

exports.cancelBooking = (booking_id, callback) => {
  const query = `UPDATE bookings SET status = 'cancelled' WHERE id = ?`;

  db.query(query, [booking_id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result.affectedRows > 0);
  });
};

exports.deleteAllBookingsByCustomer = (customer_id, callback) => {
  const query = `DELETE FROM bookings WHERE customer_id = ?`;

  db.query(query, [customer_id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result.affectedRows);
  });
};
// Check if a slot is already booked
exports.isSlotBooked = (team_id, selected_date, time, callback) => {
  const query = `
    SELECT COUNT(*) AS count FROM bookings
    WHERE team_id = ? AND selected_date = ? AND time = ? AND status != 'cancelled'
  `;
  db.query(query, [team_id, formatDate(selected_date), time], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0].count > 0);
  });
};

// Get all booked slots for a team member on a date
exports.getBookedSlots = (team_id, selected_date, callback) => {
  const query = `
    SELECT time FROM bookings
    WHERE team_id = ? AND selected_date = ? AND status != 'cancelled'
  `;
  db.query(query, [team_id, formatDate(selected_date)], (err, results) => {
    if (err) return callback(err);
    const bookedTimes = results.map(row => row.time);
    callback(null, bookedTimes);
  });
};
exports.getBookingsByTeam = (teamId, callback) => {
  db.query(
    `
    SELECT 
      bookings.*,
      business.name AS business_name,
      team.team_name,
      customers.name AS customer_name,
      GROUP_CONCAT(services.service_name) AS services
    FROM bookings
    JOIN business ON bookings.business_id = business.id
    JOIN team ON bookings.team_id = team.id
    JOIN customers ON bookings.customer_id = customers.id
    LEFT JOIN JSON_TABLE(
      bookings.service_ids,
      '$[*]' COLUMNS(service_id INT PATH '$')
    ) AS s_ids ON TRUE
    LEFT JOIN services ON services.id = s_ids.service_id
    WHERE bookings.team_id = ?
    GROUP BY bookings.id
    ORDER BY bookings.selected_date DESC
    `,
    [teamId],
    callback
  );
};


