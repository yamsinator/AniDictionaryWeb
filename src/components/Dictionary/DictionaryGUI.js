import React, { useState } from 'react';
import { searchAnimeByName } from './Dictionary';
import './components/Dictionary/DictionaryGUI.css'; // Import custom CSS styles

function DictionaryGUI() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        if (searchTerm.trim() === '') {
            alert('Please enter a search term.');
            return;
        }

        const results = await searchAnimeByName(searchTerm);
        setSearchResults(results);
    };

    return (
        <div>
            <label>
                Search for Anime:
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </label>
            <button onClick={handleSearch}>Search</button>

            {/* Display search results */}
            {searchResults.length > 0 && (
                <div className="search-results">
                    {searchResults.map((result) => (
                        <div key={result.id} className="search-result">
                            <img src={result.small_image_url} alt={result.title} />
                            <div className="result-info">
                                <h3>{result.title}</h3>
                                <p>{result.type} ({result.episodes} eps)</p>
                                <p>Score: {result.score}</p>
                                <p>{result.members.toLocaleString()} members</p>
                                {/* Add more information here as needed */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DictionaryGUI;