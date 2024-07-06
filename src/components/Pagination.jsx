import React from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    onPageChange(page);
    dispatch(fetchProducts(page));
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`mx-1 px-3 py-1 border rounded ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
