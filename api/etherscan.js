export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { address } = req.query;
  if (!address) return res.status(400).json({ error: 'No address provided' });

  try {
    const url = `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=${process.env.ETHERSCAN_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    console.log('Etherscan raw response:', JSON.stringify(data));

    // Pass raw response back so frontend can handle it
    res.status(200).json(data);
  } catch (err) {
    console.error('Etherscan error:', err.message);
    res.status(500).json({ error: err.message });
  }
}
