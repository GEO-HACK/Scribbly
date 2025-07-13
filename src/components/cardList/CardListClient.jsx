"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";

// Client-side wrapper for dynamic pagination
const CardListClient = ({ initialData, initialPage, initialCat }) => {
  const [data, setData] = useState(initialData || []);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage || 1);
  const searchParams = useSearchParams();

  // Get current params from URL
  const urlPage = parseInt(searchParams.get("page") || "1", 10);
  const cat = searchParams.get("cat") || null;

  // Fetch data function
  const fetchData = useCallback(async (page, category) => {
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      const query = `${baseUrl}/api/posts?page=${page}${category ? `&cat=${category}` : ""}`;
      const res = await fetch(query, { cache: "no-store" });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();

      // Handle API response format
      if (json.posts) {
        setData(json.posts);
        setHasNext(json.hasMore);
      } else {
        setData(json);
        setHasNext(json.length >= 2);
      }
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      setData([]);
      setHasNext(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle page change from pagination
  const handlePageChange = useCallback((newPage) => {
    fetchData(newPage, cat);
  }, [fetchData, cat]);

  // Sync with URL changes (for browser back/forward)
  useEffect(() => {
    if (urlPage !== currentPage || cat !== initialCat) {
      fetchData(urlPage, cat);
    }
  }, [urlPage, cat, currentPage, initialCat, fetchData]);

  return (
    <div className="max-w-[70%]">
      <h1 className="font-semibold text-xl mt-4 mb-4">Recent Posts</h1>
      
      <div className="flex flex-col min-h-[400px] relative">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading posts...</p>
            </div>
          </div>
        )}
        
        {data.length > 0 ? (
          <div className={`space-y-4 transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
            {data.map((item, index) => (
              <div 
                key={item.id} 
                className="transform transition-all duration-300 ease-in-out"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: loading ? 'none' : 'fadeInUp 0.5s ease-out forwards'
                }}
              >
                <Card item={item} />
              </div>
            ))}
          </div>
        ) : !loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No posts available at the moment.</p>
          </div>
        ) : null}
      </div>
      
      <Pagination 
        page={currentPage} 
        hasNext={hasNext} 
        hasPrev={currentPage > 1} 
        cat={cat}
        onPageChange={handlePageChange}
        loading={loading}
      />
    </div>
  );
};

export default CardListClient;
