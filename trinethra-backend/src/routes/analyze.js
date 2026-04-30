const express = require('express');
const { buildPrompt } = require('../prompts/analyzeTranscript');
const { callOllama } = require('../services/ollama');
const { safeParseJson } = require('../utils/parseJson');

const router = express.Router();

router.post('/analyze', async (req, res) => {
  const { transcript } = req.body;

  if (!transcript || typeof transcript !== 'string' || transcript.length < 50) {
    return res.status(400).json({ error: "Transcript too short" });
  }

  let prompt = buildPrompt(transcript);
  let rawOutput = '';

  try {
    rawOutput = await callOllama(prompt);
    
    try {
      const parsedData = safeParseJson(rawOutput);
      return res.status(200).json(parsedData);
    } catch (parseError) {
      // Parse failed, retry once with stricter instructions
      prompt += "\n\nCRITICAL: Return ONLY raw JSON. No explanation. No markdown.";
      rawOutput = await callOllama(prompt);
      const parsedData = safeParseJson(rawOutput);
      return res.status(200).json(parsedData);
    }
  } catch (error) {
    return res.status(500).json({
      error: "Analysis failed",
      raw: rawOutput
    });
  }
});

module.exports = router;
