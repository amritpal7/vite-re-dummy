import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "./productsApi";
import { ProductsType, ProductType } from "../../types/productsType";

const initialState: ProductsType = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk("books", async () => {
  const data = await getProducts();
  return data.products;
});

export const createNewProduct = createAsyncThunk(
  "product/create",
  async (product: ProductType) => {
    const data = await createProduct(product);
    return data;
  }
);

export const deleteProd = createAsyncThunk(
  "product/delete",
  async (id: number) => {
    const data = await deleteProduct(id);
    return data;
  }
);

export const updateProd = createAsyncThunk(
  "product/update",
  async (product: ProductType) => {
    const data = await updateProduct(product);
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "idle";
        const deletedIds: number[] = JSON.parse(
          localStorage.getItem("deletedProducts") || "[]"
        );
        state.products = action.payload.filter(
          (product: ProductType) =>
            typeof product.id === "number" && !deletedIds.includes(product.id)
        );
      })
      .addCase(fetchProducts.rejected, state => {
        state.status = "failed";
      })
      .addCase(createNewProduct.pending, state => {
        state.status = "idle";
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        (state.status = "idle"), state.products.push(action.payload);
      })
      .addCase(createNewProduct.rejected, state => {
        state.status = "failed";
      })
      .addCase(deleteProd.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteProd.fulfilled, (state, action) => {
        state.status = "idle";
        const existing = JSON.parse(
          localStorage.getItem("deletedProducts") || "[]"
        );
        const id = action.meta.arg; // this is the actual ID you passed in
        localStorage.setItem(
          "deletedProducts",
          JSON.stringify([...existing, id])
        );
      })
      .addCase(deleteProd.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete the product.";
      })
      .addCase(updateProd.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      });
  },
});

export default productsSlice.reducer;
