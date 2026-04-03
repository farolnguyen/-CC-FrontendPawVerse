import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 48 48" width="40" height="40">
                <circle cx="24" cy="24" r="22" fill="#8B5CF6" />
                <path d="M16 28c0 2 2 4 4 4s4-2 4-4" stroke="white" strokeWidth="2" fill="none" />
                <path d="M28 28c0 2 2 4 4 4s4-2 4-4" stroke="white" strokeWidth="2" fill="none" />
                <ellipse cx="24" cy="22" rx="6" ry="5" fill="white" />
                <circle cx="21" cy="21" r="1.5" fill="#333" />
                <circle cx="27" cy="21" r="1.5" fill="#333" />
                <path d="M23 24c0 1 1 1 2 0" stroke="#333" strokeWidth="1" fill="none" />
              </svg>
            </div>
            <span className="logo-text">PawVerse</span>
          </Link>
          
          <nav className="nav-menu">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Product</Link>
            <Link to="/service" className="nav-link">Service</Link>
          </nav>
        </div>

        <div className="header-right">
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </form>

          <div className="header-icons">
            <Link to="/cart" className="icon-button">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 2 3 9v13h18V9l-6-7z"/>
                <path d="M3 9h18"/>
                <path d="M9 2v7"/>
              </svg>
            </Link>
            
            <Link to="/account" className="icon-button">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
