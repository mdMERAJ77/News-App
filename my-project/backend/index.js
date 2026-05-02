import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ CORS properly configure karo
app.use(cors({
    origin: ['https://newsmeraj.netlify.app', 'http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));

app.get("/news", async (req, res) => {
    try {
        const query = req.query.q || "india";
        
        const response = await axios.get(
            `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEWS_API_KEY}`
        );
        
        res.json(response.data);
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});

// ✅ IMPORANT: Render ke liye port bind karo
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});