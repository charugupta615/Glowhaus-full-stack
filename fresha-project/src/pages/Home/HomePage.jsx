import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../../components/Header/Header';
import Home from '../../components/HomePage/Home';
// import RecentlyViewedSection from '../../components/RecentlyViewedSection';
import DynamicSection from '../../components/DynamicSection';
import DownloadSection from '../../components/Download/DownloadSection';
import ReviewsSection from '../../components/Reviews/ReviewsSection';
import Appointments from '../../components/Appointments/Appointments';
import BusinessSection from '../../components/Business/BusinessSection';
import BrowseByCitySection from '../../components/BrowseByCity/BrowseByCitySection';
import Footer from '../../components/Footer/Footer';

const HomePage = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get('https://glowhaus-full-stack.onrender.com/api/sections/display')
      .then((res) => {
        const allSections = res.data?.data?.sections || [];
        const filteredSections = allSections.filter(section =>
          Array.isArray(section.business)
        );
        setSections(filteredSections);
      })
      .catch((err) => {
        console.error('Error fetching sections:', err);
      });
  }, []);

  return (
    <div>
      <Header />
      <Home />
      {/* <RecentlyViewedSection /> */}
      <DynamicSection sections={sections} /> 
      <DownloadSection />
      <ReviewsSection />
      <Appointments />
      <BusinessSection />
      <BrowseByCitySection />
      <Footer />
    </div>
  );
};

export default HomePage;
