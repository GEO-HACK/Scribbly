"use client"

import { useEffect, useState } from "react";


const useCategories = () => {
    const[ categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {   
        const fetchCategories = async () => {
            try {
                // Use relative URL for API calls to work in all environments
                const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
                const res = await fetch(`${baseUrl}/api/categories`, {
                    cache: "no-cache",
                });
                
                if (!res.ok) {
                    throw new Error(`Failed to fetch categories: ${res.status}`);
                }
                
                const data = await res.json();
                setCategories(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError(error);
                setLoading(false);
                // Set empty categories on error to prevent build failures
                setCategories([]);
            }
        };

        // Only fetch on client side
        if (typeof window !== 'undefined') {
            fetchCategories();  
        } else {
            // During SSR/build, set loading to false with empty categories
            setLoading(false);
            setCategories([]);
        }
    }, []);
    return { categories, loading, error };
}

export default useCategories;   