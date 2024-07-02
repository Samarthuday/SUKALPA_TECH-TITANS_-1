import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import img1 from './img-1.jpg';
import img2 from './img-2.jpg';
import img3 from './img-3.jpg';
import img4 from './img-4.jpg';
import img5 from './img-5.webp';
import img6 from './img-6.webp';
import img7 from './img-7.webp';
import img8 from './img-8.avif';
import img9 from './img-9.webp';
import img10 from './img-10.jpg';
import img11 from './img-11.avif';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Adjust speed here (3000ms = 3 seconds)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage-container">
      <header className="header">
        <div className="logo">Tech-Titans</div>
        <div className="auth-buttons">
          <Link to="/login" className="button">
            Login
          </Link>
          <Link to="/signup" className="button">
            Sign Up
          </Link>
        </div>
      </header>
      <div className="content">
        <div className="slideshow-container">
          <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {images.map((src, index) => (
              <div key={index} className={`slide ${index === currentIndex ? 'active' : ''}`}>
                <img src={src} alt={`Event ${index + 1}`} className="slide-image" />
              </div>
            ))}
          </div>
        </div>
        <div className="info-section">
          <h2>Welcome to Tech-Titans</h2>
          <p>Your one-stop platform for tech events and conferences. Stay updated with the latest events in the tech world and never miss an opportunity to learn and network.</p>
          <div className="features">
            <div className="feature">
              <h3>Discover Events</h3>
              <p>Find and attend the best tech events happening around you. Explore our extensive list of upcoming events and pick the ones that interest you.</p>
            </div>
            <div className="feature">
              <h3>Connect with Organizers</h3>
              <p>Get in touch with event organizers and gain insights into the events. Network with industry leaders and professionals.</p>
            </div>
            <div className="feature">
              <Link to='/personalizedagenda'><h3>Join the Community</h3></Link>
              <p>Become a part of our tech community. Sign up to receive updates, news, and special offers related to tech events.</p>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Tech-Titans. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
