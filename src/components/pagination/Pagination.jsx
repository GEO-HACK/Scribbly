"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ page, hasNext, hasPrev, cat, onPageChange, loading }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage) => {
    // Update URL without page refresh
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    
    if (cat) {
      params.set('cat', cat);
    }
    
    // Update URL without navigation (no page refresh)
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
    
    // Call parent component to fetch new data
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex justify-between items-center mt-8">
      <button
        className="px-6 py-3 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={!hasPrev || loading}
        onClick={() => handlePageChange(page - 1)}
      >
        {loading ? "Loading..." : "Previous"}
      </button>
      
      <span className="text-gray-600 font-medium">
        {loading ? "Loading..." : `Page ${page}`}
      </span>
      
      <button
        className="px-6 py-3 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={!hasNext || loading}
        onClick={() => handlePageChange(page + 1)}
      >
        {loading ? "Loading..." : "Next"}
      </button>
    </div>
  );
};

export default Pagination;
