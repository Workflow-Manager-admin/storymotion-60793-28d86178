import React, { useState } from "react";
import { getVoiceFromElevenLabs } from "../api/elevenLabsApi";

// PUBLIC_INTERFACE
export default function VoiceNarration({ storyText, setVoiceUrl, isProcessing, setLoading }) {
  const [localUrl, setLocalUrl] = useState("");
  const [error, setError] = useState(null);

  const handleGenerateVoice = async () => {
    if (!storyText || storyText.length < 10) {
      setError("Please provide a story first.");
      return;
    }
    setLoading(true);
    setError(null);
    const { audioUrl, error: apiError } = await getVoiceFromElevenLabs(storyText);
    setLoading(false);
    if (apiError) {
      setError(apiError);
      setVoiceUrl(null);
    } else {
      setLocalUrl(audioUrl);
      setVoiceUrl(audioUrl);
    }
  };

  return (
    <div style={{ marginBottom: 22 }}>
      <h4 style={{ color: "#3b3b00", fontWeight: 500 }}>Voice Narration</h4>
      <button
        className="btn"
        type="button"
        onClick={handleGenerateVoice}
        style={{
          background: "#f5ee24",
          color: "#050505",
          fontWeight: 600,
          borderRadius: 4,
          fontSize: "1.01rem",
          marginBottom: 7,
          padding: "8px 22px"
        }}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing Voice..." : "Generate Voice Narration"}
      </button>
      {localUrl && (
        <audio controls src={localUrl} style={{ marginLeft: 20, verticalAlign: "middle" }}>
          Your browser does not support the audio element.
        </audio>
      )}
      {error && <div style={{ color: "#d22" }}>{error}</div>}
    </div>
  );
}
