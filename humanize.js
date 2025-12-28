// ===== Humanize Library for Plagiarism Checker =====
// Makes numbers, dates, and messages more human-readable

const Humanize = {
    // ===== Number Formatting =====

    /**
     * Format large numbers with commas
     * @param {number} num - Number to format
     * @returns {string} Formatted number
     */
    formatNumber(num) {
        if (num === undefined || num === null) return '0';
        return num.toLocaleString('en-US');
    },

    /**
     * Convert number to ordinal (1st, 2nd, 3rd, etc.)
     * @param {number} num - Number to convert
     * @returns {string} Ordinal string
     */
    ordinal(num) {
        const s = ['th', 'st', 'nd', 'rd'];
        const v = num % 100;
        return num + (s[(v - 20) % 10] || s[v] || s[0]);
    },

    /**
     * Format file size in human-readable format
     * @param {number} bytes - Size in bytes
     * @returns {string} Formatted size
     */
    fileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    },

    /**
     * Format percentage with proper rounding
     * @param {number} value - Percentage value
     * @param {number} decimals - Number of decimal places
     * @returns {string} Formatted percentage
     */
    percentage(value, decimals = 0) {
        if (value === undefined || value === null) return '0%';
        return value.toFixed(decimals) + '%';
    },

    // ===== Time Formatting =====

    /**
     * Convert milliseconds to human-readable duration
     * @param {number} ms - Milliseconds
     * @returns {string} Human-readable duration
     */
    duration(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) {
            return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes % 60} minute${minutes % 60 !== 1 ? 's' : ''}`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ${seconds % 60} second${seconds % 60 !== 1 ? 's' : ''}`;
        } else {
            return `${seconds} second${seconds !== 1 ? 's' : ''}`;
        }
    },

    /**
     * Get relative time (e.g., "2 minutes ago")
     * @param {Date|string|number} date - Date to compare
     * @returns {string} Relative time string
     */
    timeAgo(date) {
        const now = new Date();
        const then = new Date(date);
        const seconds = Math.floor((now - then) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
        };

        for (const [name, value] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / value);
            if (interval >= 1) {
                return `${interval} ${name}${interval !== 1 ? 's' : ''} ago`;
            }
        }

        return 'just now';
    },

    // ===== Text Formatting =====

    /**
     * Pluralize a word based on count
     * @param {number} count - Count
     * @param {string} singular - Singular form
     * @param {string} plural - Plural form (optional)
     * @returns {string} Pluralized string
     */
    pluralize(count, singular, plural = null) {
        if (count === 1) {
            return `${count} ${singular}`;
        }
        return `${count} ${plural || singular + 's'}`;
    },

    /**
     * Truncate text with ellipsis
     * @param {string} text - Text to truncate
     * @param {number} maxLength - Maximum length
     * @returns {string} Truncated text
     */
    truncate(text, maxLength = 100) {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength - 3) + '...';
    },

    /**
     * Capitalize first letter of each word
     * @param {string} text - Text to capitalize
     * @returns {string} Capitalized text
     */
    titleCase(text) {
        if (!text) return '';
        return text.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },

    // ===== Plagiarism-Specific Humanization =====

    /**
     * Get human-readable similarity level
     * @param {number} percentage - Similarity percentage
     * @returns {object} Level info with name, description, color
     */
    similarityLevel(percentage) {
        if (percentage <= 15) {
            return {
                level: 'Excellent',
                emoji: '✅',
                description: 'Highly original content',
                color: '#43e97b',
                advice: 'Your content appears to be original. Great work!'
            };
        } else if (percentage <= 30) {
            return {
                level: 'Good',
                emoji: '👍',
                description: 'Mostly original with minor similarities',
                color: '#4facfe',
                advice: 'Good originality. Some common phrases detected, which is normal.'
            };
        } else if (percentage <= 50) {
            return {
                level: 'Moderate',
                emoji: '⚠️',
                description: 'Moderate similarity detected',
                color: '#fbbf24',
                advice: 'Consider reviewing and paraphrasing the highlighted sections.'
            };
        } else if (percentage <= 75) {
            return {
                level: 'High',
                emoji: '⚡',
                description: 'Significant similarity found',
                color: '#fb923c',
                advice: 'High similarity detected. Please review sources and add proper citations.'
            };
        } else {
            return {
                level: 'Very High',
                emoji: '🚨',
                description: 'Very high similarity - potential plagiarism',
                color: '#ff6b6b',
                advice: 'Critical: Most of your content matches existing sources. Rewrite or cite properly.'
            };
        }
    },

    /**
     * Generate human-readable summary
     * @param {object} results - Plagiarism check results
     * @returns {string} Summary text
     */
    generateSummary(results) {
        const level = this.similarityLevel(results.similarityScore);
        const wordCount = this.formatNumber(results.totalWords);
        const matchedWords = this.formatNumber(results.matchedWords);
        const sourceCount = results.sources.length;

        let summary = `${level.emoji} Your ${wordCount}-word document has a ${results.similarityScore}% similarity score. `;

        if (sourceCount === 0) {
            summary += `No matching sources were found. Your content appears to be original!`;
        } else if (sourceCount === 1) {
            summary += `We found 1 potential source with ${matchedWords} matching words.`;
        } else {
            summary += `We found ${sourceCount} potential sources with ${matchedWords} matching words.`;
        }

        return summary;
    },

    /**
     * Get reading time estimate
     * @param {number} wordCount - Number of words
     * @returns {string} Reading time
     */
    readingTime(wordCount) {
        const wordsPerMinute = 200;
        const minutes = Math.ceil(wordCount / wordsPerMinute);

        if (minutes < 1) {
            return 'Less than a minute';
        } else if (minutes === 1) {
            return '1 minute';
        } else {
            return `${minutes} minutes`;
        }
    },

    /**
     * Format match percentage with context
     * @param {number} percentage - Match percentage
     * @returns {string} Formatted string with context
     */
    matchDescription(percentage) {
        if (percentage >= 90) return `${percentage}% match (Nearly identical)`;
        if (percentage >= 70) return `${percentage}% match (Very similar)`;
        if (percentage >= 50) return `${percentage}% match (Moderately similar)`;
        if (percentage >= 30) return `${percentage}% match (Somewhat similar)`;
        return `${percentage}% match (Minor similarity)`;
    },

    /**
     * Get confidence level for detection
     * @param {number} sourceCount - Number of sources
     * @param {number} matchPercentage - Match percentage
     * @returns {string} Confidence description
     */
    confidenceLevel(sourceCount, matchPercentage) {
        if (sourceCount >= 3 && matchPercentage >= 70) {
            return 'Very High Confidence';
        } else if (sourceCount >= 2 && matchPercentage >= 50) {
            return 'High Confidence';
        } else if (sourceCount >= 1 && matchPercentage >= 30) {
            return 'Moderate Confidence';
        } else {
            return 'Low Confidence';
        }
    },

    /**
     * Generate actionable recommendations
     * @param {object} results - Plagiarism check results
     * @returns {array} Array of recommendations
     */
    getRecommendations(results) {
        const recommendations = [];
        const score = results.similarityScore;

        if (score > 75) {
            recommendations.push('🔴 Critical: Rewrite the highlighted sections in your own words');
            recommendations.push('📚 Add proper citations for all quoted or referenced material');
            recommendations.push('✍️ Use quotation marks for direct quotes');
        } else if (score > 50) {
            recommendations.push('⚠️ Warning: Review and paraphrase the matched content');
            recommendations.push('📖 Consider citing the sources you referenced');
            recommendations.push('🔄 Rephrase similar sections to improve originality');
        } else if (score > 30) {
            recommendations.push('💡 Tip: Some common phrases detected - this is usually normal');
            recommendations.push('✅ Consider adding citations if you referenced specific sources');
        } else {
            recommendations.push('✨ Excellent! Your content is highly original');
            recommendations.push('📝 Keep up the good work with original writing');
        }

        return recommendations;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Humanize;
}
