import React from 'react';
import './Certifications.css';
import shortlist from '../../../assets/images/Shortlist.jpg';
import bestValue from '../../../assets/images/BestValue.jpg';
import easiestToUse from '../../../assets/images/Summer.jpg';
import hipaa from '../../../assets/images/Hippa.jpg';
import iso from '../../../assets/images/ISO.jpg';
import hitrust from '../../../assets/images/Hitrust.jpg';

const certifications = [
  { img: shortlist, alt: 'Capterra Shortlist 2024' },
  { img: bestValue, alt: 'Capterra Best Value 2024' },
  { img: easiestToUse, alt: 'Easiest to use Summer 2024' },
  { img: hipaa, alt: 'HIPAA Compliant' },
  { img: iso, alt: 'ISO 9001 Certified' },
  { img: hitrust, alt: 'HITRUST CFS Certified' },
];

const Certifications = () => {
  return (
    <section className="certifications">
      {certifications.map((cert, index) => (
        <img key={index} src={cert.img} alt={cert.alt} className="certification-image" />
      ))}
    </section>
  );
};

export default Certifications;
