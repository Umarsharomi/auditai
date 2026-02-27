export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { address } = req.query;
  if (!address) return res.status(400).json({ error: 'No address provided' });

  try {
    // ✅ Updated to Etherscan API V2
    const url = `https://api.etherscan.io/v2/api?chainid=1&module=contract&action=getsourcecode&address=${address}&apikey=${process.env.ETHERSCAN_API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();

    console.log('Etherscan V2 response:', JSON.stringify(data).slice(0, 300));
    res.status(200).json(data);

  } catch (err) {
    console.error('Etherscan error:', err.message);
    res.status(500).json({ error: err.message });
  }
}
