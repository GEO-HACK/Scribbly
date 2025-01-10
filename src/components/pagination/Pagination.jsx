import React from "react";

const Pagination = ({ page, setPage }) => {
  return (
    <div className="flex justify-between">
      <button
        className="w-[100px] border-none p-[12px] bg-red-600 text-white"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>
      <button
        className="w-[100px] border-none p-[12px] bg-red-600 text-white cursor-pointer"
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
