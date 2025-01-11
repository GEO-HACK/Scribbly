import React from "react";

const Pagination = ({ page, setPage, hasNext }) => {
  return (
    <div className="flex justify-between">
      <button
        className="w-[100px] border-none p-[12px] bg-red-600 text-white  disabled:opacity-50"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>
      <button
        className="w-[100px] border-none p-[12px] bg-red-600 text-white disabled:opacity-50"
        disabled={!hasNext}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
