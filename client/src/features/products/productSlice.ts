import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts, createProduct, deleteProduct } from "./productsApi";
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
        state.products = action.payload;
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
        (state.status = "idle"),
          (state.products = state.products.filter(
            product => product.id !== action.payload
          ));
      })
      .addCase(deleteProd.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete the product.";
      });
  },
});

export default productsSlice.reducer;
