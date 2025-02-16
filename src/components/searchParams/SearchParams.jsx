"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const SearchParamsHandler = ({ onParams }) => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const cat = searchParams.get("cat") || "all"; // Default to "all" instead of empty string

  useEffect(() => {
    onParams({ page, cat }); // Correctly update state
  }, [page, cat, onParams]);

  return null;
};

export default SearchParamsHandler;
