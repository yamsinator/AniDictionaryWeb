import React, { useState } from 'react';
import { searchAnimeByName } from './Dictionary';
import './DictionaryGUI.css'; // Import custom CSS styles

function DictionaryGUI() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        if (searchTerm.trim() === '') {
            alert('Please enter something to search');
            return;
        }

        const results = await searchAnimeByName(searchTerm);
        setSearchResults(results);
    };

    return (
        <div className="super-container">
            <div className="search-section">
                <label>
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </label>
                <button onClick={handleSearch}>Search</button>
            </div>
            {/* Display search results */}
            {searchResults.length > 0 && (
                <div className="content-wrapper">
                    <div className="content">
                        <div className="search-results">
                            {searchResults.map((result) => (
                                <div key={result.id} className="search-result">
                                    <img src={result.small_image_url} />
                                    <div className="result-info">
                                        <a href="#"><h3>{result.title}</h3></a>
                                        <p>{result.type} ({result.episodes} eps)</p>
                                        <p>Score: {result.score}</p>
                                        <p>{result.members.toLocaleString()} members</p>
                                        {/* Add more information here as needed */}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="right-side">
                            <div className="widget">
                                <h2>News</h2>
                                <p>{/* Content for News */} </p>
                            </div>
                            <div className="widget">
                                <h2>Featured Articles</h2>
                                {/* Content for Featured Articles */}
                            </div>
                            <div className="widget">
                                <h2>Forum Topics</h2>
                                {/* Content for Forum Topics */}
                            </div>
                            <div className="widget">
                                <h2>Clubs</h2>
                                {/* Content for Clubs */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DictionaryGUI;