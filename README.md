# ⬡ AuditAI — Smart Contract Security Platform

> AI-powered smart contract security scanner for Solidity contracts. Free forever.

![Version](https://img.shields.io/badge/version-0.3-00FF88?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-00C4FF?style=flat-square)
![Powered By](https://img.shields.io/badge/powered%20by-Gemini%20AI-A855F7?style=flat-square)

---

## 🚀 What is AuditAI?

AuditAI is a free, AI-powered smart contract security platform that helps developers and token engineers detect vulnerabilities before deployment. Professional smart contract audits cost $5,000–$50,000 — AuditAI makes basic security scanning accessible to everyone.

---

## ✨ Features

### 🔍 Security Audit
- Paste any Solidity contract and get a full security report in seconds
- Security score out of 100
- CRITICAL / HIGH / MEDIUM / LOW severity findings
- Fix recommendation for every issue
- Shareable report link
- Downloadable report

### 🪙 Token Analyzer
- Detect honeypots, rugpulls, and hidden taxes
- Buy/sell tax detection
- Ownership risk analysis
- Blacklist detection
- Visual risk breakdown bars

### ⚖️ Compare Contracts
- Paste two contracts side by side
- Get a winner verdict with scores
- See issues unique to each contract
- See shared vulnerabilities

### 🔧 Fix Suggester
- Auto-generates a fully fixed version of your vulnerable contract
- Lists every change made with explanation
- One-click copy of fixed code

### 🏆 Leaderboard
- Hall of Shame — worst scoring contracts
- Hall of Fame — cleanest contracts
- Submit any audit result with one click

### 🔗 Other
- MetaMask wallet connect
- Audit history saved locally
- Shareable report links via URL

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript |
| AI Engine | Google Gemini 1.5 Flash |
| Backend | Vercel Serverless Functions |
| Hosting | Vercel |
| Wallet | MetaMask (window.ethereum) |
| Storage | localStorage |

---

## 📁 Project Structure

```
auditai/
├── index.html        # Full frontend single-page app
└── api/
    └── audit.js      # Vercel serverless function (Gemini proxy)
```

---

## ⚙️ Setup & Deployment

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/auditai.git
cd auditai
```

### 2. Get a Gemini API key
- Go to [aistudio.google.com](https://aistudio.google.com)
- Click **Get API Key → Create API Key**
- Copy the key

### 3. Deploy to Vercel
- Push the repo to GitHub
- Go to [vercel.com](https://vercel.com) → **Add New Project**
- Import your GitHub repo
- Go to **Settings → Environment Variables**
- Add: `GEMINI_API_KEY` = your key
- Click **Deploy**

### 4. Done!
Your app will be live at `https://your-project.vercel.app`

---

## 🔒 Vulnerabilities Detected

AuditAI checks for 20+ vulnerability types including:

- Reentrancy attacks
- Integer overflow / underflow
- tx.origin authentication bypass
- Missing access control
- Unprotected selfdestruct
- Unchecked return values
- Front-running vulnerabilities
- Timestamp dependence
- Gas limit issues
- Honeypot patterns
- Hidden sell taxes
- Blacklist mechanisms
- Rugpull vectors
- Zero address vulnerabilities
- And more...

---

## ⚠️ Disclaimer

AuditAI is an AI-powered tool and is **not a replacement for a professional smart contract audit**. Always get a professional audit before deploying high-value contracts to mainnet.

---

## 📄 License

MIT — free to use, modify, and distribute.

---

## 🙏 Built by a Token Engineer & FX Trader

> "Smart contract audits shouldn't cost $50,000."

---

*AuditAI — Free Smart Contract Security Platform*
