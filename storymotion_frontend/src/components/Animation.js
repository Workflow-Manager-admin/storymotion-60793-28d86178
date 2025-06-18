import React, { useState } from "react";

// PUBLIC_INTERFACE
export default function Animation({ images, voiceUrl, setAnimationData, isProcessing, setLoading }) {
  const [current, setCurrent] = useState(0);
  const hasAnimation = images && images.length && voiceUrl;

  const handleStartAnimation = () => {
    // This would in a full app animate scene transitions + sync narration
    // Here, simulate it with a "play" preview.
    setLoading(true);
    setTimeout(() => {
      setAnimationData(images); // In real, this would be the animation/video blob/frames
      setLoading(false);
    }, 1000);
  };

  React.useEffect(() => {
    setCurrent(0);
  }, [images, voiceUrl]);

  return (
    <div style={{ marginBottom: 18 }}>
      <h4 style={{ fontWeight: 500, color: "#3b3b00" }}>Animation Preview</h4>
      <button
        className="btn"
        type="button"
        onClick={handleStartAnimation}
        style={{
          background: "#f5ee24",
          color: "#050505",
          fontWeight: 600,
          borderRadius: 4,
          marginRight: 10,
          padding: "7px 18px"
        }}
        disabled={!hasAnimation || isProcessing}
      >
        {isProcessing ? "Animating..." : "Play Animation"}
      </button>
      {hasAnimation && !isProcessing && (
        <div style={{ marginTop: 8, marginLeft: 2 }}>
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Anim scene ${idx + 1}`}
              style={{
                width: 56,
                height: 56,
                objectFit: "cover",
                marginRight: 5,
                border: idx === current ? "3px solid #f5ee24" : "1px solid #ccc",
                borderRadius: 4
              }}
            />
          ))}
          {voiceUrl && (
            <audio controls src={voiceUrl} style={{ marginLeft: 22, marginTop: 7, verticalAlign: "middle" }}>
              Audio narration preview unavailable.
            </audio>
          )}
        </div>
      )}
    </div>
  );
}
