// const Business = require('../models/businessModel');
// const db = require('../config/db');

// exports.getAll = (req, res) => {
//   Business.getAll((err, businesses) => {
//     if (err) return res.status(500).json({ error: err });

//     const enrichedBusinesses = [];
//     let completed = 0;

//     businesses.forEach((business) => {
//       const now = new Date();
//       const isOpen = (!business.closed_till || new Date(business.closed_till) <= now) &&
//                      (!business.open_until || now <= new Date(business.open_until));

//       Business.getServicesByBusinessId(business.id, (err, services) => {
//         if (err) return res.status(500).json({ error: err });

//         const grouped = {};
//         services.forEach(row => {
//           if (!grouped[row.service_type_id]) {
//             grouped[row.service_type_id] = {
//               id: row.service_type_id,
//               service_type: row.service_type,
//               services: [],
//             };
//           }
//           if (row.service_id) {
//             grouped[row.service_type_id].services.push({
//               id: row.service_id,
//               service_name: row.service_name,
//               service_description: row.service_description,
//               price: row.price,
//               duration: row.duration,
//               status: row.status,
//             });
//           }
//         });

//         Business.getTeamByBusinessId(business.id, (err, team) => {
//           if (err) return res.status(500).json({ error: err });

//           Business.getReviewsByBusinessId(business.id, (err, reviews) => {
//             if (err) return res.status(500).json({ error: err });

//             const totalReviews = reviews.length;
//             const averageRating = totalReviews > 0
//               ? reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
//               : null;

//             enrichedBusinesses.push({
//               business: {
//                 ...business,
//                 is_open: isOpen,
//                 average_rating: averageRating,
//                 total_reviews: totalReviews,
//               },
//               services: Object.values(grouped),
//               team,
//               reviews,
//             });

//             completed++;
//             if (completed === businesses.length) {
//               res.json(enrichedBusinesses);
//             }
//           });
//         });
//       });
//     });

//     if (businesses.length === 0) {
//       res.json([]); 
//     }
//   });
// };


// exports.create = (req, res) => {
//   const {
//     name, slug, address, rating, votes, status,
//     category_id, section_id, open_until, closed_till, is_featured
//   } = req.body;
//   console.log('Received data:', req.body);
//   console.log('Received files:', req.file, req.files);

//   const data = {
//     name,
//     slug,
//     address,
//     rating,
//     votes,
//     status,
//     category_id,
//     image: req.files?.main_image?.[0] ? `/uploads/${req.files.main_image[0].filename}` : '/uploads/default-main.jpg',
//     main_image: req.files?.main_image?.[0] ? `/uploads/${req.files.main_image[0].filename}` : '/uploads/default-main.jpg',
//     side_image: req.files?.side_image?.[0] ? `/uploads/${req.files.side_image[0].filename}` : '/uploads/default-side.jpg',
//     side_image1: req.files?.side_image1?.[0] ? `/uploads/${req.files.side_image1[0].filename}` : '/uploads/default-side1.jpg',
//     open_until: open_until || new Date('2099-12-31T21:00:00'),
//     closed_till: closed_till || null,
//     is_featured: is_featured !== undefined ? is_featured : false
//   };

//   Business.create(data, (err, result) => {
//     if (err) return res.status(500).json({ error: err });

//     const businessId = result.insertId;

//     if (section_id) {
//       db.query(
//         'INSERT INTO section_business (section_id, business_id) VALUES (?, ?)',
//         [section_id, businessId],
//         (linkErr) => {
//           if (linkErr) return res.status(500).json({ error: linkErr });
//           res.json({ id: businessId, message: 'Business created and linked to section successfully' });
//         }
//       );
//     } else {
//       res.json({ id: businessId, message: 'Business created successfully (no section linked)' });
//     }
//   });
// };

// exports.update = (req, res) => {
//   console.log('Update request received:', req.body);
//   console.log('Update files:', req.files);
//   console.log('update file:', req.file);
//   const { main_image, side_image, side_image1 } = req.files;
//   const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
//   const { section_id, open_until, closed_till, ...rest } = req.body;
//   const businessId = req.params.id;

//   const data = { ...rest };
//   if (imagePath) data.image = imagePath;
//   if (main_image) data.main_image = `/uploads/${main_image[0].filename}`;
//   if (main_image) data.image = `/uploads/${main_image[0].filename}`;
//   if (side_image) data.side_image = `/uploads/${side_image[0].filename}`;
//   if (side_image1) data.side_image1 = `/uploads/${side_image1[0].filename}`;
//   if (open_until) data.open_until = open_until;
//   if (closed_till) data.closed_till = closed_till;

//   console.log('Update data:', data);
  

//   Business.update(businessId, data, (err) => {
//     if (err) return res.status(500).json({ error: err });

//     if (section_id) {
//       db.query('SELECT * FROM section_business WHERE business_id = ?', [businessId], (selectErr, results) => {
//         if (selectErr) return res.status(500).json({ error: selectErr });

//         const query = results.length > 0
//           ? 'UPDATE section_business SET section_id = ? WHERE business_id = ?'
//           : 'INSERT INTO section_business (section_id, business_id) VALUES (?, ?)';

//         db.query(query, [section_id, businessId], (err) => {
//           if (err) return res.status(500).json({ error: err });
//           res.json({ message: 'Business and section updated successfully' });
//         });
//       });
//     } else {
//       res.json({ message: 'Business updated successfully (no section change)' });
//     }
//   });
// };

// exports.updateStatus = (req, res) => {
//   const { status } = req.body;
//   const { id } = req.params;

//   if (!status) return res.status(400).json({ error: 'Status is required' });

//   Business.updateStatus(id, status, (err) => {
//     if (err) return res.status(500).json({ error: err });
//     res.json({ message: 'Status updated successfully' });
//   });
// };

// exports.delete = (req, res) => {
//   Business.delete(req.params.id, (err) => {
//     if (err) return res.status(500).json({ error: err });
//     res.json({ message: 'Business deleted successfully' });
//   });
// };

// exports.displayById = (req, res) => {
//   const id = req.params.id;

//   Business.getById(id, (err, result) => {
//     if (err || result.length === 0) return res.status(404).json({ message: 'Business not found' });

//     const business = result[0];
//     const now = new Date();
//     const isOpen = (!business.closed_till || new Date(business.closed_till) <= now) &&
//                    (!business.open_until || now <= new Date(business.open_until));

//     Business.getServicesByBusinessId(id, (err, services) => {
//       if (err) return res.status(500).json(err);

//       const grouped = {};
//       services.forEach(row => {
//         if (!grouped[row.service_type_id]) {
//           grouped[row.service_type_id] = {
//             id: row.service_type_id,
//             service_type: row.service_type,
//             services: [],
//           };
//         }
//         if (row.service_id) {
//           grouped[row.service_type_id].services.push({
//             id: row.service_id,
//             service_name: row.service_name,
//             service_description: row.service_description,
//             price: row.price,
//             duration: row.duration,
//             status: row.status,
//           });
//         }
//       });

//       Business.getTeamByBusinessId(id, (err, team) => {
//         if (err) return res.status(500).json(err);

//         Business.getReviewsByBusinessId(id, (err, reviews) => {
//           if (err) return res.status(500).json(err);

//           const totalReviews = reviews.length;
//           const averageRating = totalReviews > 0
//             ? reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
//             : null;

//           res.json({
//             business: {
//               ...business,
//               is_open: isOpen,
//               average_rating: averageRating,
//               total_reviews: totalReviews
//             },
//             services: Object.values(grouped),
//             team,
//             reviews,
//           });
//         });
//       });
//     });
//   });
// };
// exports.displayBySlug = (req, res) => {
//   const slug = req.params.slug;
//   console.log('Requested slug:', slug);

//   Business.getBySlug(slug, (err, result) => {
//     if (err) {
//       console.error('Error fetching business by slug:', err);
//       return res.status(500).json({ message: 'Error fetching business' });
//     }
//     console.log('Business result:', result);
//     if (result.length === 0) {
//       console.log('No business found for slug:', slug);
//       return res.status(404).json({ message: 'Business not found' });
//     }


//     const business = result[0];
//     const now = new Date();
//     const isOpen = (!business.closed_till || new Date(business.closed_till) <= now) &&
//                    (!business.open_until || now <= new Date(business.open_until));

//     Business.getServicesByBusinessId(business.id, (err, services) => {
//       if (err) return res.status(500).json(err);

//       const grouped = {};
//       services.forEach(row => {
//         if (!grouped[row.service_type_id]) {
//           grouped[row.service_type_id] = {
//             id: row.service_type_id,
//             service_type: row.service_type,
//             services: [],
//           };
//         }
//         if (row.service_id) {
//           grouped[row.service_type_id].services.push({
//             id: row.service_id,
//             service_name: row.service_name,
//             service_description: row.service_description,
//             price: row.price,
//             duration: row.duration,
//             status: row.status,
//           });
//         }
//       });

//       Business.getTeamByBusinessId(business.id, (err, team) => {
//         if (err) return res.status(500).json(err);

//         Business.getReviewsByBusinessId(business.id, (err, reviews) => {
//           if (err) return res.status(500).json(err);

//           const totalReviews = reviews.length;
//           const averageRating = totalReviews > 0
//             ? reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
//             : null;

//           res.json({
//             business: {
//               ...business,
//               is_open: isOpen,
//               average_rating: averageRating,
//               total_reviews: totalReviews
//             },
//             services: Object.values(grouped),
//             team,
//             reviews,
//           });
//         });
//       });
//     });
//   });
// };






const Business = require('../models/businessModel');
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  Business.getByEmail(email, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (result.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const business = result[0];
    bcrypt.compare(password, business.password, (err, isMatch) => {
      if (err || !isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: business.id, name: business.name }, SECRET_KEY, { expiresIn: '7d' });
      res.json({ token, business: { id: business.id, name: business.name, email: business.email } });
    });
  });
};

exports.getAll = (req, res) => {
  Business.getAll((err, businesses) => {
    if (err) return res.status(500).json({ error: err });

    const enrichedBusinesses = [];
    let completed = 0;

    businesses.forEach((business) => {
      const now = new Date();
      const isOpen = (!business.closed_till || new Date(business.closed_till) <= now) &&
                     (!business.open_until || now <= new Date(business.open_until));

      Business.getServicesByBusinessId(business.id, (err, services) => {
        if (err) return res.status(500).json({ error: err });

        const grouped = {};
        services.forEach(row => {
          if (!grouped[row.service_type_id]) {
            grouped[row.service_type_id] = {
              id: row.service_type_id,
              service_type: row.service_type,
              services: [],
            };
          }
          if (row.service_id) {
            grouped[row.service_type_id].services.push({
              id: row.service_id,
              service_name: row.service_name,
              service_description: row.service_description,
              price: row.price,
              duration: row.duration,
              status: row.status,
            });
          }
        });

        Business.getTeamByBusinessId(business.id, (err, team) => {
          if (err) return res.status(500).json({ error: err });

          Business.getReviewsByBusinessId(business.id, (err, reviews) => {
            if (err) return res.status(500).json({ error: err });

            const totalReviews = reviews.length;
            const averageRating = totalReviews > 0
              ? reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
              : null;

            enrichedBusinesses.push({
              business: {
                ...business,
                is_open: isOpen,
                average_rating: averageRating,
                total_reviews: totalReviews,
              },
              services: Object.values(grouped),
              team,
              reviews,
            });

            completed++;
            if (completed === businesses.length) {
              res.json(enrichedBusinesses);
            }
          });
        });
      });
    });

    if (businesses.length === 0) {
      res.json([]);
    }
  });
};

exports.create = (req, res) => {
  const {
    name, slug, address, rating, votes, status,
    category_id, section_id, open_until, closed_till, is_featured, email, password
  } = req.body;

  console.log('Received data:', req.body);

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Error hashing password' });

    const data = {
      name,
      slug,
      address,
      rating,
      votes,
      status,
      email,
      password: hashedPassword,
      category_id,
      image: req.files?.main_image?.[0] ? `/uploads/${req.files.main_image[0].filename}` : '/uploads/default-main.jpg',
      main_image: req.files?.main_image?.[0] ? `/uploads/${req.files.main_image[0].filename}` : '/uploads/default-main.jpg',
      side_image: req.files?.side_image?.[0] ? `/uploads/${req.files.side_image[0].filename}` : '/uploads/default-side.jpg',
      side_image1: req.files?.side_image1?.[0] ? `/uploads/${req.files.side_image1[0].filename}` : '/uploads/default-side1.jpg',
      open_until: open_until || new Date('2099-12-31T21:00:00'),
      closed_till: closed_till || null,
      is_featured: is_featured !== undefined ? is_featured : false
    };

    Business.create(data, (err, result) => {
      if (err) return res.status(500).json({ error: err });

      const businessId = result.insertId;

      if (section_id) {
        db.query(
          'INSERT INTO section_business (section_id, business_id) VALUES (?, ?)',
          [section_id, businessId],
          (linkErr) => {
            if (linkErr) return res.status(500).json({ error: linkErr });
            res.json({ id: businessId, message: 'Business created and linked to section successfully' });
          }
        );
      } else {
        res.json({ id: businessId, message: 'Business created successfully (no section linked)' });
      }
    });
  });
};

exports.update = (req, res) => {
  console.log('Update request received:', req.body);
  console.log('Update files:', req.files);
  console.log('update file:', req.file);

  const { main_image, side_image, side_image1 } = req.files;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  const { section_id, open_until, closed_till, password, ...rest } = req.body;
  const businessId = req.params.id;

  const data = { ...rest };
  if (imagePath) data.image = imagePath;
  if (main_image) data.main_image = `/uploads/${main_image[0].filename}`;
  if (main_image) data.image = `/uploads/${main_image[0].filename}`;
  if (side_image) data.side_image = `/uploads/${side_image[0].filename}`;
  if (side_image1) data.side_image1 = `/uploads/${side_image1[0].filename}`;
  if (open_until) data.open_until = open_until;
  if (closed_till) data.closed_till = closed_till;

  // If password is present, hash it before updating
  const updateBusiness = (finalData) => {
    Business.update(businessId, finalData, (err) => {
      if (err) return res.status(500).json({ error: err });

      if (section_id) {
        db.query('SELECT * FROM section_business WHERE business_id = ?', [businessId], (selectErr, results) => {
          if (selectErr) return res.status(500).json({ error: selectErr });

          const query = results.length > 0
            ? 'UPDATE section_business SET section_id = ? WHERE business_id = ?'
            : 'INSERT INTO section_business (section_id, business_id) VALUES (?, ?)';

          db.query(query, [section_id, businessId], (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'Business and section updated successfully' });
          });
        });
      } else {
        res.json({ message: 'Business updated successfully (no section change)' });
      }
    });
  };

  if (password) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: 'Error hashing password' });
      data.password = hashedPassword;
      updateBusiness(data);
    });
  } else {
    updateBusiness(data);
  }
};


exports.updateStatus = (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!status) return res.status(400).json({ error: 'Status is required' });

  Business.updateStatus(id, status, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Status updated successfully' });
  });
};

exports.delete = (req, res) => {
  Business.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Business deleted successfully' });
  });
};

exports.displayById = (req, res) => {
  const id = req.params.id;

  Business.getById(id, (err, result) => {
    if (err || result.length === 0) return res.status(404).json({ message: 'Business not found' });

    const business = result[0];
    const now = new Date();
    const isOpen = (!business.closed_till || new Date(business.closed_till) <= now) &&
                   (!business.open_until || now <= new Date(business.open_until));

    // Fetch services
    Business.getServicesByBusinessId(id, (err, services) => {
      if (err) return res.status(500).json(err);

      const grouped = {};
      services.forEach(row => {
        if (!grouped[row.service_type_id]) {
          grouped[row.service_type_id] = {
            id: row.service_type_id,
            service_type: row.service_type,
            services: [],
          };
        }
        if (row.service_id) {
          grouped[row.service_type_id].services.push({
            id: row.service_id,
            service_name: row.service_name,
            service_description: row.service_description,
            price: row.price,
            duration: row.duration,
            status: row.status,
          });
        }
      });

      // Fetch team
      Business.getTeamByBusinessId(id, (err, team) => {
        if (err) return res.status(500).json({ error: err });

        // Fetch reviews
        Business.getReviewsByBusinessId(id, (err, reviews) => {
          if (err) return res.status(500).json({ error: err });

          const totalReviews = reviews.length;
          const averageRating = totalReviews > 0
            ? reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
            : null;

          // Fetch bookings
          Business.getBookingsByBusinessId(id, (err, bookings) => {
            if (err) return res.status(500).json({ error: err });

            // Return all data
            res.json({
              business: {
                ...business,
                is_open: isOpen,
                average_rating: averageRating,
                total_reviews: totalReviews,
                total_bookings: bookings.length,  // Total booking count for the business
              },
              services: Object.values(grouped),
              team,
              reviews,
              bookings,  // Include bookings in the response
            });
          });
        });
      });
    });
  });
};

exports.displayBySlug = (req, res) => {
  const slug = req.params.slug;
  console.log('Requested slug:', slug);

  Business.getBySlug(slug, (err, result) => {
    if (err) {
      console.error('Error fetching business by slug:', err);
      return res.status(500).json({ message: 'Error fetching business' });
    }
    if (result.length === 0) return res.status(404).json({ message: 'Business not found' });

    const business = result[0];
    const now = new Date();
    const isOpen = (!business.closed_till || new Date(business.closed_till) <= now) &&
                   (!business.open_until || now <= new Date(business.open_until));

    Business.getServicesByBusinessId(business.id, (err, services) => {
      if (err) return res.status(500).json(err);

      const grouped = {};
      services.forEach(row => {
        if (!grouped[row.service_type_id]) {
          grouped[row.service_type_id] = {
            id: row.service_type_id,
            service_type: row.service_type,
            services: [],
          };
        }
        if (row.service_id) {
          grouped[row.service_type_id].services.push({
            id: row.service_id,
            service_name: row.service_name,
            service_description: row.service_description,
            price: row.price,
            duration: row.duration,
            status: row.status,
          });
        }
      });

      Business.getTeamByBusinessId(business.id, (err, team) => {
        if (err) return res.status(500).json(err);

        Business.getReviewsByBusinessId(business.id, (err, reviews) => {
          if (err) return res.status(500).json(err);

          const totalReviews = reviews.length;
          const averageRating = totalReviews > 0
            ? reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
            : null;

          res.json({
            business: {
              ...business,
              is_open: isOpen,
              average_rating: averageRating,
              total_reviews: totalReviews
            },
            services: Object.values(grouped),
            team,
            reviews,
          });
        });
      });
    });
  });
};

exports.dashboard = (req, res) => {
  const businessId = req.user.id;

  const dashboardData = {};

  Business.countCustomers(businessId, (err, customerCount) => {
    if (err) return res.status(500).json({ error: 'Error counting customers' });

    dashboardData.customers = customerCount;

    Business.countBookings(businessId, (err, bookingCount) => {
      if (err) return res.status(500).json({ error: 'Error counting bookings' });

      dashboardData.bookings = bookingCount;

      Business.countTeam(businessId, (err, teamCount) => {
        if (err) return res.status(500).json({ error: 'Error counting team' });

        dashboardData.team = teamCount;

        Business.countServices(businessId, (err, serviceCount) => {
          if (err) return res.status(500).json({ error: 'Error counting services' });

          dashboardData.services = serviceCount;

          res.json({ dashboard: dashboardData });
        });
      });
    });
  });
};

// ✅ New count endpoints
exports.countCustomers = (req, res) => {
  const businessId = req.params.id;
  Business.countCustomers(businessId, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

exports.countBookings = (req, res) => {
  const businessId = req.params.id;
  Business.countBookings(businessId, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

exports.countTeam = (req, res) => {
  const businessId = req.params.id;
  Business.countTeam(businessId, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

exports.countServices = (req, res) => {
  const businessId = req.params.id;
  Business.countServices(businessId, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};
