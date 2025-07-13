// Server Component - handles initial data fetching
import React from "react";
import CardListClient from "./CardListClient";

// Server-side data fetching function
async function getPosts(page = 1, cat = null) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const query = `${baseUrl}/api/posts?page=${page}${cat ? `&cat=${cat}` : ""}`;
    const res = await fetch(query, { 
      cache: "no-store", // Always fetch fresh data
      next: { revalidate: 0 } // Disable caching for dynamic content
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }
}

const CardList = async ({ searchParams }) => {
  // Extract search params on server
  const page = parseInt(searchParams?.page || "1", 10);
  const cat = searchParams?.cat || null;
  
  // Fetch initial data on server
  const initialData = await getPosts(page, cat);

  // Pass data to client component for interactivity
  return (
    <CardListClient 
      initialData={initialData}
      initialPage={page}
      initialCat={cat}
    />
  );

};

export default CardList;
