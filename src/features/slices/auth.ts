import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { postData, setTokens } from "../../api/api-methods.ts";
import { apiEndpoints } from "../../api/api-endpoints.ts";

interface User {
  userId: string;
  phone_number: string;
  email: string;
  name: string;
  address: string;
  meter_number: string;
  isFirstTimeLogin: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  isFirstTimeLogin: boolean;
  token: string | null;
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isFirstTimeLogin: true,
  token: null,
  user: null,
  status: "idle",
  error: null,
};

export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await postData(apiEndpoints.refresh_token, {});
      setTokens(response.accessToken);
      return {
        token: response.accessToken,
        user: response.user,
      };
    } catch (err: any) {
      return rejectWithValue("Session expired or refresh failed");
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await postData(apiEndpoints.logout, {}); // should clear the cookie
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isFirstTimeLogin = action.payload.user.isFirstTimeLogin;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isFirstTimeLogin = action.payload.user.isFirstTimeLogin;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.status = "idle";
        state.error = null;
      });
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
