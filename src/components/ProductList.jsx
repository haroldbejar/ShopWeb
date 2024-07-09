import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

const ProductList = ({
  products,
  onAddToCart,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.productId} className="flex items-stretch">
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductList;
