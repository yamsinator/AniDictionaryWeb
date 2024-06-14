import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
    const [animeData, setAnimeData] = useState([]);
    const [mangaData, setMangaData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnimeData = async () => {
            try {
                const response = await axios.get('https://api.jikan.moe/v4/seasons/2024/spring');
                if (response.data && response.data.data) {
                    // console.log('Fetched Anime Data:', response.data.data); // Debug log
                    setAnimeData(response.data.data);
                } else {
                    console.error('No data found in response:', response);
                }
            } catch (error) {
                console.error('Error fetching anime data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchMangaData = async () => {
            try {
                const response = await axios.get('https://api.jikan.moe/v4/manga');
                if (response.data && response.data.data) {
                    // console.log('Fetched Manga Data:', response.data.data); // Debug log
                    setMangaData(response.data.data);
                } else {
                    console.error('No data found in response:', response);
                }
            } catch (error) {
                console.error('Error fetching manga data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimeData();
        fetchMangaData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }

    return (
        <div className="homepage">
            <div className="content-wrapper">
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
                                    {animeData.map((_, index) => (
                                        <li key={index}></li>
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
