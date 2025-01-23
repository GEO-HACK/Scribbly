"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";

const CardList = () => {
  const [data, setData] = useState([]);
  const searchParams = useSearchParams();
  // const currentPage = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true); // Assume there's a next page initially
  const router = useRouter();



  //awaiting the search params with an async
  useEffect(() => {
    //when search params change, update the page state
    const pageFromParams = parseInt(searchParams.get("page")) || 1;
    setPage(pageFromParams);

  }, [searchParams]);
  // Fetch data when page changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/posts?page=${page}`, { cache: "no-cache" });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();
        
        setData(json);
        setHasNext(json.length > 0); // If no items, disable Next button
      } catch (error) {
        console.error("Error fetching posts:", error.message);
        setData([]);
        setHasNext(false);
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
        {data.length > 0 ? (
          data.map((item) => <Card key={item._id} item={item} />)
        ) : (
          <p>No posts available.</p>
        )}
      </div>
      <Pagination page={page} setPage={setPage} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
