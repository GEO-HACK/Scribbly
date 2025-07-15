"use client"

import { useEffect, useState } from "react";


const useCategories = () => {
    const[ categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {   
        const fetchCategories = async () => {
            try {
                // Use relative URL - works in all environments
                const res = await fetch('/api/categories');
                
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }
                
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Categories fetch failed:", error.message);
                setError(error);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(fetchCategories, 100);
        return () => clearTimeout(timer);

    }, []);
    return { categories, loading, error };
}

export default useCategories;   