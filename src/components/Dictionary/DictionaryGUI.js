import React, { useState, useRef } from 'react';
import { searchAnimeByName, searchCharactersByName, searchMangaByName, searchPeopleByName } from './Dictionary';
import './DictionaryGUI.css'; // Import custom CSS styles

function DictionaryGUI() {
    const [searchTerm, setSearchTerm] = useState('');
    const [animeResults, setAnimeResults] = useState([]);
    const [mangaResults, setMangaResults] = useState([]);
    const [charResults, setCharResults] = useState([]);
    const [peopleResults, setPeopleResults] = useState([]);
    const [searched, setSearched] = useState(false);

    // Refs for each section to enable scrolling
    const animeRef = useRef(null);
    const mangaRef = useRef(null);
    const charactersRef = useRef(null);
    const peopleRef = useRef(null);

    // Function to commit search on each type of search query for the dicitonary
    const search = async () => {
        if (searchTerm.trim() === '') {
            alert('Please enter something to search');
            return;
        }

        const animeResults = await searchAnimeByName(searchTerm);
        setAnimeResults(animeResults);

        const mangaResults = await searchMangaByName(searchTerm);
        setMangaResults(mangaResults);

        const charResults = await searchCharactersByName(searchTerm);
        setCharResults(charResults);

        const peopleResults = await searchPeopleByName(searchTerm);
        setPeopleResults(peopleResults);

        setSearched(true);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            search();
        }
    }

    // Function to format date by removing time information
    const formatDate = (dateTimeString) => {
        const dateObj = new Date(dateTimeString);
        const formattedDate = dateObj.toISOString().split('T')[0]; // Extract date part
        return formattedDate;
    };

    // Function to scroll to a specific section smoothly
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="super-container">
            <div className="search-section">
                <label>
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={handleKeyPress} placeholder='Search Anime...' />
                </label>
                <button onClick={search}>Search</button>
            </div>
            {searched && (
                <div className="jump">
                    <p>Jump to: <a onClick={() => scrollToSection('anime')}>Anime</a>
                        <a onClick={() => scrollToSection('manga')}>Manga</a>
                        <a onClick={() => scrollToSection('character')}>Characters</a>
                        <a onClick={() => scrollToSection('people')}>People</a></p>
                </div>
            )}
            {/* Display search results */}
            {animeResults.length > 0 && (
                <div className="content-wrapper">
                    <div className="content">
                        <div className="search-results">
                            <div className="article">
                                <h1 id="anime">Anime</h1>
                                {/* Anime Results */}
                                {animeResults.map((animeResults) => (
                                    <div ref={animeRef} key={animeResults.id} className="search-result">
                                        <img src={animeResults.images.jpg.large_image_url} />
                                        <div className="result-info">
                                            <a href={`/InfoPage/${animeResults.title}`}><h3>{animeResults.title}</h3></a>
                                            <p>{animeResults.type} ({animeResults.episodes} eps)</p>
                                            <p>Score: {animeResults.score}</p>
                                            <p>{animeResults.members.toLocaleString()} members</p>
                                            {/* Add more information here as needed */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Manga Results */}
                            <div className="article">
                                <h1 id="manga">Manga</h1>
                                {mangaResults.map((mangaResults) => (
                                    <div ref={mangaRef} key={mangaResults.id} className="search-result">
                                        <img src={mangaResults.images.jpg.large_image_url} />
                                        <div className="result-info">
                                            <a href={`/InfoPage/${mangaResults.title}`}><h3>{mangaResults.title}</h3></a>
                                            <p>{mangaResults.type} ({mangaResults.volumes} vols)</p>
                                            <p>Score: {mangaResults.score}</p>
                                            <p>{mangaResults.members.toLocaleString()} members</p>
                                            {/* Add more information here as needed */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Character Results */}
                            <div className="article">
                                <h1 id="character">Characters</h1>
                                {charResults.map((charResults) => (
                                    <div ref={charactersRef} key={charResults.id} className="search-result">
                                        <img src={charResults.images.jpg.image_url} />
                                        <div className="result-info">
                                            <a href={`/InfoPage/${charResults.name}`}><h3>{charResults.name}</h3></a>
                                            <p>{charResults.name_kanji}</p>
                                            <p>Favorites: {charResults.favorites.toLocaleString()}</p>
                                            {/* Add more information here as needed */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* People Results */}
                            <div className="article">
                                <h1 id="people">People</h1>
                                {peopleResults.map((peopleResults) => (
                                    <div ref={peopleRef} key={peopleResults.mal_id} className="search-result">
                                        <img src={peopleResults.images.jpg.image_url} />
                                        <div className="result-info">
                                            <a href={`/InfoPage/${peopleResults.name}`}><h3>{peopleResults.name}</h3></a>
                                            <p>{peopleResults.given_name} ({peopleResults.family_name})</p>
                                            <p>{formatDate(peopleResults.birthday)}</p>
                                            <p>{peopleResults.favorites.toLocaleString()}</p>
                                            {/* Add more information here as needed */}
                                        </div>
                                    </div>
                                ))}
                            </div>
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