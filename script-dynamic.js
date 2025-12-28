// ===== Configuration =====
const API_BASE_URL = 'http://localhost:3000';
const USE_DYNAMIC_SEARCH = false; // Set to false to use static database only

// ===== Sample Database for Plagiarism Detection (Fallback) =====
const sampleDatabase = [
    {
        id: 1,
        title: "Climate Change and Global Warming",
        url: "https://example.com/climate-change",
        content: "Climate change refers to long-term shifts in temperatures and weather patterns. These shifts may be natural, but since the 1800s, human activities have been the main driver of climate change, primarily due to the burning of fossil fuels like coal, oil, and gas. The evidence for rapid climate change is compelling. Global temperature is rising, ocean warming is occurring, ice sheets are shrinking, glaciers are retreating, snow cover is decreasing, sea level is rising, Arctic sea ice is declining, and extreme weather events are increasing in frequency. Scientists have high confidence that global temperatures will continue to rise for decades to come, largely due to greenhouse gases produced by human activities."
    },
    {
        id: 2,
        title: "Artificial Intelligence Overview",
        url: "https://example.com/ai-overview",
        content: "Artificial intelligence is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning, reasoning, and self-correction. AI applications include expert systems, natural language processing, speech recognition and machine vision. Machine learning is a subset of artificial intelligence that provides systems the ability to automatically learn and improve from experience without being explicitly programmed."
    },
    {
        id: 3,
        title: "Web Development Basics",
        url: "https://example.com/web-dev",
        content: "Web development is the work involved in developing a website for the Internet or an intranet. Web development can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services. HTML, CSS, and JavaScript are the fundamental technologies for building web pages and web applications."
    }
];

// ===== DOM Elements =====
const textInput = document.getElementById('textInput');
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const checkBtn = document.getElementById('checkBtn');
const clearBtn = document.getElementById('clearBtn');
const charCount = document.getElementById('charCount');
const fileName = document.getElementById('fileName');
const resultsSection = document.getElementById('resultsSection');
const resultsContent = document.getElementById('resultsContent');
const analysisSection = document.getElementById('analysisSection');

// ===== Event Listeners =====
textInput.addEventListener('input', updateCharCount);
uploadBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileUpload);
checkBtn.addEventListener('click', checkPlagiarism);
clearBtn.addEventListener('click', clearResults);

// ===== Character Counter =====
function updateCharCount() {
    const count = textInput.value.length;
    charCount.textContent = count.toLocaleString();

    // Add color based on length
    if (count > 5000) {
        charCount.style.color = '#43e97b';
    } else if (count > 1000) {
        charCount.style.color = '#fbbf24';
    } else {
        charCount.style.color = '#718096';
    }
}

// ===== File Upload Handler =====
async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const supportedFormats = ['.txt', '.pdf', '.doc', '.docx', '.rtf', '.odt'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();

    if (!supportedFormats.includes(fileExtension)) {
        showNotification('Unsupported file format. Please upload: PDF, DOCX, DOC, TXT, RTF, or ODT', 'error');
        return;
    }

    // Show loading notification
    showNotification('Processing file...', 'info');

    try {
        let extractedText = '';

        switch (fileExtension) {
            case '.txt':
            case '.rtf':
                extractedText = await readTextFile(file);
                break;
            case '.pdf':
                extractedText = await readPDFFile(file);
                break;
            case '.docx':
            case '.doc':
            case '.odt':
                extractedText = await readDocxFile(file);
                break;
            default:
                throw new Error('Unsupported file format');
        }

        if (!extractedText || extractedText.trim().length === 0) {
            showNotification('No text found in the file', 'error');
            return;
        }

        textInput.value = extractedText;
        fileName.textContent = file.name;
        updateCharCount();
        showNotification(`File uploaded successfully! (${fileExtension.toUpperCase()})`, 'success');

    } catch (error) {
        console.error('File processing error:', error);
        showNotification('Error processing file: ' + error.message, 'error');
    }
}

// ===== Read Text File =====
function readTextFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Failed to read text file'));
        reader.readAsText(file);
    });
}

// ===== Read PDF File =====
async function readPDFFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async (e) => {
            try {
                const typedArray = new Uint8Array(e.target.result);

                // Set PDF.js worker
                pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

                const pdf = await pdfjsLib.getDocument(typedArray).promise;
                let fullText = '';

                // Extract text from each page
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map(item => item.str).join(' ');
                    fullText += pageText + '\n\n';
                }

                resolve(fullText.trim());
            } catch (error) {
                reject(new Error('Failed to parse PDF: ' + error.message));
            }
        };

        reader.onerror = () => reject(new Error('Failed to read PDF file'));
        reader.readAsArrayBuffer(file);
    });
}

// ===== Read DOCX/DOC/ODT File =====
async function readDocxFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async (e) => {
            try {
                const arrayBuffer = e.target.result;
                const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });

                if (result.value) {
                    resolve(result.value);
                } else {
                    reject(new Error('No text extracted from document'));
                }

                // Log any warnings
                if (result.messages && result.messages.length > 0) {
                    console.warn('Document conversion warnings:', result.messages);
                }
            } catch (error) {
                reject(new Error('Failed to parse document: ' + error.message));
            }
        };

        reader.onerror = () => reject(new Error('Failed to read document file'));
        reader.readAsArrayBuffer(file);
    });
}

// ===== Plagiarism Detection Algorithm =====
async function checkPlagiarism() {
    const text = textInput.value.trim();

    if (!text) {
        showNotification('Please enter some text to check', 'error');
        return;
    }

    if (text.split(/\s+/).length < 10) {
        showNotification('Please enter at least 10 words', 'error');
        return;
    }

    // Show loading state
    showLoading();

    try {
        let results;

        if (USE_DYNAMIC_SEARCH) {
            // Use dynamic Google Search API
            results = await analyzePlagiarismDynamic(text);
        } else {
            // Use static database
            results = analyzePlagiarismStatic(text);
        }

        displayResults(results);
    } catch (error) {
        console.error('Plagiarism check error:', error);
        showNotification('Error checking plagiarism: ' + error.message, 'error');

        // Fallback to static database if API fails
        if (USE_DYNAMIC_SEARCH) {
            showNotification('Falling back to offline mode...', 'info');
            setTimeout(() => {
                const results = analyzePlagiarismStatic(text);
                displayResults(results);
            }, 1000);
        }
    }
}

// ===== Dynamic Plagiarism Analysis (Google API) =====
async function analyzePlagiarismDynamic(text) {
    // Extract key phrases
    const phrases = extractKeyPhrases(text, 6); // 6-word phrases

    // Limit to 10 searches to stay within free tier
    const searchPhrases = phrases.slice(0, 10);

    showNotification(`Searching web for ${searchPhrases.length} phrases...`, 'info');

    // Search Google for each phrase
    const searchResults = [];
    for (let i = 0; i < searchPhrases.length; i++) {
        const phrase = searchPhrases[i];
        try {
            const results = await searchGoogle(phrase);
            searchResults.push(...results);

            // Update progress
            updateLoadingProgress(((i + 1) / searchPhrases.length) * 100);
        } catch (error) {
            console.error(`Search error for phrase "${phrase}":`, error);
        }
    }

    // Analyze search results
    return analyzeSearchResults(text, searchResults);
}

// ===== Extract Key Phrases =====
function extractKeyPhrases(text, ngramSize = 6) {
    const words = text.toLowerCase()
        .split(/\s+/)
        .filter(w => w.length > 2 && !/^\d+$/.test(w)); // Filter out short words and numbers

    const phrases = [];

    for (let i = 0; i <= words.length - ngramSize; i++) {
        const phrase = words.slice(i, i + ngramSize).join(' ');
        phrases.push(phrase);
    }

    // Remove duplicates and return unique phrases
    return [...new Set(phrases)];
}

// ===== Search Google via Backend API =====
async function searchGoogle(query) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Search failed');
        }

        const data = await response.json();

        if (data.items) {
            return data.items.map(item => ({
                title: item.title,
                url: item.link,
                snippet: item.snippet || ''
            }));
        }

        return [];
    } catch (error) {
        console.error('Search error:', error);
        throw error;
    }
}

// ===== Analyze Search Results =====
function analyzeSearchResults(originalText, searchResults) {
    const words = originalText.toLowerCase().split(/\s+/).filter(w => w.length > 0);
    const uniqueUrls = [...new Set(searchResults.map(r => r.url))];

    const sources = [];
    let totalMatchedWords = new Set();
    let totalSimilarity = 0;

    uniqueUrls.forEach(url => {
        const urlResults = searchResults.filter(r => r.url === url);
        const snippets = urlResults.map(r => r.snippet).join(' ');
        const title = urlResults[0].title;

        // Calculate match percentage using improved algorithm
        const matchPercentage = calculateTextSimilarity(originalText, snippets);

        if (matchPercentage > 5) { // Lower threshold for web results
            sources.push({
                title: title,
                url: url,
                matchPercentage: Math.max(0, Math.min(100, Math.round(matchPercentage))),
                snippet: snippets.substring(0, 200) + '...',
                matchedPhrases: extractMatchedPhrases(originalText, snippets)
            });

            // Track matched words
            const matched = extractMatchedWords(originalText, snippets);
            matched.forEach(word => totalMatchedWords.add(word));

            // Accumulate similarity scores
            totalSimilarity += matchPercentage;
        }
    });

    // Sort by match percentage
    sources.sort((a, b) => b.matchPercentage - a.matchPercentage);

    // Calculate overall similarity score using weighted average
    let similarityScore = 0;

    if (sources.length > 0) {
        // Use the highest match as base (primary source)
        const maxMatch = sources[0].matchPercentage;

        // Add small weighted contribution from other sources
        const secondaryMatches = sources.slice(1, 3).reduce((sum, s) => sum + s.matchPercentage, 0);
        const secondaryWeight = Math.min(secondaryMatches * 0.05, 10); // Max 10% from secondary sources

        // Calculate final score
        similarityScore = Math.min(maxMatch + secondaryWeight, 100);
    }

    // Ensure score is within valid range
    similarityScore = Math.max(0, Math.min(100, Math.round(similarityScore)));

    // Calculate unique content percentage
    const uniqueContent = Math.max(0, Math.min(100, 100 - similarityScore));

    return {
        similarityScore: similarityScore,
        totalWords: words.length,
        matchedWords: totalMatchedWords.size,
        uniqueContent: uniqueContent,
        sources: sources.slice(0, 5), // Top 5 sources
        originalText: originalText
    };
}

// ===== Calculate Text Similarity =====
function calculateTextSimilarity(text1, text2) {
    // Filter words (remove very short words and numbers)
    const words1 = text1.toLowerCase().split(/\s+/).filter(w => w.length > 2 && !/^\d+$/.test(w));
    const words2 = text2.toLowerCase().split(/\s+/).filter(w => w.length > 2 && !/^\d+$/.test(w));

    if (words1.length === 0 || words2.length === 0) return 0;

    // Word-level similarity (what percentage of text1's unique words appear in text2)
    const set1 = new Set(words1);
    const set2 = new Set(words2);
    const intersection = new Set([...set1].filter(x => set2.has(x)));

    // Use text1's unique words as the base (what we're checking for plagiarism)
    const wordSimilarity = (intersection.size / set1.size) * 100;

    // Phrase-level similarity (5-word phrases for more precise matching)
    const phrases1 = [];
    const phrases2 = [];

    const phraseLength = 5;

    for (let i = 0; i <= words1.length - phraseLength; i++) {
        phrases1.push(words1.slice(i, i + phraseLength).join(' '));
    }

    for (let i = 0; i <= words2.length - phraseLength; i++) {
        phrases2.push(words2.slice(i, i + phraseLength).join(' '));
    }

    let phraseSimilarity = 0;
    if (phrases1.length > 0 && phrases2.length > 0) {
        const phraseSet2 = new Set(phrases2);
        const matchedPhrases = phrases1.filter(p => phraseSet2.has(p)).length;
        phraseSimilarity = (matchedPhrases / phrases1.length) * 100;
    }

    // Combined similarity (weighted: 70% word, 30% phrase)
    // Phrase matching is stricter, so we give it less weight
    const combinedSimilarity = (wordSimilarity * 0.7) + (phraseSimilarity * 0.3);

    // Ensure result is within valid range
    return Math.max(0, Math.min(100, combinedSimilarity));
}

// ===== Extract Matched Phrases =====
function extractMatchedPhrases(text1, text2) {
    const phrases1 = extractKeyPhrases(text1, 4);
    const phrases2 = extractKeyPhrases(text2, 4);

    const matched = phrases1.filter(p => phrases2.includes(p));
    return matched.slice(0, 5); // Return top 5 matched phrases
}

// ===== Extract Matched Words =====
function extractMatchedWords(text1, text2) {
    const words1 = new Set(text1.toLowerCase().split(/\s+/).filter(w => w.length > 2));
    const words2 = new Set(text2.toLowerCase().split(/\s+/).filter(w => w.length > 2));

    return [...words1].filter(w => words2.has(w));
}

// ===== Static Plagiarism Analysis (Fallback) =====
function analyzePlagiarismStatic(text) {
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

    let maxMatchPercentage = 0;
    let matchedWords = new Set();
    const sources = [];

    // Check against each source in database
    sampleDatabase.forEach(source => {
        const sourceText = source.content.toLowerCase();
        const sourceWords = sourceText.split(/\s+/).filter(w => w.length > 0);
        const sourceSentences = source.content.split(/[.!?]+/).filter(s => s.trim().length > 0);

        // N-gram matching (3-5 word sequences)
        const ngramMatches = findNgramMatches(words, sourceWords, 3);

        // Sentence similarity
        const sentenceMatches = findSentenceSimilarity(sentences, sourceSentences);

        // Calculate match percentage for this source
        const matchPercentage = Math.max(ngramMatches.percentage, sentenceMatches.percentage);

        // Lower threshold to detect more matches
        if (matchPercentage > 5) {
            sources.push({
                ...source,
                matchPercentage: Math.max(0, Math.min(100, Math.round(matchPercentage))),
                matchedPhrases: [...ngramMatches.phrases, ...sentenceMatches.phrases]
            });

            // Track the highest match percentage
            maxMatchPercentage = Math.max(maxMatchPercentage, matchPercentage);
            ngramMatches.words.forEach(word => matchedWords.add(word));
        }
    });

    // Sort sources by match percentage
    sources.sort((a, b) => b.matchPercentage - a.matchPercentage);

    // Calculate overall similarity score
    let similarityScore = 0;

    if (sources.length > 0) {
        // Use the highest match as base (primary source)
        const maxMatch = sources[0].matchPercentage;

        // Add small weighted contribution from other sources
        const secondaryMatches = sources.slice(1, 3).reduce((sum, s) => sum + s.matchPercentage, 0);
        const secondaryWeight = Math.min(secondaryMatches * 0.05, 10); // Max 10% from secondary sources

        // Calculate final score
        similarityScore = Math.min(maxMatch + secondaryWeight, 100);
    }

    // Ensure score is within valid range
    similarityScore = Math.max(0, Math.min(100, Math.round(similarityScore)));

    // Calculate unique content percentage
    const uniqueContent = Math.max(0, Math.min(100, 100 - similarityScore));

    return {
        similarityScore: similarityScore,
        totalWords: words.length,
        matchedWords: matchedWords.size,
        uniqueContent: uniqueContent,
        sources,
        originalText: text
    };
}

// ===== N-gram Matching =====
function findNgramMatches(words, sourceWords, n = 3) {
    const matches = new Set();
    const phrases = [];
    const matchedWords = new Set();

    for (let i = 0; i <= words.length - n; i++) {
        const ngram = words.slice(i, i + n).join(' ');

        for (let j = 0; j <= sourceWords.length - n; j++) {
            const sourceNgram = sourceWords.slice(j, j + n).join(' ');

            if (ngram === sourceNgram) {
                matches.add(ngram);
                phrases.push(ngram);
                words.slice(i, i + n).forEach(word => matchedWords.add(word));
            }
        }
    }

    const percentage = (matches.size / Math.max(words.length - n + 1, 1)) * 100;

    return {
        percentage,
        phrases: Array.from(matches),
        words: matchedWords
    };
}

// ===== Sentence Similarity =====
function findSentenceSimilarity(sentences, sourceSentences) {
    const matches = [];
    const phrases = [];
    let totalSimilarity = 0;

    sentences.forEach(sentence => {
        const sentenceWords = sentence.toLowerCase().trim().split(/\s+/);

        sourceSentences.forEach(sourceSentence => {
            const sourceWords = sourceSentence.toLowerCase().trim().split(/\s+/);
            const similarity = calculateCosineSimilarity(sentenceWords, sourceWords);

            if (similarity > 0.6) {
                matches.push({ sentence, similarity });
                phrases.push(sentence.trim());
                totalSimilarity += similarity;
            }
        });
    });

    const percentage = (totalSimilarity / Math.max(sentences.length, 1)) * 100;

    return {
        percentage,
        phrases,
        matches
    };
}

// ===== Cosine Similarity =====
function calculateCosineSimilarity(words1, words2) {
    const set1 = new Set(words1);
    const set2 = new Set(words2);
    const intersection = new Set([...set1].filter(x => set2.has(x)));

    if (set1.size === 0 || set2.size === 0) return 0;

    return intersection.size / Math.sqrt(set1.size * set2.size);
}


// ===== Display Results =====
function displayResults(results) {
    // Show analysis section
    analysisSection.style.display = 'block';

    // Update similarity score
    updateCircularProgress(results.similarityScore);

    // Update statistics
    document.getElementById('totalWords').textContent = results.totalWords.toLocaleString();
    document.getElementById('matchedWords').textContent = results.matchedWords.toLocaleString();
    document.getElementById('uniqueContent').textContent = results.uniqueContent + '%';
    document.getElementById('sourcesCount').textContent = results.sources.length;

    // Update highlighted text
    displayHighlightedText(results);

    // Update sources list
    displaySources(results.sources);

    // Update results content
    resultsContent.innerHTML = `
        <div class="result-summary">
            <div class="result-icon ${getSeverityClass(results.similarityScore)}">
                <span class="material-symbols-rounded">${getSeverityIcon(results.similarityScore)}</span>
            </div>
            <h3>${getSeverityTitle(results.similarityScore)}</h3>
            <p>${getSeverityMessage(results.similarityScore)}</p>
        </div>
    `;

    // Scroll to results
    analysisSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== Update Circular Progress =====
function updateCircularProgress(score) {
    const circle = document.getElementById('progressCircle');
    const scoreValue = document.getElementById('scoreValue');
    const scoreLabel = document.getElementById('scoreLabel');

    const circumference = 2 * Math.PI * 70;
    const offset = circumference - (score / 100) * circumference;

    // Animate the circle
    circle.style.strokeDashoffset = offset;

    // Update color based on score
    if (score <= 25) {
        circle.style.stroke = '#43e97b';
        scoreLabel.className = 'score-label excellent';
        scoreLabel.textContent = 'Excellent - Original Content';
    } else if (score <= 50) {
        circle.style.stroke = '#fbbf24';
        scoreLabel.className = 'score-label good';
        scoreLabel.textContent = 'Good - Low Similarity';
    } else if (score <= 75) {
        circle.style.stroke = '#fb923c';
        scoreLabel.className = 'score-label moderate';
        scoreLabel.textContent = 'Moderate Similarity';
    } else {
        circle.style.stroke = '#ff6b6b';
        scoreLabel.className = 'score-label high';
        scoreLabel.textContent = 'High Similarity Detected';
    }

    // Animate the number
    animateNumber(scoreValue, 0, score, 1000);
}

// ===== Animate Number =====
function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 16);
}

// ===== Update Loading Progress =====
function updateLoadingProgress(percentage) {
    // Optional: Update loading indicator with progress
    console.log(`Search progress: ${Math.round(percentage)}%`);
}

// ===== Display Highlighted Text =====
function displayHighlightedText(results) {
    const highlightedText = document.getElementById('highlightedText');

    if (results.sources.length === 0) {
        highlightedText.innerHTML = '<p class="text-muted">No matches found - Your content appears to be original!</p>';
        return;
    }

    let text = results.originalText;
    const allPhrases = [];

    // Collect all matched phrases with their sources
    results.sources.forEach(source => {
        if (source.matchedPhrases && source.matchedPhrases.length > 0) {
            source.matchedPhrases.forEach(phrase => {
                allPhrases.push({ phrase, source: source.title });
            });
        }
    });

    // Sort by length (longest first) to avoid partial replacements
    allPhrases.sort((a, b) => b.phrase.length - a.phrase.length);

    // Highlight matched phrases
    allPhrases.forEach(({ phrase, source }) => {
        const regex = new RegExp(`(${escapeRegex(phrase)})`, 'gi');
        text = text.replace(regex, `<span class="highlight" data-source="Source: ${source}">$1</span>`);
    });

    highlightedText.innerHTML = text || '<p class="text-muted">No matches found</p>';
}

// ===== Display Sources =====
function displaySources(sources) {
    const sourcesList = document.getElementById('sourcesList');

    if (sources.length === 0) {
        sourcesList.innerHTML = '<p class="text-muted">No sources detected - Content appears original!</p>';
        return;
    }

    sourcesList.innerHTML = sources.map(source => {
        const matchClass = source.matchPercentage > 60 ? 'high-match' :
            source.matchPercentage > 30 ? 'medium-match' : 'low-match';

        return `
            <div class="source-item ${matchClass}">
                <div class="source-info">
                    <div class="source-title">${source.title}</div>
                    <a href="${source.url}" class="source-url" target="_blank">${source.url}</a>
                </div>
                <div class="source-match">${source.matchPercentage}%</div>
            </div>
        `;
    }).join('');
}

// ===== Helper Functions =====
function getSeverityClass(score) {
    if (score <= 25) return 'excellent';
    if (score <= 50) return 'good';
    if (score <= 75) return 'moderate';
    return 'high';
}

function getSeverityIcon(score) {
    if (score <= 25) return 'check_circle';
    if (score <= 50) return 'info';
    if (score <= 75) return 'warning';
    return 'error';
}

function getSeverityTitle(score) {
    if (score <= 25) return 'Excellent! Original Content';
    if (score <= 50) return 'Good - Minor Similarities';
    if (score <= 75) return 'Moderate Similarity Detected';
    return 'High Plagiarism Risk';
}

function getSeverityMessage(score) {
    if (score <= 25) return 'Your content appears to be highly original with minimal similarity to known sources.';
    if (score <= 50) return 'Some similarities detected, but overall content is mostly original.';
    if (score <= 75) return 'Significant similarities found. Consider reviewing and citing sources.';
    return 'High similarity detected. Please review your content and ensure proper citations.';
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function showLoading() {
    resultsContent.innerHTML = `
        <div class="empty-state">
            <span class="material-symbols-rounded" style="animation: spin 1s linear infinite;">sync</span>
            <p>Analyzing your text for plagiarism...</p>
        </div>
    `;

    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    if (!document.getElementById('spin-animation-style')) {
        style.id = 'spin-animation-style';
        document.head.appendChild(style);
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    // Determine icon and colors based on type
    let icon, bgColor, textColor, borderColor;

    switch (type) {
        case 'success':
            icon = 'check_circle';
            bgColor = 'rgba(67, 233, 123, 0.1)';
            textColor = '#43e97b';
            borderColor = 'rgba(67, 233, 123, 0.3)';
            break;
        case 'error':
            icon = 'error';
            bgColor = 'rgba(255, 107, 107, 0.1)';
            textColor = '#ff6b6b';
            borderColor = 'rgba(255, 107, 107, 0.3)';
            break;
        case 'info':
            icon = 'info';
            bgColor = 'rgba(79, 172, 254, 0.1)';
            textColor = '#4facfe';
            borderColor = 'rgba(79, 172, 254, 0.3)';
            break;
        default:
            icon = 'info';
            bgColor = 'rgba(79, 172, 254, 0.1)';
            textColor = '#4facfe';
            borderColor = 'rgba(79, 172, 254, 0.3)';
    }

    notification.innerHTML = `
        <span class="material-symbols-rounded">${icon}</span>
        <span>${message}</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: ${textColor};
        padding: 1rem 1.5rem;
        border-radius: 12px;
        border: 1px solid ${borderColor};
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);

    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    if (!document.getElementById('notification-animation-style')) {
        style.id = 'notification-animation-style';
        document.head.appendChild(style);
    }
}

function clearResults() {
    textInput.value = '';
    fileName.textContent = '';
    updateCharCount();

    resultsContent.innerHTML = `
        <div class="empty-state">
            <span class="material-symbols-rounded">pending_actions</span>
            <p>Enter text and click "Check Plagiarism" to see results</p>
        </div>
    `;

    analysisSection.style.display = 'none';

    showNotification('Results cleared', 'success');
}

// ===== Initialize =====
updateCharCount();
