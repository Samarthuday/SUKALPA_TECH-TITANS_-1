import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  useEffect(() => {
    let slideIndex = 0;
    const showSlides = () => {
      const slides = document.getElementsByClassName('slide');
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      slides[slideIndex - 1].style.display = 'block';
      setTimeout(showSlides, 3000); // Change image every 3 seconds
    };
    showSlides();
  }, []);

  return (
    <div className="homepage-container">
      <header className="header">
        <div className="logo">Tech-Titans</div>
        <div className="auth-buttons">
          <Link to="/login" className="button">Login</Link>
          <Link to="/signup" className="button">Sign Up</Link>
        </div>
      </header>
      <hr />
      <div className="slideshow-container">
        <div className="slide fade">
          <img src="https://via.placeholder.com/800x300" alt="Event 1" />
        </div>
        <div className="slide fade">
          <img src="https://via.placeholder.com/800x300" alt="Event 2" />
        </div>
        <div className="slide fade">
          <img src="https://via.placeholder.com/800x300" alt="Event 3" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
