const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT =  process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// POST endpoint to handle user chat
app.post('/ask', async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-small-3.2-24b-instruct:free',
        messages: messages, // full conversation history
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5000', // for visibility on OpenRouter
          'X-Title': 'Wellness Assistant Chatbot'
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.error('❌ Error from OpenRouter:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to fetch response from assistant. Try again later.',
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
