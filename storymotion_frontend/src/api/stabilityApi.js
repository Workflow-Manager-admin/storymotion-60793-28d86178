/**
 * Stability AI API Utility
 * Exports function to generate an image from a prompt.
 * 
 * Usage example:
 *   import { generateImageWithStability } from './api/stabilityApi';
 *   const result = await generateImageWithStability("A futuristic cityscape at dusk");
 */

// PUBLIC_INTERFACE
export async function generateImageWithStability(prompt) {
  /**
   * Generates an image with Stability AI from a text prompt.
   * @param {string} prompt - The descriptive prompt for image generation.
   * @returns {Promise<{imageUrl: string} | {error: string}>}
   */
  const apiKey = process.env.REACT_APP_STABILITY_API_KEY;
  if (!apiKey) {
    return { error: "Missing Stability AI API key." };
  }
  try {
    const response = await fetch("https://api.stability.ai/v1/generation/stable-diffusion-v1-5/text-to-image", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        text_prompts: [{text: prompt}],
        cfg_scale: 7,
        clip_guidance_preset: "NONE",
        height: 512,
        width: 512,
        samples: 1,
        steps: 30
      })
    });
    if (!response.ok) {
      throw new Error(`Stability AI error: ${response.status}`);
    }
    const data = await response.json();
    // API returns base64
    if (data && data.artifacts && data.artifacts.length) {
      const base64 = data.artifacts[0].base64;
      return { imageUrl: `data:image/png;base64,${base64}` };
    }
    return { error: "No image received." };
  } catch (err) {
    return { error: err.message || "Stability AI request failed" };
  }
}
