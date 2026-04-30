/**
 * Call the local Ollama API to generate a response.
 * @param {string} prompt The prompt to send to the model.
 * @returns {Promise<string>} The generated response text.
 */
async function callOllama(prompt) {
  const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
  const url = `${ollamaUrl}/api/generate`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt: prompt,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    throw new Error(`Failed to call Ollama API: ${error.message}`);
  }
}

module.exports = {
  callOllama
};
