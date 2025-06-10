import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../app/store";
import { BiEditAlt } from "react-icons/bi";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (id) {
      fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data));
    }
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-500">
        Loading product...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 bg-[#fdf9f6] mt-15">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-3xl p-6 shadow-[6px_6px_0px_#e99f4c] border border-[#264143]">
        {/* Left: Image Gallery */}
        <div className="flex flex-col space-y-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="rounded-2xl w-full h-64 object-cover border border-[#264143]"
          />
          <div className="grid grid-cols-3 gap-2">
            {product.images.slice(0, 3).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                className="rounded-md h-20 object-cover border border-[#de5499]"
              />
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-3xl font-bold text-[#264143] mb-2">
              {product.title}
            </h2>
            <p className="text-[#de5499] font-semibold text-xl mb-2">
              ₹{product.price}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
          <div className="text-sm text-gray-500 flex gap-6 pt-4">
            <span className="bg-[#fceee9] px-3 py-1 rounded-full font-medium">
              Brand: {product.brand}
            </span>
            <span className="bg-[#fceee9] px-3 py-1 rounded-full font-medium">
              Category: {product.category}
            </span>
          </div>
          <button className="mt-6 w-full md:w-auto bg-[#de5499] hover:opacity-90 text-white font-bold px-6 py-3 rounded-xl shadow-[3px_3px_0px_#e99f4c]">
            Buy Now
          </button>
          {user && (
            <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#264143] hover:bg-[#1f343b] text-white font-bold px-6 py-3 rounded-xl shadow-[3px_3px_0px_#e99f4c]">
              <BiEditAlt className="text-xl" />
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
