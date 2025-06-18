import React, { useState } from "react";

// PUBLIC_INTERFACE
export default function VideoOutput({ images, voiceUrl, setVideoUrl, isProcessing, setLoading }) {
  const [error, setError] = useState(null);

  const handleCompile = () => {
    setLoading(true);
    setError(null);
    // In production: send images/voice to backend for ffmpeg composition/video render; here, use a sample video/dummy.
    setTimeout(() => {
      // Simulate: set a local sample mp4 URL or use a placeholder
      setVideoUrl("/sample-storymotion-output.mp4");
      setLoading(false);
    }, 1600);
  };

  return (
    <div style={{ marginBottom: 12 }}>
      <h4 style={{ color: "#3b3b00", fontWeight: 500 }}>Export Video</h4>
      <button
        className="btn"
        type="button"
        onClick={handleCompile}
        style={{
          background: "#f5ee24",
          color: "#050505",
          fontWeight: 600,
          borderRadius: 4,
          fontSize: "1.01rem",
          marginBottom: 5,
          padding: "8px 22px"
        }}
        disabled={isProcessing || !images || !images.length || !voiceUrl}
      >
        {isProcessing ? "Compiling Video..." : "Compile & Export Video"}
      </button>
      {error && <div style={{ color: "#d22" }}>{error}</div>}
      <p style={{ color: "#666", fontSize: 13, marginTop: 8 }}>
        Note: Demo will output a placeholder MP4. For real export, connect to a video backend.
      </p>
    </div>
  );
}
