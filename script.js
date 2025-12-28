// ===== Sample Database for Plagiarism Detection =====
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
    },
    {
        id: 4,
        title: "Data Science Fundamentals",
        url: "https://example.com/data-science",
        content: "Data science is an interdisciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from structured and unstructured data. Data science is related to data mining, machine learning and big data. Data scientists use various techniques including statistical analysis, machine learning algorithms, and data visualization to analyze and interpret complex data."
    },
    {
        id: 5,
        title: "Renewable Energy Sources",
        url: "https://example.com/renewable-energy",
        content: "Renewable energy is energy that is collected from renewable resources that are naturally replenished on a human timescale. It includes sources such as sunlight, wind, rain, tides, waves, and geothermal heat. Renewable energy stands in contrast to fossil fuels. Solar power, wind energy, and hydroelectric power are among the most common forms of renewable energy used today."
    },
    {
        id: 6,
        title: "Machine Learning Basics",
        url: "https://example.com/machine-learning",
        content: "Machine learning is a method of data analysis that automates analytical model building. It is a branch of artificial intelligence based on the idea that systems can learn from data, identify patterns and make decisions with minimal human intervention. Supervised learning, unsupervised learning, and reinforcement learning are the three main types of machine learning."
    },
    {
        id: 7,
        title: "Cybersecurity Fundamentals",
        url: "https://example.com/cybersecurity",
        content: "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information, extorting money from users, or interrupting normal business processes. Implementing effective cybersecurity measures is particularly challenging today because there are more devices than people, and attackers are becoming more innovative."
    },
    {
        id: 8,
        title: "Cloud Computing Introduction",
        url: "https://example.com/cloud-computing",
        content: "Cloud computing is the delivery of computing services including servers, storage, databases, networking, software, analytics, and intelligence over the Internet to offer faster innovation, flexible resources, and economies of scale. You typically pay only for cloud services you use, helping lower your operating costs, run your infrastructure more efficiently, and scale as your business needs change."
    },
    {
        id: 9,
        title: "Blockchain Technology",
        url: "https://example.com/blockchain",
        content: "Blockchain is a distributed database or ledger that is shared among the nodes of a computer network. As a database, a blockchain stores information electronically in digital format. Blockchains are best known for their crucial role in cryptocurrency systems, such as Bitcoin, for maintaining a secure and decentralized record of transactions."
    },
    {
        id: 10,
        title: "Internet of Things (IoT)",
        url: "https://example.com/iot",
        content: "The Internet of Things describes the network of physical objects that are embedded with sensors, software, and other technologies for the purpose of connecting and exchanging data with other devices and systems over the internet. These devices range from ordinary household objects to sophisticated industrial tools."
    },
    {
        id: 11,
        title: "Quantum Computing",
        url: "https://example.com/quantum-computing",
        content: "Quantum computing is a type of computation that harnesses the collective properties of quantum states, such as superposition, interference, and entanglement, to perform calculations. The devices that perform quantum computations are known as quantum computers. Quantum computers are believed to be able to solve certain computational problems, such as integer factorization, substantially faster than classical computers."
    },
    {
        id: 12,
        title: "Big Data Analytics",
        url: "https://example.com/big-data",
        content: "Big data analytics is the use of advanced analytic techniques against very large, diverse data sets that include structured, semi-structured and unstructured data, from different sources, and in different sizes from terabytes to zettabytes. Big data analytics enables analysts, researchers, and business users to make better and faster decisions using data that was previously inaccessible or unusable."
    },
    {
        id: 13,
        title: "Software Engineering Principles",
        url: "https://example.com/software-engineering",
        content: "Software engineering is the systematic application of engineering approaches to the development of software. Software engineering is a computing discipline. A software engineer creates programs based on logic for the computer to execute. A software engineer has to be more concerned about the correctness of the program in all the cases. Meanwhile, a software developer is a person who creates software for use on computers and other devices."
    },
    {
        id: 14,
        title: "Database Management Systems",
        url: "https://example.com/database-systems",
        content: "A database management system is software that interacts with end users, applications, and the database itself to capture and analyze data. A general-purpose DBMS allows the definition, creation, querying, update, and administration of databases. Well-known DBMSs include MySQL, PostgreSQL, MongoDB, Microsoft SQL Server, Oracle, and IBM DB2."
    },
    {
        id: 15,
        title: "Computer Networks",
        url: "https://example.com/computer-networks",
        content: "A computer network is a set of computers sharing resources located on or provided by network nodes. The computers use common communication protocols over digital interconnections to communicate with each other. These interconnections are made up of telecommunication network technologies, based on physically wired, optical, and wireless radio-frequency methods."
    },
    {
        id: 16,
        title: "Operating Systems",
        url: "https://example.com/operating-systems",
        content: "An operating system is system software that manages computer hardware, software resources, and provides common services for computer programs. Time-sharing operating systems schedule tasks for efficient use of the system and may also include accounting software for cost allocation of processor time, mass storage, printing, and other resources."
    },
    {
        id: 17,
        title: "Programming Languages",
        url: "https://example.com/programming-languages",
        content: "A programming language is a formal language comprising a set of strings that produce various kinds of machine code output. Programming languages are one kind of computer language, and are used in computer programming to implement algorithms. Most programming languages consist of instructions for computers. There are programmable machines that use a set of specific instructions, rather than general programming languages."
    },
    {
        id: 18,
        title: "Digital Marketing",
        url: "https://example.com/digital-marketing",
        content: "Digital marketing is the component of marketing that uses the Internet and online based digital technologies such as desktop computers, mobile phones and other digital media and platforms to promote products and services. Its development during the 1990s and 2000s changed the way brands and businesses use technology for marketing."
    },
    {
        id: 19,
        title: "E-commerce Platforms",
        url: "https://example.com/ecommerce",
        content: "E-commerce is the activity of electronically buying or selling of products on online services or over the Internet. E-commerce draws on technologies such as mobile commerce, electronic funds transfer, supply chain management, Internet marketing, online transaction processing, electronic data interchange, inventory management systems, and automated data collection systems."
    },
    {
        id: 20,
        title: "Mobile Application Development",
        url: "https://example.com/mobile-dev",
        content: "Mobile application development is the process of creating software applications that run on a mobile device, and a typical mobile application utilizes a network connection to work with remote computing resources. Hence, the mobile development process involves creating installable software bundles, implementing backend services such as data access with an API, and testing the application on target devices."
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
function checkPlagiarism() {
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

    // Simulate processing delay for better UX
    setTimeout(() => {
        const results = analyzePlagiarism(text);
        displayResults(results);
    }, 1500);
}

function analyzePlagiarism(text) {
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
        if (matchPercentage > 10) {
            sources.push({
                ...source,
                matchPercentage: Math.round(matchPercentage),
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
    // Use the maximum match percentage from any source as the base
    // If multiple sources found, add bonus for each additional source
    let similarityScore = maxMatchPercentage;
    if (sources.length > 1) {
        // Add 5% for each additional source (up to 30% bonus)
        const bonus = Math.min((sources.length - 1) * 5, 30);
        similarityScore = Math.min(similarityScore + bonus, 100);
    }

    similarityScore = Math.round(similarityScore);

    return {
        similarityScore,
        totalWords: words.length,
        matchedWords: matchedWords.size,
        uniqueContent: 100 - similarityScore,
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
        source.matchedPhrases.forEach(phrase => {
            allPhrases.push({ phrase, source: source.title });
        });
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
    document.head.appendChild(style);
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
    document.head.appendChild(style);
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
