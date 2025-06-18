import React from "react";

/**
 * Splits the story into rough scenes using a simple sentence/chunk strategy.
 * In production, a refined NLP-based approach could be swapped in or this can be delegated to the backend.
 */
// PUBLIC_INTERFACE
function extractScenes(storyText) {
  // Very naive: splits by new lines or periods every ~2 sentences
  if (!storyText) return [];
  const sentences = storyText
    .replace(/\?\s/g, "?. ")
    .replace(/\!\s/g, "!. ")
    .replace(/\.\s/g, ".|")
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);

  // Group every ~2 sentences as a scene
  const chunkSize = sentences.length >= 8 ? 2 : 1;
  const scenes = [];
  for (let i = 0; i < sentences.length; i += chunkSize) {
    scenes.push(sentences.slice(i, i + chunkSize).join(" "));
  }
  return scenes.map((txt, idx) => ({ title: `Scene ${idx + 1}`, text: txt }));
}

// PUBLIC_INTERFACE
export default function StoryAnalysis({ storyText, analysis, setAnalysis, setLoading, isProcessing }) {
  const onAnalyze = async () => {
    if (!storyText || storyText.trim().length < 16) {
      setAnalysis({ scenes: [], error: "Please enter a longer story." });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const scenes = extractScenes(storyText);
      setAnalysis({ scenes, error: null });
      setLoading(false);
    }, 900); // Simulate async
  };

  React.useEffect(() => {
    if (storyText && (!analysis || !analysis.scenes.length)) {
      onAnalyze();
    }
    // eslint-disable-next-line
  }, [storyText]);

  return (
    <div>
      <h3 style={{ fontWeight: 600, marginBottom: 14, color: "#6A6A1F" }}>Story Structure</h3>
      {analysis.error && <div style={{ color: "#f00", fontWeight: 600 }}>{analysis.error}</div>}
      {isProcessing && <span>Analyzing story...</span>}
      {!isProcessing && analysis && analysis.scenes.length > 0 && (
        <ol style={{ paddingLeft: 26, color: "#050505" }}>
          {analysis.scenes.map((scene, idx) => (
            <li key={idx} style={{ marginBottom: 16 }}>
              <strong>{scene.title}: </strong>
              <span>{scene.text}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
