/**
 * Builds the prompt to analyze a supervisor feedback transcript.
 * @param {string} transcript The supervisor feedback transcript.
 * @returns {string} The full prompt for the LLM.
 */
function buildPrompt(transcript) {
  return `You are an expert evaluator analyzing supervisor feedback about a Fellow (an early-career professional placed in a manufacturing company).
Analyze the provided transcript and extract the requested information.

You must return ONLY valid raw JSON — no markdown fences, no commentary, no additional text before or after the JSON.

The JSON must exactly match this structure:
{
  "score": {
    "value": <number 1-10>,
    "label": "<string>",
    "band": "<string>",
    "justification": "<string>",
    "confidence": "<high|medium|low>"
  },
  "evidence": [
    {
      "quote": "<string>",
      "signal": "<positive|negative|neutral>",
      "dimension": "<string>",
      "interpretation": "<string>"
    }
  ],
  "kpiMapping": [
    {
      "kpi": "<string>",
      "evidence": "<string>",
      "systemOrPersonal": "<system|personal>"
    }
  ],
  "gaps": [
    {
      "dimension": "<string>",
      "detail": "<string>"
    }
  ],
  "followUpQuestions": [
    {
      "question": "<string>",
      "targetGap": "<string>",
      "lookingFor": "<string>"
    }
  ]
}

Use the following context to guide your analysis:

RUBRIC:
- 1: Not Interested — disengaged, no effort
- 2: Lacks Discipline — works only when told
- 3: Motivated but Directionless — enthusiastic but unfocused
- 4: Careless and Inconsistent — output exists but unreliable
- 5: Consistent Performer — reliable, meets standards, doesn't exceed scope
- 6: Reliable and Productive — high trust, give task and forget
- 7: Problem Identifier — spots problems nobody asked about, expands scope
- 8: Problem Solver — identifies AND builds solutions
- 9: Innovative and Experimental — builds MVPs, tests approaches
- 10: Exceptional Performer — flawless, others learn from their work

CRITICAL SCORING RULES (bias detection):
- Score 6 vs 7 is the most important boundary. 6 = executes tasks others defined. 7 = independently finds problems the supervisor never asked about.
- Helpfulness bias: supervisor saying "she handles all my calls" sounds like an 8 but is actually a 5-6 (task absorption, not systems building)
- Presence bias: "always on the floor" gets rated higher than "builds trackers on laptop" — both can be equally valuable
- Survivability test: if the Fellow left tomorrow, would any system they built keep running without them? If no -> not systems building.
- Halo effect: one impressive story should not inflate the overall score

KPIs to map work to:
Lead Generation, Lead Conversion, Upselling, Cross-selling, NPS, PAT (profit), TAT (turnaround time), Quality

Assessment dimensions to check for gaps:
- execution: does transcript mention getting things done, following up, initiating work?
- systems_building: does transcript mention any tracker, SOP, process, tool that would survive the Fellow leaving?
- kpi_impact: does transcript connect work to measurable business outcomes?
- change_management: does transcript describe how the Fellow gets the floor team to adopt new processes?

TRANSCRIPT TO ANALYZE:
"""
${transcript}
"""`;
}

module.exports = {
  buildPrompt
};
