const API_BASE_URL = 'https://api.jikan.moe/v4/';

// Gets search based from the anime, manga, or character API URLs
async function performSearch(type, searchQuery) {
    try {
        const response = await fetch(`${API_BASE_URL}${type}?q=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        const animeId = data.data.mal_id;
        const animeNews = await fetchAnimeNews(animeId);

        return data.data;
    } 
    catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function fetchAnimeNews(animeID) {
    try {
        // Construct the URL for fetching news articles for the specified anime
        const response = await fetch(`${API_BASE_URL}anime/${animeID}/news`);

        // Check if the response status is not okay
        if (!response.ok) {
            throw new Error('Failed to fetch anime news');
        }

        // Parse the response JSON data
        const data = await response.json();

        // Return the array of news articles from the 'data' property
        return data.data;
    } 
    catch (error) {
        console.error('Error fetching anime news:', error);
        return []; // Return an empty array if there's an error
    }
}
 
export async function searchAnimeByName(animeName) {
    return performSearch('anime', animeName);
}

export async function searchMangaByName(mangaName) {
    return performSearch('manga', mangaName);
}

export async function searchCharactersByName(charName) {
    return performSearch('characters', charName);
}

export async function searchPeopleByName(personName) {
    return performSearch('people', personName);
}

export async function searchNewsByID(animeID) {
    return fetchAnimeNews(animeID);
}


