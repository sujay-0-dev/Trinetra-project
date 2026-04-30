# Trinetra Platform

Trinetra is an AI-powered platform designed to analyze supervisor feedback transcripts and generate structured performance evaluations for Fellows (early-career professionals placed in manufacturing companies).

## Setup Instructions

1. **Install Ollama**
   Install [Ollama](https://ollama.com/) on your local machine.
   Pull the required model:
   ```bash
   ollama run llama3.2
   ```

2. **Start the Backend**
   ```bash
   cd trinethra-backend
   npm install
   npm start
   ```

3. **Start the Frontend**
   ```bash
   cd trinethra-frontend
   npm install
   npm run dev
   ```

4. **Access the App**
   Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite, e.g., `5174`).

## Architecture Overview

The application utilizes a modern, locally-hosted AI stack consisting of a React frontend, a Node.js/Express backend, and Ollama running the LLM locally. The React frontend provides a responsive, user-friendly interface that captures supervisor transcripts and displays structured insights. When a transcript is submitted, the Express backend serves as an orchestration layer, injecting the text into a highly engineered prompt with strict grading rubrics, and making a local HTTP POST request to Ollama. The Ollama service processes the input and returns a structured JSON payload, which the backend safely parses and returns to the React application for visual rendering.

## Which Model and Why?

We selected the **llama3.2 3B** model for this project. Running locally ensures complete data privacy for sensitive feedback. The 3B parameter size is incredibly fast and memory-efficient (comfortably running on 8GB RAM), yet it provides more than enough reasoning capability to accurately perform structured JSON extraction based on our predefined rubric.

## Design Challenges Tackled

- **Structured Output Reliability**: LLMs are notorious for wrapping JSON outputs in markdown fences (e.g., ` ```json `) or adding conversational fluff. We tackled this by enforcing strict prompt rules ("Return ONLY raw JSON"), building a resilient parsing utility (`safeParseJson`) to strip code fences, and implementing an automatic one-time retry with an even stricter prompt if the initial parse fails.
- **Preventing Automation Bias**: To ensure human-in-the-loop accountability, we explicitly designed the UI to prevent users from blindly accepting the AI's conclusions. The score card features a permanent draft warning banner ("This is a draft — review each section before finalizing"), and each parsed evidence item includes an interactive "Flag" toggle, allowing interns to manually mark AI interpretations they disagree with during review.

## Future Improvements

- **Side-by-Side Contextual View**: Currently, the analysis output is read in isolation. A major improvement would be to implement a split-screen UI that displays the raw transcript alongside the analysis. This would allow the intern to easily click an evidence quote and instantly see it highlighted within the original context of the supervisor's full feedback, improving the transparency and verification of the AI's interpretations.
