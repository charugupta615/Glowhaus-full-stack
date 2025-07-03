// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './GroomRoomImages.css';
// import mainImage from '../../../assets/images/groomroom-main.jpg';
// import sideImage1 from '../../../assets/images/groomroom-1.jpg';
// import sideImage2 from '../../../assets/images/groomroom-2.jpg';
// import extraImage1 from '../../../assets/images/groomroom-3.jpg';
// import extraImage2 from '../../../assets/images/groomroom-4.jpg';

// const GroomRoomImages = () => {
//   const navigate = useNavigate();
//   const images = [mainImage, sideImage1, sideImage2, extraImage1, extraImage2];

//   const handleClose = () => {
//     navigate(-1);
//   };

//   return (
//     <div className="groom-room-images-container">
//       <button className="close-button" onClick={handleClose}>X</button>
//       {images.map((img, index) => (
//         <img key={index} src={img} alt={`Groom Room ${index + 1}`} className="full-image" />
//       ))}
//     </div>
//   );
// };

// export default GroomRoomImages;









import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GroomRoomImages.css';

const GroomRoomImages = ({ images }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="groom-room-images-container">
      <button className="close-button" onClick={handleClose}>×</button>
      {images && images.length > 0 ? (
        images.map((img, index) => (
          <img key={index} src={img} alt={`Groom Room ${index + 1}`} className="full-image" />
        ))
      ) : (
        <p className="no-images">No images available</p>
      )}
    </div>
  );
};

export default GroomRoomImages;
