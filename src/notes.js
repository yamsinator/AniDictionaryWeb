// Function to fetch anime news by anime ID
async function fetchAnimeNews(animeID) {
    try {
        // Construct the URL for fetching news articles for the specified anime
        const response = await fetch(`https://api.jikan.moe/v4/anime/${animeID}/news`);

        // Check if the response status is not okay
        if (!response.ok) {
            throw new Error('Failed to fetch anime news');
        }

        // Parse the response JSON data
        const data = await response.json();

        // Return the array of news articles from the 'data' property
        return data.data;
    } catch (error) {
        console.error('Error fetching anime news:', error);
        return []; // Return an empty array if there's an error
    }
}

// Test fetching anime news for a specific anime ID
async function testFetchAnimeNews() {
    const animeID = 21; // Replace with the desired anime ID

    try {
        const newsArticles = await fetchAnimeNews(animeID);
        console.log('News Articles:', newsArticles);
    } catch (error) {
        console.error('Error testing fetchAnimeNews:', error);
    }
}

// Call the test function to fetch anime news and log the results
testFetchAnimeNews();
