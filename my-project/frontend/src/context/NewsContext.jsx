import { createContext, useContext, useState, useCallback } from "react";
import api from "../config/axios";

const NewsContext = createContext();

const NewsContextProvider = ({ children }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchNews = useCallback(async (url = "?q=india") => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await api.get(`/news${url}`);
            const data = response.data;
            
            // Optionally store the fetched news in context
            if (data.articles) {
                setNews(data.articles);
            }
            
            setLoading(false);
            return data;
        } catch (error) {
            console.error("Error fetching news:", error);
            setError(error.message || "Failed to fetch news");
            setLoading(false);
            throw error; // Re-throw to allow component-level handling
        }
    }, []); // Empty dependency array since api is stable

    const clearNews = useCallback(() => {
        setNews([]);
        setError(null);
    }, []);

    const value = {
        news,
        setNews,
        fetchNews,
        loading,
        error,
        clearNews,
    };

    return (
        <NewsContext.Provider value={value}>
            {children}
        </NewsContext.Provider>
    );
};

const useNewsContext = () => {
    const context = useContext(NewsContext);
    
    if (!context) {
        throw new Error("useNewsContext must be used within a NewsContextProvider");
    }
    
    return context;
};

export { NewsContextProvider, useNewsContext };