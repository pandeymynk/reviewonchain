import React from "react";
import { FiSun, FiMoon, FiPlus, FiX } from "react-icons/fi";
import "../Styles/Header.css";

export const Header = ({ theme, setTheme, onAddReview, showForm }) => {
  return (
    <header className="modern-header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo">
            <span className="logo-icon">⭐</span>
            <h1 className="logo-text">
              <span className="logo-main">ON</span>
              <span className="logo-accent">REVIEWS</span>
            </h1>
          </div>
          <p className="tagline">Decentralized. Transparent. Trustworthy.</p>
        </div>
        
        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          
          <button
            className={`add-review-btn ${showForm ? 'active' : ''}`}
            onClick={onAddReview}
          >
            {showForm ? <FiX /> : <FiPlus />}
            <span>{showForm ? 'Close' : 'Add Review'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};