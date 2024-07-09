import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import Aside from "../components/Aside";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import OrderPayment from "../components/OrderPayment";
import ProductDetails from "../components/ProductDetails";

const Shopy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const paginationObj = useSelector((state) => state.products.paginationObj);
  const cart = useSelector((state) => state.cart.cart || []);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchProductsByCategory(selectedCategory, currentPage));
    } else {
      dispatch(fetchProducts(currentPage));
    }
  }, [dispatch, currentPage, selectedCategory]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div>
      <Navbar onSearch={handleSearch} cartCount={cartCount} />
      <div className="container mx-auto p-4 flex">
        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <ProductList
                  products={filteredProducts}
                  onAddToCart={handleAddToCart}
                  currentPage={currentPage}
                  totalPages={paginationObj.totalPages}
                  onPageChange={handlePageChange}
                />
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>
        {location.pathname === "/cart" ||
        matchPath("/product/:id", location.pathname) ? (
          <OrderPayment />
        ) : (
          <Aside onCategoryChange={handleCategoryChange} />
        )}
      </div>
    </div>
  );
};

export default Shopy;
