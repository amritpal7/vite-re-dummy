import { ProductType } from "../../types/productsType";

const endPoint = import.meta.env.VITE_API_URL;
export const getProducts = async () => {
  const res = await fetch(`${endPoint}/products`, {
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

export const updateProduct = async (updatedProduct: ProductType) => {
  const allowedFields = [
    "title",
    "description",
    "price",
    "discountPercentage",
    "rating",
    "stock",
    "brand",
    "category",
    "thumbnail",
    "images",
  ];

  const sanitizedProduct = allowedFields.reduce((obj, key) => {
    if (key in updatedProduct) {
      obj[key] = updatedProduct[key as keyof typeof updatedProduct];
    }
    return obj;
  }, {} as Partial<ProductType>);

  const res = await fetch(
    `https://dummyjson.com/products/${updatedProduct.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sanitizedProduct),
    }
  );
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Failed to update product:", errorText);
    throw new Error("Error updating product.");
  }

  return await res.json();
};
