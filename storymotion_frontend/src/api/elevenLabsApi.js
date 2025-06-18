/**
 * ElevenLabs API Utility
 * Exports function to generate voice narration audio from text.
 * 
 * Usage example:
 *   import { getVoiceFromElevenLabs } from './api/elevenLabsApi';
 *   const audioUrl = await getVoiceFromElevenLabs("Once upon a time...");
 */

// Default voiceId - can be adjusted as needed, see ElevenLabs docs for options.
const DEFAULT_VOICE_ID = "EXAVITQu4vr4xnSDxMaL";

// PUBLIC_INTERFACE
export async function getVoiceFromElevenLabs(text, voiceId = DEFAULT_VOICE_ID) {
  /**
   * Generates audio narration for given text using ElevenLabs API.
   * @param {string} text - The text to narrate.
   * @param {string} [voiceId] - Optional: ElevenLabs voice ID.
   * @returns {Promise<{audioUrl: string} | {error: string}>}
   */
  const apiKey = process.env.REACT_APP_ELEVENLABS_API_KEY;
  if (!apiKey) {
    return { error: "Missing ElevenLabs API key." };
  }
  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });
    if (!response.ok) {
      throw new Error(`ElevenLabs error: ${response.status}`);
    }
    // Returns audio as a blob
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    return { audioUrl };
  } catch (err) {
    return { error: err.message || "ElevenLabs request failed" };
  }
}
