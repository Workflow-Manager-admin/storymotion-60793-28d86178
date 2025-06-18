import React from "react";

// PUBLIC_INTERFACE
export default function VideoPlayback({ videoUrl, isProcessing }) {
  return (
    <div>
      <h3 style={{ color: "#6a6a1f", fontWeight: 600, marginBottom: 12 }}>Final Animated Video</h3>
      {isProcessing && <div>Compiling video...</div>}
      {!videoUrl && !isProcessing && (
        <div style={{ color: "#888", fontSize: 16, margin: 8 }}>No video yet. Complete the workflow to see output here.</div>
      )}
      {videoUrl && (
        <video controls width="480" style={{ margin: "16px 0", borderRadius: 8 }}>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video element.
        </video>
      )}
    </div>
  );
}
