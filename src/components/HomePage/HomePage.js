import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
//import { searchAnimeByName } from '../Dictionary/Dictionary';

const HomePage = () => {
    const [animeData, setAnimeData] = useState([]);

    const sampleBlanks = Array(8).fill(null); // Create an array with 8 null values to represent blank rectangles


    useEffect(() => {
        const fetchAnimeData = async () => {
            try {
                const response = await axios.get('https://api.jikan.moe/v4/seasons/now');
                if (response.data && response.data.anime) {
                    setAnimeData(response.data.anime);
                }
            } catch (error) {
                console.error('Error fetching anime data:', error);
            }
        };

        fetchAnimeData();
    }, []);

//     return (
//         <div className="homepage">
//             <div className="content-wrapper">
//                 {/* Left Section */}
//                 <div className="panel-header">
//                     <h1>Welcome to AniDictionary!</h1>
//                 </div>
//                 <div id="content">
//                     <div className="left-section">
//                         <div className="widget">
//                             <h2>Announcements</h2>
//                             {<p>Currently updating the webpage to display information soon!</p>}
//                         </div>
//                         <div className="widget">
//                             <h2>Spring 2024 Anime</h2>
//                             <div className="scroll-container">
//                             {animeData.map((anime) => (
//                                     <img
//                                         key={anime.mal_id}
//                                         src={anime.images.jpg.large_image_url}
//                                         alt={anime.title}
//                                         className="anime-image"
//                                     />
//                                 ))}
//                             </div>
//                         </div>
//                         <div className="widget">
//                             <h2>Manga</h2>
//                             <div className="scroll-container">
//                                 {/* Render images here */}
//                             </div>
//                         </div>
//                         <div className="widget">
//                             <h2>Anime Suggestions</h2>
//                             <div className="scroll-container">
//                                 {/* Render images here */}
//                             </div>
//                         </div>
//                         <div className="widget">
//                             <h2>Manga Suggestions</h2>
//                             <div className="scroll-container">
//                                 {/* Render images here */}
//                             </div>
//                         </div>
//                     </div>
//                     {/* Right Section */}
//                     <div className="right-section">
//                         <div className="widget">
//                             <h2>Top Anime</h2>
//                             {/* Content for Top Anime */}
//                         </div>
//                         <div className="widget">
//                             <h2>Top Upcoming Anime</h2>
//                             {/* Content for Top Upcoming Anime */}
//                         </div>
//                         <div className="widget">
//                             <h2>Most Popular Anime</h2>
//                             {/* Content for Most Popular Anime */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HomePage;
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
                                    {sampleBlanks.map((_, index) => (
                                        <li key={index} className="blank-rectangle"></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="widget">
                            <h2>Manga</h2>
                            <div className="scroll-container">
                                {/* Render images here */}
                                <ul className="horizontal-scroll">
                                    {sampleBlanks.map((_, index) => (
                                        <li key={index} className="blank-rectangle"></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="widget">
                            <h2>Anime Suggestions</h2>
                            <div className="scroll-container">
                                {/* Render images here */}
                                <ul className="horizontal-scroll">
                                    {sampleBlanks.map((_, index) => (
                                        <li key={index} className="blank-rectangle"></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="widget">
                            <h2>Manga Suggestions</h2>
                            <div className="scroll-container">
                                {/* Render images here */}
                                <ul className="horizontal-scroll">
                                    {sampleBlanks.map((_, index) => (
                                        <li key={index} className="blank-rectangle"></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Right Section */}
                    <div className="right-section">
                        <div className="widget">
                            <h2>Top Anime</h2>
                            {/* Content for Top Anime */}
                        </div>
                        <div className="widget">
                            <h2>Top Upcoming Anime</h2>
                            {/* Content for Top Upcoming Anime */}
                        </div>
                        <div className="widget">
                            <h2>Most Popular Anime</h2>
                            {/* Content for Most Popular Anime */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;