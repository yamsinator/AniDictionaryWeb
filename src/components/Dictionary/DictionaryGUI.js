import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    searchAnimeByName,
    searchCharactersByName,
    searchMangaByName,
    searchPeopleByName,
    // searchNewsByID
} from './Dictionary';
import './DictionaryGUI.css'; // Import custom CSS styles

function DictionaryGUI() {
    const [searchTerm, setSearchTerm] = useState('');
    const [displayedSearchTerm, setDisplayedSearchTerm] = useState('');
    const [animeResults, setAnimeResults] = useState([]);
    const [mangaResults, setMangaResults] = useState([]);
    const [charResults, setCharResults] = useState([]);
    const [peopleResults, setPeopleResults] = useState([]);
    // const [newsResults, setNewsResults] = useState([]);
    const [searched, setSearched] = useState(false);

    const location = useLocation();
    const searchTimeoutRef = useRef(null);

    // Refs for each section to enable scrolling
    const animeRef = useRef(null);
    const mangaRef = useRef(null);
    const charactersRef = useRef(null);
    const peopleRef = useRef(null);

<<<<<<< HEAD
    // Add delay to API request
=======
    // Helper function to add a delay
>>>>>>> parent of 8de0084 (Updated CSS file to reflect left and right sections of JS file of the DictionaryGUI.)
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Modified handleSearch function to accept a term
    const handleSearch = async (term = searchTerm) => {
        if (term.trim() === '') {
            alert('Please enter something to search');
            return;
        }

        clearTimeout(searchTimeoutRef.current);
        setSearched(false);

        const animeResults = await searchAnimeByName(term);
        setAnimeResults(animeResults);

        await delay(334); // 1000ms / 3 requests per second = ~334ms delay between each request

        const mangaResults = await searchMangaByName(term);
        setMangaResults(mangaResults);

        await delay(334);

        const charResults = await searchCharactersByName(term);
        setCharResults(charResults);

        await delay(334);

        const peopleResults = await searchPeopleByName(term);
        setPeopleResults(peopleResults);

        setDisplayedSearchTerm(term);
        setSearched(true);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

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

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('search');

        if (query) {
            setSearchTerm(query);
            handleSearch(query); // Trigger search with URL parameter
        }
    }, [location.search]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="super-container">
            <div className="search-section">
                <label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Search Anime..."
                    />
                </label>
                <button onClick={handleSearch}>Search</button>
            </div>

            {searched && (
                <div className="jump">
                    <h2>Search Results for: "{displayedSearchTerm}"</h2>
                    <p>
                        Jump to:{' '}
                        <a onClick={() => scrollToSection('anime')}>Anime</a>
                        <a onClick={() => scrollToSection('manga')}>Manga</a>
                        <a onClick={() => scrollToSection('character')}>Characters</a>
                        <a onClick={() => scrollToSection('people')}>People</a>
                    </p>
                </div>
            )}

            {searched && (
                <div className="content-wrapper">
                    <div className="content">
<<<<<<< HEAD
                        {/* Left Section */}
                        <div className="left-section">
                            <div className="jump">
                                <h2>Search Results for: "{displayedSearchTerm}"</h2>
                                <p>
                                    Jump to:{' '}
                                    <a onClick={() => scrollToSection('anime')}>Anime</a>{' '}
                                    <a onClick={() => scrollToSection('manga')}>Manga</a>{' '}
                                    <a onClick={() => scrollToSection('character')}>Characters</a>{' '}
                                    <a onClick={() => scrollToSection('people')}>People</a>
                                </p>
                            </div>
                            <div className="search-results">
                                <div className="article">
                                    <h1 id="anime">Anime</h1>
                                    {animeResults.slice(0, 10).map((result) => (
                                        <div key={result.mal_id} ref={animeRef} className="search-result">
                                            <img src={result.images.jpg.large_image_url} alt={result.title} />
                                            <div className="result-info">
                                                <a href={`/info/${result.title}`}><h3>{result.title}</h3></a>
                                                <p>{result.type} ({result.episodes} eps)</p>
                                                <p>Score: {result.score ? result.score : 'N/A'}</p>
                                                <p>{result.members.toLocaleString()} members</p>
                                            </div>
=======
                        <div className="search-results">
                            <div className="article">
                                <h1 id="anime">Anime</h1>
                                {animeResults.slice(0, 10).map((animeResults) => (
                                    <div key={animeResults.mal_id} ref={animeRef} className="search-result">
                                        <img src={animeResults.images.jpg.large_image_url} alt={animeResults.title} />
                                        <div className="result-info">
                                            <a href={`/info/${animeResults.title}`}><h3>{animeResults.title}</h3></a>
                                            <p>{animeResults.type} ({animeResults.episodes} eps)</p>
                                            <p>Score: {animeResults.score ? animeResults.score : 'N/A'}</p>
                                            <p>{animeResults.members.toLocaleString()} members</p>
>>>>>>> parent of 8de0084 (Updated CSS file to reflect left and right sections of JS file of the DictionaryGUI.)
                                        </div>
                                    ))}
                                </div>
                                <div className="article">
                                    <h1 id="manga">Manga</h1>
                                    {mangaResults.slice(0, 10).map((result) => (
                                        <div key={result.mal_id} ref={mangaRef} className="search-result">
                                            <img src={result.images.jpg.large_image_url} alt={result.title} />
                                            <div className="result-info">
                                                <a href={`/InfoPage/${result.title}`}><h3>{result.title}</h3></a>
                                                <p>{result.type} ({result.volumes} vols)</p>
                                                <p>Score: {result.score}</p>
                                                <p>{result.members.toLocaleString()} members</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="article">
                                    <h1 id="character">Characters</h1>
                                    {charResults.slice(0, 10).map((result) => (
                                        <div key={result.mal_id} ref={charactersRef} className="search-result">
                                            <img src={result.images.jpg.image_url} alt={result.name} />
                                            <div className="result-info">
                                                <a href={`/InfoPage/${result.name}`}><h3>{result.name}</h3></a>
                                                <p>{result.name_kanji}</p>
                                                <p>Favorites: {result.favorites.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="article">
                                    <h1 id="people">People</h1>
                                    {peopleResults.slice(0, 10).map((result) => (
                                        <div key={result.mal_id} ref={peopleRef} className="search-result">
                                            <img src={result.images.jpg.image_url} alt={result.name} />
                                            <div className="result-info">
                                                <a href={`/InfoPage/${result.name}`}><h3>{result.name}</h3></a>
                                                <p>{result.given_name} ({result.family_name})</p>
                                                <p>{formatDate(result.birthday)}</p>
                                                <p>{result.favorites.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
<<<<<<< HEAD
                        </div>
                        {/* Right Section */}
                        <div className="right-section">
                            <div className="jump">
                                <h2>Related Information for: "{displayedSearchTerm}"</h2>
                            </div>
                            <div className="widget">
                                <h2>News<a className="searchButton" href="">Search</a></h2>
                                {/* Content for News */}
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
=======

                            <div className="article">
                                <h1 id="manga">Manga</h1>
                                {mangaResults.slice(0, 10).map((mangaResults) => (
                                    <div key={mangaResults.mal_id} ref={mangaRef} className="search-result">
                                        <img src={mangaResults.images.jpg.large_image_url} alt={mangaResults.title} />
                                        <div className="result-info">
                                            <a href={`/InfoPage/${mangaResults.title}`}><h3>{mangaResults.title}</h3></a>
                                            <p>{mangaResults.type} ({mangaResults.volumes} vols)</p>
                                            <p>Score: {mangaResults.score}</p>
                                            <p>{mangaResults.members.toLocaleString()} members</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="article">
                                <h1 id="character">Characters</h1>
                                {charResults.slice(0, 10).map((charResults) => (
                                    <div key={charResults.mal_id} ref={charactersRef} className="search-result">
                                        <img src={charResults.images.jpg.image_url} alt={charResults.name} />
                                        <div className="result-info">
                                            <a href={`/InfoPage/${charResults.name}`}><h3>{charResults.name}</h3></a>
                                            <p>{charResults.name_kanji}</p>
                                            <p>Favorites: {charResults.favorites.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="article">
                                <h1 id="people">People</h1>
                                {peopleResults.slice(0, 10).map((peopleResults) => (
                                    <div key={peopleResults.mal_id} ref={peopleRef} className="search-result">
                                        <img src={peopleResults.images.jpg.image_url} alt={peopleResults.name} />
                                        <div className="result-info">
                                            <a href={`/InfoPage/${peopleResults.name}`}><h3>{peopleResults.name}</h3></a>
                                            <p>{peopleResults.given_name} ({peopleResults.family_name})</p>
                                            <p>{formatDate(peopleResults.birthday)}</p>
                                            <p>{peopleResults.favorites.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
>>>>>>> parent of 8de0084 (Updated CSS file to reflect left and right sections of JS file of the DictionaryGUI.)
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DictionaryGUI;
