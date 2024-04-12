// src/components/Header.js
import React from 'react';
import './Header.css'

const Header = () => {
    return (
        <header className="app-header">
           <a href="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1>AniDictionary</h1>
      </a>
        </header>
    );
};

export default Header;
