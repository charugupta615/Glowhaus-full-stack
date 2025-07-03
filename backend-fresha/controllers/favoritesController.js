// const FavoritesModel = require('../models/favoritesModel');
// exports.addFavorite = (req, res) => {
//   const { customer_id, business_id } = req.body;

//   FavoritesModel.addFavorite(customer_id, business_id, (err) => {
//     if (err) return res.status(500).json({ error: 'Database error', err });
//     res.status(201).json({ message: 'Added to favorites' });
//   });
// };

// exports.getFavoritesByCustomer = (req, res) => {
//   const { customer_id } = req.params;

//   FavoritesModel.getFavoritesByCustomer(customer_id, (err, results) => {
//     if (err) return res.status(500).json({ error: 'Database error', err });

//     if (!results.length) {
//       return res.status(404).json({ error: 'No favorites found for this customer' });
//     }

//     const formatted = results.map(row => ({
//       id: row.id,
//       created_at: row.created_at,
//       business: {
//         id: row.business_id,
//         name: row.business_name,
//         slug: row.business_slug,
//         rating: row.business_rating,
//         votes: row.business_votes,
//         status: row.business_status,
//         address: row.business_address,
//         images: [row.main_image, row.side_image, row.side_image1],
//         open_until: row.open_until,
//         category: {
//           id: row.category_id,
//           name: row.category_name
//         }
//       }
//     }));

//     res.status(200).json(formatted);
//   });
// };

// exports.removeFavorite = (req, res) => {
//   const { customer_id, business_id } = req.body;

//   FavoritesModel.removeFavorite(customer_id, business_id, (err) => {
//     if (err) return res.status(500).json({ error: 'Database error', err });
//     res.status(200).json({ message: 'Removed from favorites' });
//   });
// };


const FavoritesModel = require('../models/favoritesModel');

exports.addFavorite = (req, res) => {
  const { customer_id, business_id } = req.body;

  FavoritesModel.addFavorite(customer_id, business_id, (err) => {
    if (err) return res.status(500).json({ error: 'Database error', err });
    res.status(201).json({ message: 'Added to favorites' });
  });
};

exports.getFavoritesByCustomer = (req, res) => {
  const { customer_id } = req.params;

  FavoritesModel.getFavoritesByCustomer(customer_id, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', err });

    if (!results.length) {
      return res.status(404).json({ error: 'No favorites found for this customer' });
    }

    const formatted = results.map(row => ({
      id: row.id,
      created_at: row.created_at,
      business: {
        id: row.business_id,
        name: row.business_name,
        slug: row.business_slug,
        rating: row.business_rating,
        votes: row.business_votes,
        status: row.business_status,
        address: row.business_address,
        images: [row.main_image, row.side_image, row.side_image1],
        open_until: row.open_until,
        category: {
          id: row.category_id,
          name: row.category_name
        },
        // Add the average rating and total reviews from the database query
        avg_rating: row.avg_rating,
        total_reviews: row.total_reviews
      }
    }));

    res.status(200).json(formatted);
  });
};

exports.removeFavorite = (req, res) => {
  const { customer_id, business_id } = req.body;

  FavoritesModel.removeFavorite(customer_id, business_id, (err) => {
    if (err) return res.status(500).json({ error: 'Database error', err });
    res.status(200).json({ message: 'Removed from favorites' });
  });
};
