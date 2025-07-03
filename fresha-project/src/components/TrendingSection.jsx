// import React from 'react';
// import Card from './Card/Card';
// import trendingData from '../data/trendingData';

// const TrendingSection = () => {
//   return (
//     <section>
//       <h2 className="section-title2">Trending</h2>
//       <div className="card-container">
//         {trendingData.map((item) => (
//           <Card key={item.id} data={item} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default TrendingSection;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Card from './Card/Card';

// const TrendingSection = () => {
//   const [trendingData, setTrendingData] = useState([]);
//   console.log(trendingData, "trendingData");
//   const [sectionTitle, setSectionTitle] = useState('Trending');

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/sections/display')
//       .then((res) => {
//         if (res.data?.data?.sections) {
//           // Find the trending section
//           const trendingSection = res.data.data.sections.find(
//             (section) => section.slug === 'trending'
//           );

//           if (trendingSection) {
//             setSectionTitle(trendingSection.name || 'Trending');
//             setTrendingData(trendingSection.business || []);
//           }
//         }
//       })
//       .catch((err) => {
//         console.error('Error fetching trending section:', err);
//       });
//   }, []);

//   return (
//     <section>
//       <h2 className="section-title">{sectionTitle}</h2>
//       <div className="card-container">
//       {trendingData
//         .filter((item) => item.status === 'active')
//         .map((item) => (
//         <Card key={item.id} data={item} />
//      ))}
//       </div>
//     </section>
//   );
// };

// export default TrendingSection;
