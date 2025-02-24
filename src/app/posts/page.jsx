'use client';

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "../../components/card/Card";
import Pagination from "../../components/pagination/Pagination";

const PageContent = ({ cat, all }) => {
  const [data, setData] = useState([]);
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const router = useRouter();

  // Extract `page` from searchParams only when `all` is false
  useEffect(() => {
    if (!all) {
      const pageFromParams = parseInt(searchParams.get("page")) || 1;
      setPage(pageFromParams);
    }
  }, [searchParams]); // Removed `all` from dependencies

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts?all=true${cat ? `&cat=${cat}` : ""}` // Fetch all posts
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
  }, [ cat, all]);

  // Update URL only when `all=false`
  useEffect(() => {
    if (!all) {
      const currentPath = window.location.pathname;
      router.push(`${currentPath}?page=${page}${cat ? `&cat=${cat}` : ""}`);
    }
  }, [page, cat]); // Removed `all` from dependencies

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
      {!all && <Pagination page={page} setPage={setPage} hasNext={hasNext} />}
    </div>
  );
};

const Page = ({ cat, all }) => {
  return (
    <Suspense fallback={<div>Loading posts...</div>}>
      <PageContent cat={cat} all={all} />
    </Suspense>
  );
};

export default Page;
