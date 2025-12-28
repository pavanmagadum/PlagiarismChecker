const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const API_KEY = process.env.GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Plagiarism Checker API is running',
        apiConfigured: !!(API_KEY && SEARCH_ENGINE_ID)
    });
});

// Google Custom Search endpoint
app.post('/api/search', async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    if (!API_KEY || !SEARCH_ENGINE_ID) {
        return res.status(500).json({
            error: 'API not configured. Please set GOOGLE_API_KEY and SEARCH_ENGINE_ID in .env file'
        });
    }

    try {
        const response = await axios.get(
            'https://www.googleapis.com/customsearch/v1',
            {
                params: {
                    key: API_KEY,
                    cx: SEARCH_ENGINE_ID,
                    q: query,
                    num: 10 // Return top 10 results
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error('Google API Error:', error.response?.data || error.message);

        if (error.response?.status === 429) {
            return res.status(429).json({
                error: 'API quota exceeded. Please try again later.'
            });
        }

        if (error.response?.status === 403) {
            return res.status(403).json({
                error: 'API key invalid or Custom Search API not enabled.'
            });
        }

        res.status(500).json({
            error: 'Failed to search',
            details: error.response?.data?.error?.message || error.message
        });
    }
});

// Batch search endpoint (for multiple phrases)
app.post('/api/batch-search', async (req, res) => {
    const { queries } = req.body;

    if (!queries || !Array.isArray(queries)) {
        return res.status(400).json({ error: 'Queries array is required' });
    }

    if (!API_KEY || !SEARCH_ENGINE_ID) {
        return res.status(500).json({
            error: 'API not configured. Please set GOOGLE_API_KEY and SEARCH_ENGINE_ID in .env file'
        });
    }

    try {
        const searchPromises = queries.map(query =>
            axios.get('https://www.googleapis.com/customsearch/v1', {
                params: {
                    key: API_KEY,
                    cx: SEARCH_ENGINE_ID,
                    q: query,
                    num: 5 // Fewer results per query for batch
                }
            }).catch(error => ({
                error: true,
                query,
                message: error.response?.data?.error?.message || error.message
            }))
        );

        const results = await Promise.all(searchPromises);

        const formattedResults = results.map((result, index) => {
            if (result.error) {
                return {
                    query: queries[index],
                    error: result.message,
                    items: []
                };
            }
            return {
                query: queries[index],
                items: result.data.items || []
            };
        });

        res.json({ results: formattedResults });
    } catch (error) {
        console.error('Batch Search Error:', error.message);
        res.status(500).json({
            error: 'Failed to perform batch search',
            details: error.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Plagiarism Checker API Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);

    if (!API_KEY || !SEARCH_ENGINE_ID) {
        console.warn('⚠️  WARNING: Google API credentials not configured!');
        console.warn('   Please set GOOGLE_API_KEY and SEARCH_ENGINE_ID in .env file');
    } else {
        console.log('✅ Google API credentials configured');
    }
});
