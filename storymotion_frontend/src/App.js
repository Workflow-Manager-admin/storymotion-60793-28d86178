import React, { useState } from "react";
import "./App.css";
import StoryInput from "./components/StoryInput";
import StoryAnalysis from "./components/StoryAnalysis";
import SceneVisualization from "./components/SceneVisualization";
import ImageGeneration from "./components/ImageGeneration";
import VoiceNarration from "./components/VoiceNarration";
import Animation from "./components/Animation";
import VideoPlayback from "./components/VideoPlayback";
import VideoOutput from "./components/VideoOutput";

/**
 * Color Theme Constants
 */
const THEME = {
  primary: "#050505",
  secondary: "#fafffe",
  accent: "#f5ee24"
};

/**
 * Main App Container for StoryMotion
 * Orchestrates all features, manages state, and handles data between features.
 */
// PUBLIC_INTERFACE
function App() {
  // State for the workflow
  const [storyText, setStoryText] = useState("");
  const [analysis, setAnalysis] = useState({ scenes: [], error: null });
  const [sceneImages, setSceneImages] = useState([]);
  const [voiceUrl, setVoiceUrl] = useState(null);
  const [animationData, setAnimationData] = useState([]); // URLs or blob objects
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState({
    analysis: false,
    images: false,
    voice: false,
    animation: false,
    video: false
  });

  /**
   * Handler to reset state for a new story workflow.
   */
  const resetWorkflow = () => {
    setStoryText("");
    setAnalysis({ scenes: [], error: null });
    setSceneImages([]);
    setVoiceUrl(null);
    setAnimationData([]);
    setVideoUrl(null);
    setLoading({
      analysis: false,
      images: false,
      voice: false,
      animation: false,
      video: false
    });
  };

  return (
    <div className="storymotion-app" style={{ background: THEME.secondary, minHeight: "100vh", color: THEME.primary }}>
      <nav
        className="navbar"
        style={{
          background: THEME.primary,
          color: THEME.accent,
          borderBottom: `3px solid ${THEME.accent}`
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="logo" style={{ display: "flex", alignItems: "center", fontWeight: 600 }}>
            <span style={{ color: THEME.accent, fontSize: "2rem", marginRight: 12 }}>🎬</span> StoryMotion
          </span>
          <button
            className="btn"
            style={{
              background: THEME.accent,
              color: THEME.primary,
              fontWeight: 700,
              border: "none",
              borderRadius: 4
            }}
            onClick={resetWorkflow}
          >
            New Story
          </button>
        </div>
      </nav>
      <main style={{ paddingTop: 90 }}>
        <div className="container" style={{ maxWidth: 970, margin: "0 auto", padding: 12 }}>
          <section
            className="section-story-input"
            style={{
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 3px 18px rgba(5,5,5,.08)",
              marginBottom: 30,
              padding: "2.7em 2.5em"
            }}
          >
            <StoryInput
              storyText={storyText}
              setStoryText={setStoryText}
              onSubmit={() => setAnalysis({ scenes: [], error: null })}
              isProcessing={loading.analysis}
            />
          </section>

          <section
            className="section-analysis"
            style={{
              background: THEME.secondary,
              borderLeft: `5px solid ${THEME.accent}`,
              borderRadius: 7,
              marginBottom: 28,
              padding: 24
            }}
          >
            <StoryAnalysis
              storyText={storyText}
              analysis={analysis}
              setAnalysis={setAnalysis}
              setLoading={flag => setLoading(l => ({ ...l, analysis: flag }))}
              isProcessing={loading.analysis}
            />
          </section>

          <section style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
            <div style={{ flex: 3, minWidth: 320 }}>
              <SceneVisualization
                analysis={analysis}
                sceneImages={sceneImages}
                isProcessing={loading.images}
              />
              <ImageGeneration
                scenes={analysis && analysis.scenes}
                setImages={setSceneImages}
                setLoading={flag => setLoading(l => ({ ...l, images: flag }))}
                isProcessing={loading.images}
              />
            </div>
            <div style={{ flex: 2, minWidth: 340, background: "#fff", borderRadius: 8, boxShadow: "0 2px 9px rgba(5,5,5,.06)", padding: 16 }}>
              <VoiceNarration
                storyText={storyText}
                setVoiceUrl={setVoiceUrl}
                isProcessing={loading.voice}
                setLoading={flag => setLoading(l => ({ ...l, voice: flag }))}
              />
              <Animation
                images={sceneImages}
                voiceUrl={voiceUrl}
                setAnimationData={setAnimationData}
                isProcessing={loading.animation}
                setLoading={flag => setLoading(l => ({ ...l, animation: flag }))}
              />
              <VideoOutput
                images={sceneImages}
                voiceUrl={voiceUrl}
                setVideoUrl={setVideoUrl}
                isProcessing={loading.video}
                setLoading={flag => setLoading(l => ({ ...l, video: flag }))}
              />
            </div>
          </section>

          <section style={{ marginTop: 32 }}>
            <VideoPlayback videoUrl={videoUrl} isProcessing={loading.video} />
          </section>
        </div>
      </main>
      <footer style={{
        marginTop: 64,
        padding: "2em 0 1em",
        background: THEME.primary,
        color: THEME.accent,
        textAlign: "center"
      }}>
        <span style={{ fontSize: 17, fontWeight: 400 }}>Powered by AI • StoryMotion &copy; {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}

export default App;
