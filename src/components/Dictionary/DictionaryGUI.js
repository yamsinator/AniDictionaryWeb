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

    const search = () => {
        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = setTimeout(async () => {
            if (searchTerm.trim() === '') {
                setAnimeResults([]);
                setMangaResults([]);
                setCharResults([]);
                setPeopleResults([]);
                // setNewsResults([]);
                setSearched(false);
                return;
            }

            setSearched(true);

            const animeResults = await searchAnimeByName(searchTerm);
            setAnimeResults(animeResults);

            const mangaResults = await searchMangaByName(searchTerm);
            setMangaResults(mangaResults);

            const charResults = await searchCharactersByName(searchTerm);
            setCharResults(charResults);

            const peopleResults = await searchPeopleByName(searchTerm);
            setPeopleResults(peopleResults);

            // if (animeResults.length > 0) {
            //     const animeId = animeResults[0].mal_id;
            //     const newsResults = await searchNewsByID(animeId);
            //     setNewsResults(newsResults);
            // }
        }, 3000); // Adjust the debounce delay (in milliseconds) as needed
    };
    // Function to commit search on each type of search query for the dicitonary
    // const search = async () => {
    //     if (searchTerm.trim() === '') {
    //         alert('Please enter something to search');
    //         return;
    //     }

    //     setSearched(true);

    //     const animeResults = await searchAnimeByName(searchTerm);
    //     setAnimeResults(animeResults);

    //     const mangaResults = await searchMangaByName(searchTerm);
    //     // console.log("MANGA RESULTS: ", mangaResults);
    //     setMangaResults(mangaResults);

    //     const charResults = await searchCharactersByName(searchTerm);
    //     setCharResults(charResults);

    //     const peopleResults = await searchPeopleByName(searchTerm);
    //     setPeopleResults(peopleResults);

    //     if (animeResults.length > 0) {
    //         const animeId = animeResults[0].mal_id;
    //         const newsResults = await searchNewsByID(animeId);
    //         setNewsResults(newsResults);
    //     }
    // };

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

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('search');

        if (query) {
            setSearchTerm(query);
        }
    }, [location.search]);

    // Trigger the search function whenever searchTerm changes
    useEffect(() => {
        if (searchTerm.trim() !== '') {
            // Call search function whenever searchTerm changes and is not empty
            search();
        }
    }, [searchTerm]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="super-container">
            <div className="search-section">
                <label>
                    <input type="text" value={searchTerm} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder='Search Anime...' />
                </label>
                <button onClick={search} onChange={(e) => setSearchTerm(e.target.value)}>Search</button>
            </div>
            {searched && (
                <div className="jump">
                    <h2>Search Results for: "{searchTerm}"</h2>
                    <p>Jump to: <a onClick={() => scrollToSection('anime')}>Anime</a>
                        <a onClick={() => scrollToSection('manga')}>Manga</a>
                        <a onClick={() => scrollToSection('character')}>Characters</a>
                        <a onClick={() => scrollToSection('people')}>People</a>
                    </p>
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
                                {animeResults.slice(0, 10).map((animeResults) => (
                                    <div key={animeResults.mal_id} ref={animeRef} className="search-result">
                                        {/* {console.log("ANIME ID: ", animeResults.mal_id)} */}
                                        <img src={animeResults.images.jpg.large_image_url} />
                                        <div className="result-info">
                                            <a href={`/info/${animeResults.title}`}><h3>{animeResults.title}</h3></a>
                                            <p>{animeResults.type} ({animeResults.episodes} eps)</p>
                                            <p>Score: {animeResults.score ? animeResults.score : 'N/A'}</p>
                                            <p>{animeResults.members.toLocaleString()} members</p>
                                            {/* Add more information here as needed */}
                                        </div>
                                        {/* PUT LINK TO SHOW ALL RESULTS HERE */}
                                    </div>
                                ))}
                            </div>
                            {/* Manga Results */}
                            <div className="article">
                                <h1 id="manga">Manga</h1>
                                {mangaResults.slice(0, 10).map((mangaResults) => (
                                    <div key={mangaResults.mal_id} ref={mangaRef} className="search-result">
                                        {/* {console.log("Manga ID: ", mangaResults.mal_id)} */}
                                        <img src={mangaResults.images.jpg.large_image_url} />
                                        <div className="result-info">
                                            <a href={`/InfoPage/${mangaResults.title}`}><h3>{mangaResults.title}</h3></a>
                                            <p>{mangaResults.type} ({mangaResults.volumes} vols)</p>
                                            <p>Score: {mangaResults.score}</p>
                                            <p>{mangaResults.members.toLocaleString()} members</p>
                                            {/* Add more information here as needed */}
                                        </div>
                                        {/* PUT LINK TO SHOW ALL RESULTS HERE */}
                                    </div>
                                ))}
                            </div>
                            {/* Character Results */}
                            <div className="article">
                                <h1 id="character">Characters</h1>
                                {charResults.slice(0, 10).map((charResults) => (
                                    <div key={charResults.mal_id} ref={charactersRef} className="search-result">
                                        {/* {console.log("CHAR ID: ", charResults.mal_id)} */}
                                        <img src={charResults.images.jpg.image_url} />
                                        <div className="result-info">
                                            <a href={`/InfoPage/${charResults.name}`}><h3>{charResults.name}</h3></a>
                                            <p>{charResults.name_kanji}</p>
                                            <p>Favorites: {charResults.favorites.toLocaleString()}</p>
                                            {/* Add more information here as needed */}
                                        </div>
                                        {/* PUT LINK TO SHOW ALL RESULTS HERE */}
                                    </div>
                                ))}
                            </div>
                            {/* People Results */}
                            <div className="article">
                                <h1 id="people">People</h1>
                                {peopleResults.slice(0, 10).map((peopleResults) => (
                                    <div key={peopleResults.mal_id} ref={peopleRef} className="search-result">
                                        {/* {console.log("PEOPLE ID: ", peopleResults.mal_id)} */}
                                        <img src={peopleResults.images.jpg.image_url} />
                                        <div className="result-info">
                                            <a href={`/InfoPage/${peopleResults.name}`}><h3>{peopleResults.name}</h3></a>
                                            <p>{peopleResults.given_name} ({peopleResults.family_name})</p>
                                            <p>{formatDate(peopleResults.birthday)}</p>
                                            <p>{peopleResults.favorites.toLocaleString()}</p>
                                            {/* Add more information here as needed */}
                                        </div>
                                        {/* PUT LINK TO SHOW ALL RESULTS HERE */}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="right-side">
                            <div className="widget">
                                <h2>News</h2>
                                <article>
                                    {/* Content for News */}
                                    <h3>News coming soon...</h3>
                                    {/* {newsResults.slice(0, 5).map((newsResults) => (
                                        <div key={newsResults.mal_id} className="news-result">
                                            <a href={newsResults.url}><h3>{newsResults.title}</h3></a>
                                        </div>
                                    ))} */}
                                </article>
                            </div>
                            <div className="widget">
                                <h2>Featured Articles</h2>
                                <article>
                                    <h3>Featured Articles coming soon...</h3>
                                    {/* Content for Featured Articles */}
                                </article>
                            </div>
                            <div className="widget">
                                <h2>Forum Topics</h2>
                                <article>
                                <h3>Forum Topics coming soon...</h3>
                                    {/* Content for Forum Topics */}
                                </article>
                            </div>
                            <div className="widget">
                                <h2>Clubs</h2>
                                <article>
                                <h3>Clubs coming soon...</h3>
                                    {/* Content for Clubs */}
                                </article>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DictionaryGUI;