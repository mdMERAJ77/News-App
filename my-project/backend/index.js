import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ CORS - Sabko allow kar (testing ke liye)
app.use(cors({
    origin: '*',  // Sabhi domains allow
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Pre-flight requests handle karne ke liye
app.options('*', cors());

app.get("/news", async (req, res) => {
    try {
        const query = req.query.q || "india";
        
        console.log(`Fetching news for: ${query}`); // Log add kiya
        
        const response = await axios.get(
            `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEWS_API_KEY}`
        );
        
        res.json(response.data);
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        res.status(500).json({ 
            error: "Failed to fetch news",
            details: error.response?.data?.message || error.message
        });
    }
});

// ✅ Health check endpoint (Render ke liye)
app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
});