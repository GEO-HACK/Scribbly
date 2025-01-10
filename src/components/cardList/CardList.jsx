"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Proper router handling
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";

const CardList = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const currentPage = parseInt(searchParams.get("page")) || 1; // Get current page from query params
  const [page, setPage] = useState(currentPage);

  // Fetch data when page changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/posts?page=${page}`, { cache: "no-cache" });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
        setData([]); // Fallback to an empty array
      }
    };

    fetchData();
  }, [page]);

  // Update URL when page changes
  useEffect(() => {
    router.push(`/?page=${page}`);
  }, [page]);

  return (
    <div className="max-w-[70%]">
      <h1 className="font-semibold text-xl mt-4 mb-4">Recent Posts</h1>
      <div className="flex flex-col">
        {data.map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
};

export default CardList;
