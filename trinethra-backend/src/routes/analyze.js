const express = require('express');
const { buildPrompt } = require('../prompts/analyzeTranscript');
const { callOllama } = require('../services/ollama');
const { safeParseJson } = require('../utils/parseJson');

const router = express.Router();

router.post('/analyze', async (req, res) => {
  const { transcript } = req.body;
  console.log("==================== INCOMING REQUEST ====================");
  console.log(`Received transcript of length: ${transcript ? transcript.length : 0}`);
  if (transcript) {
    console.log("Transcript preview:", transcript.substring(0, 150).replace(/\n/g, ' ') + '...');
  }

  if (!transcript || typeof transcript !== 'string' || transcript.length < 50) {
    console.log("Request rejected: Transcript too short or invalid.");
    return res.status(400).json({ error: "Transcript too short" });
  }

  let prompt = buildPrompt(transcript);
  let rawOutput = '';

  try {
    console.log("Calling Ollama locally...");
    rawOutput = await callOllama(prompt);
    
    try {
      const parsedData = safeParseJson(rawOutput);
      console.log("==================== OUTGOING RESPONSE ====================");
      console.log(JSON.stringify(parsedData, null, 2));
      return res.status(200).json(parsedData);
    } catch (parseError) {
      console.log("Parse failed, retrying with stricter prompt...");
      // Parse failed, retry once with stricter instructions
      prompt += "\n\nCRITICAL: Return ONLY raw JSON. No explanation. No markdown.";
      rawOutput = await callOllama(prompt);
      const parsedData = safeParseJson(rawOutput);
      console.log("==================== OUTGOING RESPONSE (AFTER RETRY) ====================");
      console.log(JSON.stringify(parsedData, null, 2));
      return res.status(200).json(parsedData);
    }
  } catch (error) {
    console.error("Analysis failed:", error);
    return res.status(500).json({
      error: "Analysis failed",
      raw: rawOutput
    });
  }
});

module.exports = router;
