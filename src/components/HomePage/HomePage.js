import React from 'react';
import './HomePage.css';

const HomePage = () => {
    return (

        <div className="homepage">
            <div className="content-wrapper">
                {/* Left Section */}
                <div className="panel-header">
                    <h1>My Panel</h1>
                </div>
                <div id="content">
                    <div className="left-section">
                        <div className="widget">
                            <h2>Announcements</h2>
                            {/* Content for Announcements */}
                        </div>
                        <div className="widget">
                            <h2>Spring 2024 Anime</h2>
                            {/* Content for Spring 2024 Anime */}
                        </div>
                        <div className="widget">
                            <h2>Manga</h2>
                            {/* Content for Manga */}
                        </div>
                        <div className="widget">
                            <h2>Anime Suggestions</h2>
                            {/* Content for Anime Suggestions */}
                        </div>
                        <div className="widget">
                            <h2>Manga Suggestions</h2>
                            {/* Content for Manga Suggestions */}
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
