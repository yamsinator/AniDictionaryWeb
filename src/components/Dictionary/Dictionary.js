const API_BASE_URL = 'https://api.jikan.moe/v4/';

// Helper function to add a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Cache object to store fetched anime news data
const animeNewsCache = {};

// Gets search based from the anime, manga, or character API URLs
async function performSearch(type, searchQuery) {
    try {
        const response = await fetch(`${API_BASE_URL}${type}?q=${encodeURIComponent(searchQuery)}&sfw=true`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
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
