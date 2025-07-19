const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
const categoryRoutes = require('./routes/categoryRoutes');
const sectionRoutes = require('./routes/sectionRoutes');
const businessRoutes = require('./routes/businessRoutes');
const displayRoutes = require('./routes/displayRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const serviceTypeRoutes = require('./routes/serviceTypeRoutes');
const teamRoutes = require('./routes/teamRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const customerRoutes = require('./routes/customerRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');
const sharesRoutes = require('./routes/sharesRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const slotRoutes = require('./routes/slotRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/categories', categoryRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/display', displayRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/service-type', serviceTypeRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/shares', sharesRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/slot', slotRoutes);
app.use('/api/admin', adminRoutes);

const db = require('./config/db'); 

db.getConnection((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    return;
  }
  console.log('✅ Database is connected!');
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
});