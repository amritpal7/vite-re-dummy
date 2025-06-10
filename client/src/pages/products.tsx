import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchProducts } from "../features/products/productSlice";

function Products() {
  const { products, status } = useSelector(
    (state: RootState) => state.products
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!products && status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-500">
        Loading product...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 bg-[#fdf9f6]">
      <h2 className="text-sm font-bold text-[#264143] mt-10">
        Product Library
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-[#264143] shadow-[5px_5px_0px_#e99f4c] hover:shadow-[2px_2px_0px_#e99f4c] transition-all duration-300"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold text-[#264143]">
                {product.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
              <div className="text-sm text-[#de5499] font-semibold">
                ₹{product.price}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Brand: {product.brand}</span>
                <span>Category: {product.category}</span>
              </div>
            </div>

            <button
              onClick={() => {
                navigate(`/products/${product.id}`);
              }}
              className="px-6 py-2 text-lg font-semibold transition-all duration-300 cursor-pointer text-[#de5499]
               hover:text-[#de5499]"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
