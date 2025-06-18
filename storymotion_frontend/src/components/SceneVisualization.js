import React from "react";

// PUBLIC_INTERFACE
export default function SceneVisualization({ analysis, sceneImages, isProcessing }) {
  if (!analysis || !analysis.scenes || !analysis.scenes.length) return null;
  return (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ fontWeight: 600, color: "#045", marginBottom: 12 }}>Scenes & Visuals</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {analysis.scenes.map((scene, idx) => (
          <div
            key={idx}
            style={{
              background: "#fafffe",
              border: "1px solid #eee",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              padding: 17,
              gap: 20
            }}
          >
            <div style={{ flex: 3 }}>
              <strong style={{ color: "#555" }}>{scene.title || `Scene ${idx + 1}`}</strong>
              <div style={{ fontSize: 15, color: "#111", marginTop: 2 }}>{scene.text}</div>
            </div>
            <div style={{ flex: 2, minWidth: 115 }}>
              {sceneImages[idx] ? (
                <img
                  src={sceneImages[idx]}
                  alt={`Scene ${idx + 1}`}
                  style={{ width: 110, height: 110, objectFit: "cover", borderRadius: 6, border: "1.5px solid #e0e31b" }}
                />
              ) : (
                <div
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: 6,
                    background: "#ededed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ccc",
                    fontSize: 13
                  }}
                >
                  {isProcessing ? "Generating..." : "No Image"}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
