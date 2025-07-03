// import React from 'react';
// import Card from './Card/Card';
// import recommendedData from '../data/recommendedData';

// const RecommendedSection = () => {
//   return (
//     <section>
//       <h2 className="section-title">Recommended</h2>
//       <div className="card-container">
//         {recommendedData.map((item) => (
//           <Card key={item.id} data={item} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default RecommendedSection;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Card from './Card/Card';

// const RecommendedSection = () => {
//   const [recommendedData, setRecommendedData] = useState([]);
//   console.log(recommendedData, "recommendedData");
//   const [sectionTitle, setSectionTitle] = useState('Recommended');

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/sections/display')
//       .then((res) => {
//         if (res.data?.data?.sections) {
//           // Find the recommended section
//           const recommendedSection = res.data.data.sections.find(
//             (section) => section.slug === 'recommended'
//           );

//           if (recommendedSection) {
//             setSectionTitle(recommendedSection.name || 'Recommended');
//             setRecommendedData(recommendedSection.business || []);
//           }
//         }
//       })
//       .catch((err) => {
//         console.error('Error fetching recommended section:', err);
//       });
//   }, []);

//   return (
//     <section>
//       <h2 className="section-title">{sectionTitle}</h2>
//       <div className="card-container">
//       {recommendedData
//         .filter((item) => item.status === 'active')
//         .map((item) => (
//         <Card key={item.id} data={item} />
//      ))}
//       </div>
//     </section>
//   );
// };

// export default RecommendedSection;
