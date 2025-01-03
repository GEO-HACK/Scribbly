import React from "react";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";

const getData = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts?page=S{page}`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const text = await res.text();
    if (!text) {
      throw new Error("Empty response from server");
    }

    const json = JSON.parse(text);
    return json;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return []; // Return an empty array as fallback
  }
};
const CardList = async ({page}) => {
  const data = await getData(page)
  return (
    <div className="max-w-[70%]">
      <h1 className="font-semibold text-xl mt-4 mb-4">Recent Posts</h1>
      <div className="flex flex-col ">
        {data?.map((item) => (
          <Card key={item._id} item={item} />
        ))}        
      </div>
      <Pagination />
    </div>
  );
};

export default CardList;
