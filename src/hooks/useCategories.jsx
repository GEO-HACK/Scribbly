"use client"

import { useEffect, useState } from "react";


const useCategories = () => {
    const[ categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {   
        // Only fetch on client side to prevent SSG issues
        if (typeof window === 'undefined') {
            setLoading(false);
            setCategories([]);
            return;
        }

        const fetchCategories = async () => {
            try {
                // Use relative URL for API calls
                const res = await fetch('/api/categories', {
                    cache: "no-cache",
                });
                
                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.status}`);
                }
                
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError(error);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();  
    }, []);
    return { categories, loading, error };
}

export default useCategories;   