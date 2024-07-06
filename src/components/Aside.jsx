import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/slices/asideSlice";
import { fetchProductsByCategory } from "../redux/slices/productSlice";

const Aside = ({ onCategoryChange }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.aside.categories);
  const status = useSelector((state) => state.aside.status);
  const error = useSelector((state) => state.aside.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handleCategoryClick = (idCategory) => {
    dispatch(fetchProductsByCategory(idCategory));
    onCategoryChange(idCategory);
  };

  return (
    <aside className="p-4 bg-gray-200 rounded-lg shadow-lg ml-4 flex flex-col w-80">
      <h2 className="text-xl font-bold mb-4">Categorías</h2>
      {status === "loading" ? (
        <p>Cargando categorías...</p>
      ) : error ? (
        <p>Error al cargar categorías: {error}</p>
      ) : (
        <ul>
          {categories &&
            categories.map((category) => (
              <li key={category.categoryId} className="mb-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleCategoryClick(category.categoryId)}
                >
                  {category.name}
                </button>
              </li>
            ))}
        </ul>
      )}
    </aside>
  );
};

export default Aside;
