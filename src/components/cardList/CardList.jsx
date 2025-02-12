"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import { all } from "lowlight";

const CardList = ({ cat, }) => {
  const [data, setData] = useState([]);
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const pageFromParams = parseInt(searchParams.get("page")) || 1;
    setPage(pageFromParams);
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = all 
        ? `/api/posts?all=true${cat ? `&cat=${cat}` : ""}`
        : `/api/posts?page=${page}${cat ? `&cat=${cat}` : ""}`; 

        const res = await fetch(query, { cache: "no-cache" });
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
  }, [page, cat, all]);

  useEffect(() => {
    const currentPath = window.location.pathname;
    router.push(`${currentPath}?page=${page}${cat ? `&cat=${cat}` : ""}`);
  }, [page, cat, all]);

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
      <Pagination page={page} setPage={setPage} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
