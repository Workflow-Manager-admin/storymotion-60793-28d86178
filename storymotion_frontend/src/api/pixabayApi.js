/**
 * Pixabay API Utility
 * Fetches free-to-use images and videos.
 * 
 * Usage example:
 *   import { fetchImagesFromPixabay, fetchVideosFromPixabay } from './api/pixabayApi';
 *   const { images, error } = await fetchImagesFromPixabay("sunset");
 */

/**
 * Environment Variable Required:
 *   REACT_APP_PIXABAY_API_KEY must be defined in your .env file.
 *   Example in .env:
 *     REACT_APP_PIXABAY_API_KEY=your-pixabay-api-key
 */

function getEnvOrThrow(key) {
  const value = process.env[key];
  if (!value) {
    // eslint-disable-next-line no-console
    console.error(
      `[PixabayApi] Missing environment variable: ${key}. Define it as REACT_APP_PIXABAY_API_KEY in your .env.`
    );
    throw new Error(`Missing required environment variable: ${key} for Pixabay API.`);
  }
  return value;
}

// PUBLIC_INTERFACE
export async function fetchImagesFromPixabay(query, perPage = 15) {
  /**
   * Fetches images from Pixabay by keyword.
   * @param {string} query - Search keyword
   * @param {number} [perPage=15] - Number of results per page
   * @returns {Promise<{images: object[]} | {error: string}>}
   */
  let apiKey;
  try {
    apiKey = getEnvOrThrow("REACT_APP_PIXABAY_API_KEY");
  } catch (err) {
    return { error: err.message };
  }
  try {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&safesearch=true&per_page=${perPage}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Pixabay error: ${res.status}`);
    const data = await res.json();
    return { images: data.hits || [] };
  } catch (err) {
    return { error: err.message || "Pixabay image request failed" };
  }
}

// PUBLIC_INTERFACE
export async function fetchVideosFromPixabay(query, perPage = 10) {
  /**
   * Fetches videos from Pixabay by keyword.
   * @param {string} query - Search keyword
   * @param {number} [perPage=10] - Number of results per page
   * @returns {Promise<{videos: object[]} | {error: string}>}
   */
  let apiKey;
  try {
    apiKey = getEnvOrThrow("REACT_APP_PIXABAY_API_KEY");
  } catch (err) {
    return { error: err.message };
  }
  try {
    const url = `https://pixabay.com/api/videos/?key=${apiKey}&q=${encodeURIComponent(query)}&safesearch=true&per_page=${perPage}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Pixabay error: ${res.status}`);
    const data = await res.json();
    return { videos: data.hits || [] };
  } catch (err) {
    return { error: err.message || "Pixabay video request failed" };
  }
}
