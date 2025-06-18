/**
 * TMDb API Utility
 * Fetches movie information.
 * 
 * Usage example:
 *   import { fetchMovieInfoFromTMDB } from './api/tmdbApi';
 *   const { results } = await fetchMovieInfoFromTMDB("Inception");
 */


/**
 * Environment Variable Required:
 *   REACT_APP_TMDB_API_KEY must be defined in your .env file.
 *   Example in .env:
 *     REACT_APP_TMDB_API_KEY=your-tmdb-api-key
 */

function getEnvOrThrow(key) {
  const value = process.env[key];
  if (!value) {
    // eslint-disable-next-line no-console
    console.error(
      `[TMDBApi] Missing environment variable: ${key}. Define it as REACT_APP_TMDB_API_KEY in your .env.`
    );
    throw new Error(`Missing required environment variable: ${key} for TMDb API.`);
  }
  return value;
}

// PUBLIC_INTERFACE
export async function fetchMovieInfoFromTMDB(query, page = 1) {
  /**
   * Fetches movies from TMDb by title keyword.
   * @param {string} query - Movie title or keyword
   * @param {number} [page=1] - Results page for pagination
   * @returns {Promise<{results: object[]} | {error: string}>}
   */
  let apiKey;
  try {
    apiKey = getEnvOrThrow("REACT_APP_TMDB_API_KEY");
  } catch (err) {
    return { error: err.message };
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
