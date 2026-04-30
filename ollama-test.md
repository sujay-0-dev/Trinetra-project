# Ollama Setup Verification

Ollama is successfully installed and running on this machine.

## Available Models
- `llama3.2`

## API Endpoint
The Ollama API is available locally at:
`http://localhost:11434/api/generate`

### Example Usage
```bash
curl -X POST http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "Why is the sky blue?",
  "stream": false
}'
```
