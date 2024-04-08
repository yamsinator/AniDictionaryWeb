import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-links">
                <ul>
                    <li><a href="#">Anime</a></li>
                    <li><a href="#">Manga</a></li>
                    <li><a href="#">Community</a></li>
                    <li><a href="#">Industry</a></li>
                    <li><a href="#">Watch</a></li>
                    <li><a href="#">Read</a></li>
                    <li><a href="#">Help</a></li>
                </ul>
            </div>
            <div className="search">
                <input type="text" placeholder="Search Anime, Manga, and more..." />
                <button>Search</button>
            </div>
        </nav>
    );
}

export default Navbar;