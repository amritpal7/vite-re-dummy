import { ProductType } from "../../types/productsType";
export const getProducts = async () => {
  const res = await fetch("https://dummyjson.com/products", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Failed to fetch products.");
  return await res.json();
};

export const createProduct = async (newProduct: ProductType) => {
  try {
    const res = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    if (!res.ok) throw new Error("Error creating product.");

    return await res.json();
  } catch (error: any) {
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
    });

    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
