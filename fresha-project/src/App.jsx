import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingPage from './pages/Book/BookingPage';
import AppointmentPage from './pages/Book/AppointmentPage';
import SelectProfessional from './pages/Book/SelectProfessional';
import SelectTime from "./pages/Book/SelectTime";
import HomePage from './pages/Home/HomePage';
import BusinessDetail from './components/Details/BusinessDetail/BusinessDetail';
import AllReviewsPage from './components/Details/FeedBack/AllReviewsPage';
import GroomRoomImages from './components/Details/BusinessDetail/GroomRoomImages';
// import LoginPage from './pages/Login/Login';
import ForBusiness from './pages/ForBusiness/ForBusiness';
import DownloadApp from './pages/DownloadApp/DownloadApp';
import Landing from './pages/Login/Landing';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import ProfilePage from './components/Profile/ProfilePage/ProfilePage';
import Favorites from './components/Details/Favorites/Favorites';
// import BookingForm from './components/Booking/BooingForm';
import ServiceSelection from './components/Booking/ServiceSelection';
import ProfessionalSelection from './components/Booking/ProfessionalSelection';
import TimeSelection from './components/Booking/TimeSelection';
import LeaveReview from './components/Booking/LeaveReview';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/business/:slug" element={<BusinessDetail />} />
        <Route path="/reviews" element={<AllReviewsPage />} />
        <Route path="/groom-room/images" element={<GroomRoomImages />} />
        {/* <Route path="/stores/:slug/images" element={<GroomRoomImages />} /> */}
        <Route path="/a/:slug/all-offer" element={<BookingPage />} />
        <Route path="/book-appointment" element={<AppointmentPage />} />
        <Route path="/select-professional" element={<SelectProfessional />} />
        <Route path="/select-time" element={<SelectTime />} />
        <Route path="/leave-review" element={<LeaveReview />} />
        <Route path="/group-appointment" element={<h1>Group Appointment Page</h1>} />
        <Route path="/for-business" element={<ForBusiness />} />
        <Route path="/download-app" element={<DownloadApp />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/favorites" element={<Favorites />} />
        {/* <Route path="/booking-form" element={<BookingForm />} /> */}
        <Route path="/business/:slug/selection" element={<ServiceSelection />} />
        <Route path="/business/:slug/professional" element={<ProfessionalSelection />} />
        <Route path="/business/:slug/time" element={<TimeSelection />} />
      </Routes>
    </Router>
  );
};

export default App;