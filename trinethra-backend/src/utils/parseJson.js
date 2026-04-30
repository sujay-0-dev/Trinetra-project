/**
 * Safely parse JSON text, stripping out markdown code fences if present.
 * @param {string} rawText The raw text string to parse.
 * @returns {object} The parsed JSON object.
 */
function safeParseJson(rawText) {
  if (!rawText) {
    throw new Error('Received empty text to parse.');
  }

  // Strip markdown fences
  let cleanText = rawText.trim();
  
  if (cleanText.startsWith('```json')) {
    cleanText = cleanText.substring(7);
  } else if (cleanText.startsWith('```')) {
    cleanText = cleanText.substring(3);
  }

  if (cleanText.endsWith('```')) {
    cleanText = cleanText.substring(0, cleanText.length - 3);
  }

  cleanText = cleanText.trim();

  try {
    return JSON.parse(cleanText);
  } catch (error) {
    throw new Error(`Failed to parse JSON. Error: ${error.message}\nRaw text was:\n${rawText}`);
  }
}

module.exports = {
  safeParseJson
};
