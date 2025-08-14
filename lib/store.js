import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/domains/auth/model/authSlice";
import { authApi } from "@/domains/auth/services/authApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
