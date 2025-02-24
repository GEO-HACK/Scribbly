"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";

const CardList = ({ initialData }) => {
  const [data, setData] = useState(initialData || []);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract page and category from URL
  const page = parseInt(searchParams.get("page") || "1", 10);
  const cat = searchParams.get("cat") || null;
  const [hasNext, setHasNext] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts?page=${page}${cat ? `&cat=${cat}` : ""}`;
        const res = await fetch(query, { cache: "force-cache" }); // Allow pre-rendering

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

    fetchData();
  }, [page, cat]);

  // Update URL when page or cat changes
  useEffect(() => {
    const currentPath = window.location.pathname;
    router.push(`${currentPath}?page=${page}${cat ? `&cat=${cat}` : ""}`);
  }, [page, cat]);

  return (
    <div className="max-w-[70%]">
      <h1 className="font-semibold text-xl mt-4 mb-4">Recent Posts</h1>
      <div className="flex flex-col">
        {data.length > 0 ? (
          data.map((item) => <Card key={item.id} item={item} />)
        ) : (
          <p>No posts available.</p>
        )}
      </div>
      <Pagination page={page} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
