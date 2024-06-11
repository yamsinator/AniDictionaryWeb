import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [searchTerm, setSearchTerm] = useState('');
    const history = useHistory();

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            history.push({
                pathname: '/dictionary',
                search: `?search=${encodeURIComponent(searchTerm)}`
            });
        } else {
            alert("Please enter something to search");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

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
                <input type="text" value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Search Anime, Manga, and more..." />
                <button onClick={handleSearch}>Search</button>
            </div>
        </nav>
    );
}

export default Navbar;