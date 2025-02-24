"use client"

import { useEffect, useState } from "react";


const useCategories = () => {
    const[ categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {   
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`, {
                    cache: "no-cache",
                });
                const data = await res.json();
                setCategories(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch categories", error);
                setError(error);
                setLoading(false);
            }
        };
        fetchCategories();  
    }
    , []);
    return { categories, loading, error };
}

export default useCategories;   