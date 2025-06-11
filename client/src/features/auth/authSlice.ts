import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, loginUser } from "./authApi";
import { AuthState } from "../../types/user";

const tokenKey = "auth-token";
const initialToken = localStorage.getItem(tokenKey);

const initialState: AuthState = {
  token: initialToken,
  user: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { username: string; password: string }) => {
    const data = await loginUser(credentials);
    return data;
  }
);

export const currentUser = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  const state: any = thunkAPI.getState();
  const token = state.auth.token;
  const data = await getCurrentUser(token);
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      (state.token = null), (state.user = null);
      localStorage.removeItem(tokenKey);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        (state.status = "idle"),
          (state.token = action.payload.accessToken),
          (state.user = action.payload),
          (state.error = null);
        localStorage.setItem(tokenKey, action.payload.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error: Login failed!";
      })
      .addCase(currentUser.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        (state.status = "idle"),
          (state.user = action.payload),
          (state.error = null);
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error: failed to fetch user!";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
