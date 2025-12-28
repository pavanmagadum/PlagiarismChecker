# Humanize System Documentation

## Overview

The **Humanize System** transforms raw plagiarism detection data into user-friendly, natural language output. It makes the application more accessible and easier to understand for all users.

---

## Features

### 1. **Number Formatting**
Converts raw numbers into readable formats:
- `1234567` → `1,234,567`
- `1` → `1st`, `2` → `2nd`, `3` → `3rd` (ordinals)
- `1048576` bytes → `1 MB`
- `75.5` → `75.5%` or `76%`

### 2. **Time Formatting**
Makes time more relatable:
- `5000ms` → `5 seconds`
- `120000ms` → `2 minutes`
- Date → `2 minutes ago`, `5 hours ago`, `3 days ago`

### 3. **Text Formatting**
Improves readability:
- `word` + count `2` → `2 words`
- Long URLs → Truncated with `...`
- `hello world` → `Hello World` (title case)

### 4. **Plagiarism-Specific Humanization**

#### Similarity Levels
Converts percentages to meaningful categories:

| Score Range | Level | Emoji | Description |
|-------------|-------|-------|-------------|
| 0-15% | Excellent | ✅ | Highly original content |
| 16-30% | Good | 👍 | Mostly original with minor similarities |
| 31-50% | Moderate | ⚠️ | Moderate similarity detected |
| 51-75% | High | ⚡ | Significant similarity found |
| 76-100% | Very High | 🚨 | Very high similarity - potential plagiarism |

#### Match Descriptions
- `90%` → `90% match (Nearly identical)`
- `70%` → `70% match (Very similar)`
- `50%` → `50% match (Moderately similar)`
- `30%` → `30% match (Somewhat similar)`
- `10%` → `10% match (Minor similarity)`

#### Confidence Levels
Based on sources and match percentage:
- **Very High Confidence**: 3+ sources, 70%+ match
- **High Confidence**: 2+ sources, 50%+ match
- **Moderate Confidence**: 1+ source, 30%+ match
- **Low Confidence**: Otherwise

---

## Usage Examples

### Basic Number Formatting

```javascript
// Format numbers with commas
Humanize.formatNumber(1234567);
// Output: "1,234,567"

// Convert to ordinal
Humanize.ordinal(1);  // "1st"
Humanize.ordinal(2);  // "2nd"
Humanize.ordinal(3);  // "3rd"
Humanize.ordinal(21); // "21st"

// Format file sizes
Humanize.fileSize(1024);      // "1 KB"
Humanize.fileSize(1048576);   // "1 MB"
Humanize.fileSize(1073741824); // "1 GB"

// Format percentages
Humanize.percentage(75.5);     // "75.5%"
Humanize.percentage(75.5, 0);  // "76%"
Humanize.percentage(75.5, 2);  // "75.50%"
```

### Time Formatting

```javascript
// Duration from milliseconds
Humanize.duration(5000);    // "5 seconds"
Humanize.duration(120000);  // "2 minutes"
Humanize.duration(3600000); // "1 hour"

// Relative time
const pastDate = new Date(Date.now() - 120000);
Humanize.timeAgo(pastDate); // "2 minutes ago"

const yesterday = new Date(Date.now() - 86400000);
Humanize.timeAgo(yesterday); // "1 day ago"
```

### Text Formatting

```javascript
// Pluralization
Humanize.pluralize(1, 'word');     // "1 word"
Humanize.pluralize(5, 'word');     // "5 words"
Humanize.pluralize(1, 'match', 'matches'); // "1 match"
Humanize.pluralize(3, 'match', 'matches'); // "3 matches"

// Truncate text
Humanize.truncate('This is a very long text that needs to be shortened', 20);
// Output: "This is a very lo..."

// Title case
Humanize.titleCase('hello world from javascript');
// Output: "Hello World From Javascript"
```

### Plagiarism-Specific Functions

```javascript
// Get similarity level information
const level = Humanize.similarityLevel(75);
console.log(level);
/*
{
  level: 'High',
  emoji: '⚡',
  description: 'Significant similarity found',
  color: '#fb923c',
  advice: 'High similarity detected. Please review sources and add proper citations.'
}
*/

// Generate human-readable summary
const results = {
  similarityScore: 65,
  totalWords: 500,
  matchedWords: 325,
  sources: [
    { title: 'Source 1', matchPercentage: 65 },
    { title: 'Source 2', matchPercentage: 40 }
  ]
};

const summary = Humanize.generateSummary(results);
// Output: "⚡ Your 500-word document has a 65% similarity score. 
//          We found 2 potential sources with 325 matching words."

// Get reading time
Humanize.readingTime(500);  // "3 minutes"
Humanize.readingTime(100);  // "Less than a minute"
Humanize.readingTime(1000); // "5 minutes"

// Match description with context
Humanize.matchDescription(90); // "90% match (Nearly identical)"
Humanize.matchDescription(50); // "50% match (Moderately similar)"
Humanize.matchDescription(20); // "20% match (Minor similarity)"

// Confidence level
Humanize.confidenceLevel(3, 75); // "Very High Confidence"
Humanize.confidenceLevel(2, 55); // "High Confidence"
Humanize.confidenceLevel(1, 35); // "Moderate Confidence"

// Get recommendations
const recommendations = Humanize.getRecommendations(results);
console.log(recommendations);
/*
[
  '⚠️ Warning: Review and paraphrase the matched content',
  '📖 Consider citing the sources you referenced',
  '🔄 Rephrase similar sections to improve originality'
]
*/
```

---

## Integration in Plagiarism Checker

### Display Results

The humanize system is integrated into the `displayResults()` function:

```javascript
function displayResults(results) {
    // Get humanized data
    const level = Humanize.similarityLevel(results.similarityScore);
    const summary = Humanize.generateSummary(results);
    const recommendations = Humanize.getRecommendations(results);
    const readingTime = Humanize.readingTime(results.totalWords);
    const confidence = Humanize.confidenceLevel(results.sources.length, results.similarityScore);

    // Display with natural language
    resultsContent.innerHTML = `
        <h3>${level.emoji} ${level.level} - ${level.description}</h3>
        <p>${summary}</p>
        <p><strong>💡 Advice:</strong> ${level.advice}</p>
        
        <div class="meta-info">
            <span>📖 Reading time: ${readingTime}</span>
            <span>🎯 Confidence: ${confidence}</span>
        </div>

        <div class="recommendations">
            <h4>📋 Recommendations:</h4>
            <ul>
                ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
    `;
}
```

### Display Sources

Sources are displayed with humanized formatting:

```javascript
function displaySources(sources) {
    sourcesList.innerHTML = sources.map((source, index) => {
        const matchDesc = Humanize.matchDescription(source.matchPercentage);
        const ordinalNum = Humanize.ordinal(index + 1);

        return `
            <div class="source-item">
                <div class="source-header">
                    <span>${ordinalNum} Source</span>
                    <div>${matchDesc}</div>
                </div>
                <div class="source-info">
                    <div>📄 ${source.title}</div>
                    <a href="${source.url}">
                        🔗 ${Humanize.truncate(source.url, 60)}
                    </a>
                </div>
            </div>
        `;
    }).join('');
}
```

---

## Benefits

### For Users
- ✅ **Easier to understand**: Natural language instead of raw numbers
- ✅ **More context**: Descriptive labels and advice
- ✅ **Better decisions**: Clear recommendations based on results
- ✅ **Professional feel**: Polished, user-friendly interface

### For Developers
- ✅ **Reusable**: Single library for all formatting needs
- ✅ **Consistent**: Same formatting throughout the app
- ✅ **Maintainable**: Easy to update formatting rules
- ✅ **Extensible**: Simple to add new humanization functions

---

## Customization

### Adding New Similarity Levels

Edit the `similarityLevel()` function in `humanize.js`:

```javascript
similarityLevel(percentage) {
    if (percentage <= 10) {
        return {
            level: 'Perfect',
            emoji: '🌟',
            description: 'Completely original',
            color: '#00ff00',
            advice: 'Outstanding originality!'
        };
    }
    // ... rest of levels
}
```

### Adding New Recommendations

Edit the `getRecommendations()` function:

```javascript
getRecommendations(results) {
    const recommendations = [];
    const score = results.similarityScore;

    if (score > 90) {
        recommendations.push('🔴 Urgent: Complete rewrite required');
        recommendations.push('📞 Contact your instructor immediately');
    }
    // ... rest of recommendations
    
    return recommendations;
}
```

---

## API Reference

### Number Functions
- `formatNumber(num)` - Add commas to numbers
- `ordinal(num)` - Convert to ordinal (1st, 2nd, 3rd)
- `fileSize(bytes)` - Format file size
- `percentage(value, decimals)` - Format percentage

### Time Functions
- `duration(ms)` - Convert milliseconds to readable duration
- `timeAgo(date)` - Get relative time string

### Text Functions
- `pluralize(count, singular, plural)` - Pluralize words
- `truncate(text, maxLength)` - Truncate with ellipsis
- `titleCase(text)` - Capitalize words

### Plagiarism Functions
- `similarityLevel(percentage)` - Get level info
- `generateSummary(results)` - Create summary text
- `readingTime(wordCount)` - Estimate reading time
- `matchDescription(percentage)` - Describe match level
- `confidenceLevel(sourceCount, matchPercentage)` - Get confidence
- `getRecommendations(results)` - Generate advice

---

## Examples in Action

### Before Humanization
```
Similarity: 65
Words: 1234
Matched: 803
Sources: 2
```

### After Humanization
```
⚡ High - Significant similarity found

Your 1,234-word document has a 65% similarity score. 
We found 2 potential sources with 803 matching words.

💡 Advice: High similarity detected. Please review sources 
and add proper citations.

📖 Reading time: 7 minutes
🎯 Confidence: High Confidence

📋 Recommendations:
→ ⚠️ Warning: Review and paraphrase the matched content
→ 📖 Consider citing the sources you referenced
→ 🔄 Rephrase similar sections to improve originality
```

---

## Browser Compatibility

The humanize library uses standard JavaScript (ES6+) and is compatible with:
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

---

## Performance

- **Lightweight**: ~10KB minified
- **Fast**: All operations complete in <1ms
- **No dependencies**: Pure JavaScript
- **Memory efficient**: No caching or state

---

## Future Enhancements

Planned features:
- [ ] Multi-language support (i18n)
- [ ] Custom formatting templates
- [ ] Date/time localization
- [ ] Currency formatting
- [ ] Number abbreviations (1K, 1M, 1B)

---

**The humanize system makes your plagiarism checker more user-friendly and professional!** 🎉
