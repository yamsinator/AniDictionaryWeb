import React, { useState } from 'react';
import './Navbar.css';
import { searchAnimeByName } from '../Dictionary/Dictionary'; // Import search functions


function Navbar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const aniSearch = async () => {
        if (searchTerm.trim() === '') {
            alert('Please enter something to search');
            return;
        }

        const results = await searchAnimeByName(searchTerm);
        setSearchResults(results);
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
            {/* <div id="search-type">
                <select name="types" id="type">
                    <option>All</option>
                    <option>Anime</option>
                    <option>Manga</option>
                    <option>Characters</option>
                    <option>People</option>
                    <option>Companies</option>
                    <option>Manga Store</option>
                    <option>News</option>
                    <option>Featured Articles</option>
                    <option>Forum</option>
                    <option>Clubs</option>
                    <option>Users</option>
                </select>
            </div> */}
            <div className="search">
                <input type="text" placeholder="Search Anime, Manga, and more..." />
                <button>Search</button>
            </div>
        </nav>
    );
}

export default Navbar;