/**
 * Example usage of API helpers:
 * 
 * // Import
 * import { generateImageWithStability } from "./api/stabilityApi";
 * import { getVoiceFromElevenLabs } from "./api/elevenLabsApi";
 * import { fetchImagesFromPixabay, fetchVideosFromPixabay } from "./api/pixabayApi";
 * import { fetchMovieInfoFromTMDB } from "./api/tmdbApi";
 * 
 * // Sample usage (async context)
 * const { imageUrl, error } = await generateImageWithStability("A cat surfing on the ocean");
 * const { audioUrl } = await getVoiceFromElevenLabs("Once upon a time...");
 * const { images } = await fetchImagesFromPixabay("mountain", 5);
 * const { videos } = await fetchVideosFromPixabay("adventure", 3);
 * const { results } = await fetchMovieInfoFromTMDB("The Matrix");
 *
 * // All helper functions handle errors and require relevant .env configuration.
 */
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn">Template Button</button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="hero">
            <div className="subtitle">AI Workflow Manager Template</div>
            
            <h1 className="title">storymotion_frontend</h1>
            
            <div className="description">
              Start building your application.
            </div>
            
            <button className="btn btn-large">Button</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;