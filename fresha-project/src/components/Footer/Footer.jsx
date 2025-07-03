import React from 'react';
import './Footer.css';
import { FaApple, FaGoogle } from 'react-icons/fa';

const Footer = () => {
  return (
    <section id="footer">
      <div className="container1">
        <div className="row">
          <div className="col">
            <h1 className="footer-heading">Glowhaus</h1>
            <a href="#" className="btn">Get the app <FaApple /> <FaGoogle /></a>
          </div>

          <div className="col">
            <h3>About Glowhaus</h3>
            <p>Careers</p>
            <p>Customer Support</p>
            <p>Blog</p>
            <p>Sitemap</p>
          </div>

          <div className="col">
            <h3>Legal</h3>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
            <p>Terms of Use</p>
          </div>

          <div className="col">
            <h3>For Business</h3>
            <p>For Partners</p>
            <p>Pricing</p>
            <p>Support</p>
            <p>Status</p>
          </div>

          <div className="col">
            <h3>Find Us on Social Media</h3>
            <p>Twitter</p>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>YouTube</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
