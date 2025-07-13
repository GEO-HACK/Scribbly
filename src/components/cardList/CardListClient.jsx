"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";

// Client-side wrapper for interactive functionality
const CardListClient = ({ initialData, initialPage, initialCat }) => {
  const [data, setData] = useState(initialData || []);
  const [hasNext, setHasNext] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract page and category from URL
  const page = parseInt(searchParams.get("page") || initialPage || "1", 10);
  const cat = searchParams.get("cat") || initialCat || null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        const query = `${baseUrl}/api/posts?page=${page}${cat ? `&cat=${cat}` : ""}`;
        const res = await fetch(query, { cache: "no-store" });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();

        setData(json);
        setHasNext(json.length > 0);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
        setData([]);
        setHasNext(false);
      }
    };

    // Only fetch if params changed (avoid initial fetch if we have initialData)
    if (page !== initialPage || cat !== initialCat) {
      fetchData();
    }
  }, [page, cat, initialPage, initialCat]);

  // Update URL when page or cat changes
  useEffect(() => {
    const currentPath = window.location.pathname;
    const newUrl = `${currentPath}?page=${page}${cat ? `&cat=${cat}` : ""}`;
    
    // Only push if URL actually changed
    if (window.location.search !== newUrl.split('?')[1]) {
      router.push(newUrl);
    }
  }, [page, cat, router]);

  return (
    <div className="max-w-[70%]">
      <h1 className="font-semibold text-xl mt-4 mb-4">Recent Posts</h1>
      <div className="flex flex-col">
        {data.length > 0 ? (
          data.map((item) => <Card key={item.id} item={item} />)
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No posts available at the moment.</p>
          </div>
        )}
      </div>
      <Pagination page={page} hasNext={hasNext} hasPrev={page > 1} cat={cat} />
    </div>
  );
};

export default CardListClient;
