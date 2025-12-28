# 🛡️ Flogarisum - Advanced Plagiarism Detection System

> **A powerful, AI-driven plagiarism checker with real-time web search capabilities and advanced similarity analysis algorithms.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://www.ecma-international.org/ecma-262/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Algorithm Details](#algorithm-details)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Flogarisum** is a state-of-the-art plagiarism detection system that combines advanced natural language processing algorithms with real-time web search capabilities. It provides accurate similarity analysis for academic papers, articles, blog posts, and any text content.

### Why Flogarisum?

- ✅ **Accurate Detection**: Uses hybrid word-level and phrase-level similarity analysis
- ✅ **Multi-Format Support**: Handles PDF, DOCX, DOC, TXT, RTF, and ODT files
- ✅ **Real-Time Web Search**: Integrates with Google Custom Search API for live plagiarism detection
- ✅ **Offline Mode**: Built-in static database for testing without API configuration
- ✅ **Beautiful UI**: Modern, responsive interface with glassmorphism design
- ✅ **Detailed Reports**: Highlights matched phrases and shows source attribution

---

## ✨ Features

### 🔍 Core Features

- **Advanced Similarity Algorithm**
  - 70% word-level similarity (Jaccard-based)
  - 30% phrase-level similarity (5-word n-gram matching)
  - Guaranteed 0-100% accuracy range
  - No false negatives or inflated scores

- **Multi-Format Document Support**
  - 📄 PDF files (via PDF.js)
  - 📝 Microsoft Word (DOCX, DOC)
  - 📋 Plain text (TXT)
  - 📑 Rich Text Format (RTF)
  - 📰 OpenDocument Text (ODT)

- **Dual Detection Modes**
  - **Dynamic Mode**: Real-time Google web search
  - **Static Mode**: Offline database for testing
  - Automatic fallback on API failure

### 📊 Analysis Features

- **Comprehensive Metrics**
  - Overall similarity percentage
  - Total word count
  - Matched word count
  - Unique content percentage
  - Number of sources detected

- **Visual Feedback**
  - Circular progress indicator
  - Color-coded severity levels
  - Highlighted matched phrases
  - Source links with match percentages

### 🎨 User Interface

- Modern glassmorphism design
- Responsive layout (mobile-friendly)
- Dark theme with gradient backgrounds
- Real-time character counter
- Drag-and-drop file upload
- Smooth animations and transitions

---

## 🎬 Demo

### Screenshots

**Main Interface**
```
┌─────────────────────────────────────────┐
│  🛡️ Plagiarism Checker                 │
│  ─────────────────────────────────────  │
│  📝 Enter Your Text                     │
│  ┌───────────────────────────────────┐  │
│  │ Paste or type your text here...  │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│  📤 Upload File  |  🔍 Check Plagiarism │
└─────────────────────────────────────────┘
```

**Results Display**
```
┌─────────────────────────────────────────┐
│  📊 Similarity Score: 75%               │
│  ⚠️  High Similarity Detected           │
│  ─────────────────────────────────────  │
│  Total Words: 150                       │
│  Matched Words: 112                     │
│  Unique Content: 25%                    │
│  Sources Found: 2                       │
└─────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with glassmorphism
- **JavaScript (ES6+)** - Core logic and algorithms
- **PDF.js** - PDF text extraction
- **Mammoth.js** - DOCX/DOC parsing

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Axios** - HTTP client for API calls
- **CORS** - Cross-origin resource sharing

### APIs
- **Google Custom Search API** - Real-time web search
- **Custom Similarity Algorithm** - Proprietary plagiarism detection

---

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Google Cloud account (for API access)
- Modern web browser

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/flogarisum.git
cd flogarisum
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Google Custom Search API Configuration
GOOGLE_API_KEY=your_google_api_key_here
SEARCH_ENGINE_ID=your_search_engine_id_here

# Server Configuration
PORT=3000
```

### Step 4: Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

### Step 5: Open in Browser

Navigate to `http://localhost:3000` or open `index.html` directly.

---

## 🚀 Usage

### Basic Usage

1. **Enter Text**
   - Type or paste text directly into the text area
   - Or upload a supported document file

2. **Check Plagiarism**
   - Click the "Check Plagiarism" button
   - Wait for analysis to complete (5-10 seconds)

3. **Review Results**
   - View similarity percentage
   - Check highlighted matched phrases
   - Review detected sources
   - See detailed statistics

### File Upload

```javascript
// Supported formats
const supportedFormats = [
  '.txt',   // Plain text
  '.pdf',   // PDF documents
  '.doc',   // Microsoft Word (legacy)
  '.docx',  // Microsoft Word
  '.rtf',   // Rich Text Format
  '.odt'    // OpenDocument Text
];
```

### API Integration

```javascript
// Example: Check text for plagiarism
const response = await fetch('http://localhost:3000/api/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'your text here' })
});

const results = await response.json();
```

---

## ⚙️ Configuration

### Dynamic vs Static Mode

**Dynamic Mode** (Real-time web search):
```javascript
// In script-dynamic.js
const USE_DYNAMIC_SEARCH = true;
```

**Static Mode** (Offline database):
```javascript
// In script-dynamic.js
const USE_DYNAMIC_SEARCH = false;
```

### Detection Threshold

Adjust sensitivity by changing the threshold:

```javascript
// Minimum similarity to consider a match
if (matchPercentage > 5) {  // 5% threshold
  // Add to sources
}
```

### Algorithm Weights

Customize the similarity calculation:

```javascript
// Word vs Phrase weighting
const combinedSimilarity = 
  (wordSimilarity * 0.7) +    // 70% word matching
  (phraseSimilarity * 0.3);   // 30% phrase matching
```

---

## 🧮 Algorithm Details

### Similarity Calculation

Our proprietary algorithm uses a hybrid approach:

#### 1. Word-Level Similarity (70% weight)

```javascript
// Jaccard-based similarity
wordSimilarity = (intersection.size / set1.size) × 100
```

- Measures what percentage of the original text's unique words appear in sources
- Filters out short words (< 3 characters) and numbers
- Case-insensitive comparison

#### 2. Phrase-Level Similarity (30% weight)

```javascript
// 5-word n-gram matching
phraseSimilarity = (matchedPhrases / totalPhrases) × 100
```

- Extracts 5-word sequences from both texts
- Detects exact phrase matches
- More precise than word-only matching

#### 3. Multi-Source Scoring

```javascript
// Primary source + weighted secondary sources
finalScore = primaryMatch + min(secondaryBonus, 10%)
```

- Uses highest matching source as base
- Adds small contribution from secondary sources (max 10%)
- Prevents score inflation

### Accuracy Guarantees

✅ **No negative percentages** - All values clamped to 0-100%  
✅ **No false 100% matches** - Balanced algorithm prevents inflation  
✅ **Consistent results** - Same input always produces same output  
✅ **Valid unique content** - Always equals 100 - similarity  

---

## 📚 API Documentation

### Endpoints

#### `POST /api/search`

Search for a single query.

**Request:**
```json
{
  "query": "text to search for"
}
```

**Response:**
```json
{
  "items": [
    {
      "title": "Source Title",
      "link": "https://example.com",
      "snippet": "Matched text snippet..."
    }
  ]
}
```

#### `POST /api/batch-search`

Search for multiple queries in batch.

**Request:**
```json
{
  "queries": [
    "first query",
    "second query"
  ]
}
```

**Response:**
```json
{
  "results": [
    {
      "query": "first query",
      "items": [...]
    }
  ]
}
```

#### `GET /health`

Check API health status.

**Response:**
```json
{
  "status": "OK",
  "message": "Plagiarism Checker API is running",
  "apiConfigured": true
}
```

---

## 🧪 Testing

### Automated Tests

Run the similarity algorithm tests:

```bash
node test-similarity.js
```

### Manual Testing

Use the provided test paragraphs in `TEST_PARAGRAPHS.txt`:

1. **High Plagiarism** (75-90% expected)
2. **Moderate Plagiarism** (50-70% expected)
3. **Low/No Plagiarism** (0-15% expected)
4. **Exact Match** (70-85% expected)
5. **Partial Overlap** (30-50% expected)

---

## 📁 Project Structure

```
flogarisum/
├── index.html                          # Main application page
├── style.css                           # Styling and animations
├── script-dynamic.js                   # Core plagiarism detection logic
├── server.js                           # Express backend server
├── package.json                        # Dependencies and scripts
├── .env.example                        # Environment variables template
├── README.md                           # This file
├── FINAL_ACCURACY_CALIBRATION.md      # Algorithm documentation
├── TEST_PARAGRAPHS.txt                # Test cases
├── test-similarity.js                 # Automated tests
└── node_modules/                      # Dependencies (git-ignored)
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Coding Standards

- Use ES6+ JavaScript features
- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 🐛 Known Issues & Limitations

- **Google API Quota**: Free tier limited to 100 searches/day
- **File Size**: Large PDFs (>10MB) may take longer to process
- **Language**: Currently optimized for English text
- **Browser Compatibility**: Requires modern browser with ES6 support

---

## 🔮 Future Enhancements

- [ ] Multi-language support
- [ ] AI-powered paraphrase detection
- [ ] Citation generator
- [ ] Batch file processing
- [ ] Export reports as PDF
- [ ] User authentication and history
- [ ] Custom source database
- [ ] Browser extension

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Flogarisum

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- **PDF.js** - Mozilla's PDF rendering library
- **Mammoth.js** - Document conversion library
- **Google Custom Search API** - Web search functionality
- **Material Symbols** - Icon library
- **Inter Font** - Typography

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [documentation](#api-documentation)
2. Review [known issues](#known-issues--limitations)
3. Open an [issue](https://github.com/yourusername/flogarisum/issues)
4. Contact via [email](mailto:your.email@example.com)

---

## ⭐ Star History

If you find this project useful, please consider giving it a star! ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/flogarisum&type=Date)](https://star-history.com/#yourusername/flogarisum&Date)

---

<div align="center">

**Made with ❤️ by the Flogarisum Team**

[Website](https://yourwebsite.com) • [Documentation](https://docs.yourwebsite.com) • [Report Bug](https://github.com/yourusername/flogarisum/issues) • [Request Feature](https://github.com/yourusername/flogarisum/issues)

</div>
