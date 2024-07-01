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
      <hr />
      <div className="slideshow-container">
        <div className="slider">
          {images.map((src, index) => (
            <div key={index} className={`slide ${index === currentIndex ? 'active' : ''}`}>
              <img src={src} alt={`Event ${index + 1}`} className="slide-image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
