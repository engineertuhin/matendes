import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/domains/auth/model/authSlice";
import { authApi } from "@/domains/auth/services/authApi";
import { companyApi } from "@/domains/company/services/companyApi";
import { branchApi } from "@/domains/branch/services/branchApi";
import { departmentApi } from "@/domains/department/services/departmentApi";

const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [companyApi.reducerPath]: companyApi.reducer,
        [branchApi.reducerPath]: branchApi.reducer,
        [departmentApi.reducerPath]: branchApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(companyApi.middleware)
            .concat(departmentApi.middleware)
            .concat(branchApi.middleware),
});

export default store;
