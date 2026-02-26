export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { prompt } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY environment variable not set');
    }

 const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.1, maxOutputTokens: 4096 }
      })
    });

    const data = await response.json();

    console.log('Gemini status:', response.status);
    console.log('Gemini response:', JSON.stringify(data).slice(0, 500));

    if (data.error) {
      throw new Error('Gemini error: ' + data.error.message);
    }

    if (!data.candidates || !data.candidates[0]) {
      throw new Error('No candidates: ' + JSON.stringify(data));
    }

    const text = data.candidates[0].content.parts[0].text;
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    res.status(200).json(parsed);

  } catch (err) {
    console.error('API Error:', err.message);
    res.status(500).json({ error: err.message });
  }
}
