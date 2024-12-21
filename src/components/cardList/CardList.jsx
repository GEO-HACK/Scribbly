import React from "react";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";

const CardList = () => {
  return (
    <div className="max-w-[70%]">
      <h1 className="font-semibold text-xl mt-4 mb-4">Recent Posts</h1>
      <div className="flex flex-col ">
       <Card/>
       <Card/>
       <Card/>
       <Card/>
       <Card/>
       <Card/>
      </div>
      <Pagination />
    </div>
  );
};

export default CardList;
