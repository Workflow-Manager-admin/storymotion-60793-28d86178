/**
 * TMDb API Utility
 * Fetches movie information.
 * 
 * Usage example:
 *   import { fetchMovieInfoFromTMDB } from './api/tmdbApi';
 *   const { results } = await fetchMovieInfoFromTMDB("Inception");
 */

// PUBLIC_INTERFACE
export async function fetchMovieInfoFromTMDB(query, page = 1) {
  /**
   * Fetches movies from TMDb by title keyword.
   * @param {string} query - Movie title or keyword
   * @param {number} [page=1] - Results page for pagination
   * @returns {Promise<{results: object[]} | {error: string}>}
   */
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  if (!apiKey) {
    return { error: "Missing TMDb API key." };
  }
  try {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`TMDb error: ${res.status}`);
    const data = await res.json();
    return { results: data.results || [] };
  } catch (err) {
    return { error: err.message || "TMDb request failed" };
  }
}
