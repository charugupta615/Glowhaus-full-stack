// import React from 'react';
// import Card from './Card/Card';
// import newToFreshaData from '../data/newToFreshaData';

// const NewToFreshaSection = () => {
//   return (
//     <section>
//       <h2 className="section-title1">New to Fresha</h2>
//       <div className="card-container">
//         {newToFreshaData.map((item) => (
//           <Card key={item.id} data={item} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default NewToFreshaSection;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Card from './Card/Card';

// const NewToFreshaSection = () => {
//   const [newtofreshaData, setNewToFreshaData] = useState([]);
//   console.log(newtofreshaData, "newtofreshaData");
//   const [sectionTitle, setSectionTitle] = useState('NewToFresha');

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/sections/display')
//       .then((res) => {
//         if (res.data?.data?.sections) {
//           // Find the newtofresha section
//           const newtofreshaSection = res.data.data.sections.find(
//             (section) => section.slug === 'newtofresha'
//           );

//           if (newtofreshaSection) {
//             setSectionTitle(newtofreshaSection.name || 'NewToFresha');
//             setNewToFreshaData(newtofreshaSection.business || []);
//           }
//         }
//       })
//       .catch((err) => {
//         console.error('Error fetching newtofresha section:', err);
//       });
//   }, []);

//   return (
//     <section>
//       <h2 className="section-title">{sectionTitle}</h2>
//       <div className="card-container">
//       {newtofreshaData
//         .filter((item) => item.status === 'active')
//         .map((item) => (
//         <Card key={item.id} data={item} />
//      ))}
//       </div>
//     </section>
//   );
// };

// export default NewToFreshaSection;
