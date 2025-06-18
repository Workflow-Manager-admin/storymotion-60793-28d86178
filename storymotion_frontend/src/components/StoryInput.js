import React, { useState } from "react";

// PUBLIC_INTERFACE
export default function StoryInput({ storyText, setStoryText, onSubmit, isProcessing }) {
  const [input, setInput] = useState(storyText || "");

  const handleChange = (e) => {
    setInput(e.target.value);
    if (setStoryText) setStoryText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim().length > 0 && onSubmit) {
      onSubmit(input);
    }
  };

  return (
    <div>
      <h2 style={{ margin: 0, fontWeight: 600, fontSize: "1.35rem" }}>Your Story</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
        <textarea
          value={input}
          onChange={handleChange}
          rows={5}
          placeholder="Write or paste your personal story here (min 20 words)..."
          style={{
            width: "100%",
            minHeight: 98,
            resize: "vertical",
            border: "1.5px solid #d4d4d4",
            padding: 14,
            fontSize: 16,
            borderRadius: 6,
            outlineColor: "#f5ee24"
          }}
          required
          minLength={20}
          disabled={isProcessing}
        />
        <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end" }}>
          <button
            type="submit"
            className="btn"
            style={{
              background: "#f5ee24",
              color: "#050505",
              fontWeight: 600,
              padding: "12px 32px",
              borderRadius: 5,
              fontSize: "1.09rem"
            }}
            disabled={isProcessing || input.trim().length < 20}
          >
            {isProcessing ? "Analyzing..." : "Analyze Story"}
          </button>
        </div>
      </form>
    </div>
  );
}
