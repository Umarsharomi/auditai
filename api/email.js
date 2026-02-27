export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email, audit, shareLink } = req.body;
    if (!email || !audit) throw new Error('Missing email or audit data');

    const scoreColor = audit.score >= 70 ? '#00FF88' : audit.score >= 40 ? '#FFB800' : '#FF4560';
    const findings = audit.findings || [];
    const findingsHtml = findings.length === 0
      ? `<div style="padding:12px 16px;border-left:3px solid #00FF88;background:#0C1419;color:#00FF88;font-size:13px">✓ No vulnerabilities detected</div>`
      : findings.map(f => {
          const color = f.severity === 'CRITICAL' ? '#FF4560' : f.severity === 'HIGH' ? '#FFB800' : f.severity === 'MEDIUM' ? '#00C4FF' : '#4A6070';
          return `<div style="margin-bottom:12px;padding:14px;background:#0C1419;border:1px solid #1A2A35;border-left:3px solid ${color}">
            <div style="display:flex;gap:10px;align-items:center;margin-bottom:8px">
              <span style="font-size:10px;padding:2px 7px;border:1px solid ${color};color:${color};letter-spacing:2px;text-transform:uppercase">${f.severity}</span>
              <strong style="color:#E0EEF5;font-size:13px">${f.title}</strong>
            </div>
            <div style="color:#4A6070;font-size:12px;line-height:1.7;margin-bottom:8px">${f.description}</div>
            <div style="background:#111D24;padding:8px 12px;font-size:11px;color:#00FF88">→ FIX: ${f.recommendation}</div>
          </div>`;
        }).join('');

    const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050A0E;font-family:'Courier New',monospace">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px">
    <!-- Header -->
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:32px;padding-bottom:20px;border-bottom:1px solid #1A2A35">
      <div style="width:32px;height:32px;background:rgba(0,255,136,0.1);border:1px solid rgba(0,255,136,0.3);display:flex;align-items:center;justify-content:center;color:#00FF88;font-size:16px">⬡</div>
      <div style="font-size:20px;font-weight:800;color:#E0EEF5">Audit<span style="color:#00FF88">AI</span></div>
    </div>

    <!-- Score -->
    <div style="background:#0C1419;border:1px solid #1A2A35;padding:24px;margin-bottom:20px;display:flex;align-items:center;gap:20px">
      <div style="width:80px;height:80px;border-radius:50%;border:3px solid ${scoreColor};display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0">
        <div style="font-size:26px;font-weight:800;color:${scoreColor};line-height:1">${audit.score}</div>
        <div style="font-size:9px;color:#4A6070;letter-spacing:2px;text-transform:uppercase">/100</div>
      </div>
      <div>
        <div style="font-size:18px;font-weight:800;color:${scoreColor};margin-bottom:6px">${audit.verdict}</div>
        <div style="font-size:12px;color:#4A6070;line-height:1.8">${audit.summary}</div>
      </div>
    </div>

    <!-- Stats -->
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px;margin-bottom:20px">
      ${[
        {label:'Lines',val:audit.stats?.lines||'—'},
        {label:'Functions',val:audit.stats?.functions||'—'},
        {label:'Checks',val:audit.stats?.checks_performed||'—'},
        {label:'Issues',val:findings.length}
      ].map(s=>`<div style="background:#0C1419;border:1px solid #1A2A35;padding:12px;text-align:center"><div style="font-size:9px;color:#4A6070;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px">${s.label}</div><div style="font-size:18px;font-weight:800;color:#00FF88">${s.val}</div></div>`).join('')}
    </div>

    <!-- Findings -->
    <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#4A6070;margin-bottom:12px">Security Findings</div>
    ${findingsHtml}

    <!-- CTA -->
    <div style="text-align:center;margin-top:32px;padding:24px;background:#0C1419;border:1px solid #00FF88">
      <div style="font-size:16px;font-weight:800;color:#E0EEF5;margin-bottom:8px">View Full Report</div>
      <a href="${shareLink}" style="display:inline-block;padding:11px 24px;background:#00FF88;color:#050A0E;font-weight:700;font-size:13px;text-decoration:none;letter-spacing:1px;text-transform:uppercase">Open in AuditAI →</a>
    </div>

    <!-- Footer -->
    <div style="margin-top:24px;padding-top:20px;border-top:1px solid #1A2A35;text-align:center;font-size:10px;color:#4A6070;letter-spacing:1px">
      AuditAI · Free Smart Contract Security Platform<br>
      <span style="color:#1A2A35">Not a replacement for professional audits</span>
    </div>
  </div>
</body>
</html>`;

    // Send via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'AuditAI <https://auditaii.vercel.app/>',
        to: [email],
        subject: `Your Smart Contract Audit Report — Score: ${audit.score}/100 (${audit.verdict})`,
        html
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message || 'Email send failed');
    res.status(200).json({ success: true });

  } catch (err) {
    console.error('Email error:', err.message);
    res.status(500).json({ error: err.message });
  }
}
