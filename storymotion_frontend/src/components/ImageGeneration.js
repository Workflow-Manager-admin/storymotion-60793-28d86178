import React, { useState } from "react";
import { generateImageWithStability } from "../api/stabilityApi";

// PUBLIC_INTERFACE
export default function ImageGeneration({ scenes, setImages, isProcessing, setLoading }) {
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!scenes || scenes.length === 0) return;
    setLoading(true);
    setError(null);

    let images = [];
    for (let i = 0; i < scenes.length; i++) {
      const prompt = scenes[i].text;
      // eslint-disable-next-line no-await-in-loop
      const { imageUrl, error: apiError } = await generateImageWithStability(prompt);
      if (apiError) {
        setError(`Image gen failed for Scene ${i + 1}: ${apiError}`);
        images[i] = null;
      } else {
        images[i] = imageUrl;
      }
    }
    setImages(images);
    setLoading(false);
  };

  return (
    <div>
      <h4 style={{ fontWeight: 500, color: "#3b3b00", marginTop: 9 }}>Generate AI Images</h4>
      <button
        className="btn"
        type="button"
        onClick={handleGenerate}
        style={{
          background: "#f5ee24",
          color: "#050505",
          fontWeight: 600,
          borderRadius: 5,
          fontSize: "1.01rem",
          padding: "10px 24px"
        }}
        disabled={isProcessing || !scenes || scenes.length === 0}
      >
        {isProcessing ? "Generating Images..." : "Generate Images"}
      </button>
      {error && <div style={{ color: "#d44", marginTop: 9 }}>{error}</div>}
    </div>
  );
}
