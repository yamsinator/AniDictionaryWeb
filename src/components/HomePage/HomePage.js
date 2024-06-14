import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
    const [animeData, setAnimeData] = useState([]);
    const [mangaData, setMangaData] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const MAX_RETRIES = 3;

    // Function to fetch anime data
    const fetchAnimeData = async (retries = 0) => {
        try {
            const response = await axios.get('https://api.jikan.moe/v4/seasons/2024/spring');
            if (response.data && response.data.data) {
                setAnimeData(response.data.data);
            } else {
                console.error('No data found in response:', response);
            }
        } catch (error) {
            if (error.response && error.response.status === 429 && retries < MAX_RETRIES) {
                setTimeout(() => fetchAnimeData(retries + 1), 1000); // Retry after 1 second
            } else {
                console.error('Error fetching anime data:', error);
                setError(error);
            }
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch manga data
    const fetchMangaData = async (retries = 0) => {
        try {
            const response = await axios.get('https://api.jikan.moe/v4/manga');
            if (response.data && response.data.data) {
                setMangaData(response.data.data);
            } else {
                console.error('No data found in response:', response);
            }
        } catch (error) {
            if (error.response && error.response.status === 429 && retries < MAX_RETRIES) {
                setTimeout(() => fetchMangaData(retries + 1), 1000); // Retry after 1 second
            } else {
                console.error('Error fetching manga data:', error);
                setError(error);
            }
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch recommendations for a given anime ID
    const fetchRecommendations = async (animeId, retries = 0) => {
        try {
            const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/recommendations`);
            if (response.data && response.data.data) {
                setRecommendations(response.data.data);
            } else {
                console.error('No data found in response:', response);
            }
        } catch (error) {
            if (error.response && error.response.status === 429 && retries < MAX_RETRIES) {
                setTimeout(() => fetchRecommendations(animeId, retries + 1), 1000); // Retry after 1 second
            } else {
                console.error('Error fetching recommendations:', error);
                setError(error);
            }
        }
    };

    // Function to select a random anime ID and fetch recommendations
    const fetchRandomRecommendations = () => {
        if (animeData.length > 0) {
            const randomAnime = animeData[Math.floor(Math.random() * animeData.length)];
            fetchRecommendations(randomAnime.mal_id);
        }
    };

    useEffect(() => {
        fetchAnimeData();
        fetchMangaData();
    }, []);

    useEffect(() => {
        if (animeData.length > 0) {
            fetchRandomRecommendations();
        }
    }, [animeData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }

    return (
        <div className="homepage">
            <div className="content-wrapper">
                {/* Left Section */}
                <div className="panel-header">
                    <h1>Welcome to AniDictionary!</h1>
                </div>
                <div id="content">
                    <div className="left-section">
                        <div className="widget">
                            <h2>Announcements</h2>
                            <p>Currently updating the webpage to display information soon!</p>
                        </div>
                        <div className="widget">
                            <h2>Spring 2024 Anime</h2>
                            <div className="scroll-container">
                                <ul className="horizontal-scroll">
                                    {animeData.slice(0, 10).map((anime) => (
                                        <li key={anime.mal_id} className="anime-item">
                                            <a href={anime.url} className="anime-link">
                                                <img src={anime.images.jpg.image_url} alt={anime.title} className="anime-image" />
                                                <span className="title-overlay">{anime.title}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="widget">
                            <h2>Manga</h2>
                            <div className="scroll-container">
                                <ul className="horizontal-scroll">
                                    {mangaData.slice(0, 10).map((manga) => (
                                        <li key={manga.mal_id} className="anime-item">
                                            <a href={manga.url} className="anime-link">
                                                <img src={manga.images.jpg.image_url} alt={manga.title} className="anime-image" />
                                                <span className="title-overlay">{manga.title}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="widget">
                            <h2>Anime Suggestions</h2>
                            <div className="scroll-container">
                                <ul className="horizontal-scroll">
                                    {recommendations.slice(0, 10).map((rec) => (
                                        <li key={rec.entry.mal_id} className="anime-item">
                                            <a href={rec.entry.url} className="anime-link">
                                                <img src={rec.entry.images.jpg.image_url} alt={rec.entry.title} className="anime-image" />
                                                <span className="title-overlay">{rec.entry.title}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="widget">
                            <h2>Manga Suggestions</h2>
                            <div className="scroll-container">
                                <ul className="horizontal-scroll">
                                    {animeData.map((_, index) => (
                                        <li key={index}></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Right Section */}
                    <div className="right-section">
                        <div className="widget">
                            <h2>Top Anime</h2>
                        </div>
                        <div className="widget">
                            <h2>Top Upcoming Anime</h2>
                        </div>
                        <div className="widget">
                            <h2>Most Popular Anime</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
