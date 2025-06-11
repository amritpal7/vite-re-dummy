import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { createNewProduct } from "../features/products/productSlice";
import toast from "react-hot-toast";
import { ProductType } from "../types/productsType";

interface props {
  onClose: () => void;
  isModal: boolean;
}

function CreateProduct({ onClose, isModal = false }: props) {
  const [formData, setFormData] = useState<ProductType>({
    title: "",
    description: "",
    category: "",
    price: 0,
    brand: "",
  });
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(createNewProduct(formData)).unwrap(); // wait for it to finish and catch errors if any
    toast.success("Added successfully!");
    setFormData({
      title: "",
      description: "",
      category: "",
      price: 0,
      brand: "",
    });
    if (onClose) onClose();
  };

  const Wrapper = isModal ? "div" : "div";
  const containerClass = isModal
    ? ""
    : "flex items-center justify-center min-h-screen bg-[#fdf9f6] px-4";
  return (
    <Wrapper className={containerClass}>
      <form
        onSubmit={handleSubmit}
        className="bg-white border-2 border-[#264143] rounded-2xl shadow-[6px_6px_0px_#e99f4c] p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-[#264143] text-center">
          Add New Product
        </h2>

        <input
          name="title"
          type="text"
          placeholder="Product title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 text-sm rounded-md border-2 border-[#264143] shadow-[3px_4px_0px_1px_#e99f4c] focus:outline-none focus:translate-y-[1px] focus:shadow-[1px_2px_0px_0px_#e99f4c] placeholder:text-gray-500"
          required
        />
        <input
          name="description"
          type="text"
          placeholder="Product description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 text-sm rounded-md border-2 border-[#264143] shadow-[3px_4px_0px_1px_#e99f4c] focus:outline-none focus:translate-y-[1px] focus:shadow-[1px_2px_0px_0px_#e99f4c] placeholder:text-gray-500"
          required
        />
        <input
          name="category"
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 text-sm rounded-md border-2 border-[#264143] shadow-[3px_4px_0px_1px_#e99f4c] focus:outline-none focus:translate-y-[1px] focus:shadow-[1px_2px_0px_0px_#e99f4c] placeholder:text-gray-500"
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-3 text-sm rounded-md border-2 border-[#264143] shadow-[3px_4px_0px_1px_#e99f4c] focus:outline-none focus:translate-y-[1px] focus:shadow-[1px_2px_0px_0px_#e99f4c] placeholder:text-gray-500"
          required
        />
        <input
          name="brand"
          type="text"
          placeholder="Brand name"
          value={formData.brand}
          onChange={handleChange}
          className="w-full p-3 text-sm rounded-md border-2 border-[#264143] shadow-[3px_4px_0px_1px_#e99f4c] focus:outline-none focus:translate-y-[1px] focus:shadow-[1px_2px_0px_0px_#e99f4c] placeholder:text-gray-500"
          required
        />

        <button
          type="submit"
          className="w-full p-3 mt-4 text-sm font-bold text-white bg-[#de5499] rounded-md shadow-[3px_3px_0px_0px_#e99f4c] hover:opacity-90 transition-all"
        >
          Add Product
        </button>
      </form>
    </Wrapper>
  );
}

export default CreateProduct;
