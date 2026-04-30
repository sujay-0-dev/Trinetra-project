const fs = require('fs');
const path = require('path');

async function testTranscripts() {
  const filePath = path.join(__dirname, 'sample-transcripts.json');
  if (!fs.existsSync(filePath)) {
    console.error('sample-transcripts.json not found!');
    return;
  }

  const rawData = fs.readFileSync(filePath, 'utf-8');
  const transcripts = JSON.parse(rawData);

  for (const item of transcripts) {
    console.log(`\nTesting transcript for: ${item.name}`);
    try {
      const response = await fetch('http://localhost:3001/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: item.transcript })
      });

      if (!response.ok) {
        console.error(`Error HTTP ${response.status}`);
        const errText = await response.text();
        console.error(errText);
        continue;
      }

      const data = await response.json();
      console.log(`Score: ${data.score.value}`);
      console.log(`Label: ${data.score.label}`);
      console.log(`Evidence items: ${data.evidence.length}`);
    } catch (err) {
      console.error(`Error testing ${item.name}:`, err.message);
    }
  }
}

testTranscripts();
