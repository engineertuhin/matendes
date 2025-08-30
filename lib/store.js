import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/domains/auth/model/authSlice";
import { authApi } from "@/domains/auth/services/authApi";
import { companyApi } from "@/domains/company/services/companyApi";
import { branchApi } from "@/domains/branch/services/branchApi";
import { departmentApi } from "@/domains/department/services/departmentApi";
import { jobPositionApi } from "@/domains/job-position/services/jobPositionApi";
import { dynamicSelectApi } from "@/domains/dynamic-select/services/dynamicSelectApi";
import { employApi } from "@/domains/employ/services/employApi";
import employReducer from "@/domains/employ/model/employSlice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        employ: employReducer,
        [authApi.reducerPath]: authApi.reducer,
        [companyApi.reducerPath]: companyApi.reducer,
        [branchApi.reducerPath]: branchApi.reducer,
        [jobPositionApi.reducerPath]: jobPositionApi.reducer,
        [departmentApi.reducerPath]: departmentApi.reducer,
        [dynamicSelectApi.reducerPath]: dynamicSelectApi.reducer,
        [employApi.reducerPath]: employApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(companyApi.middleware)
            .concat(departmentApi.middleware)
            .concat(jobPositionApi.middleware)
            .concat(dynamicSelectApi.middleware)
            .concat(employApi.middleware)
            .concat(branchApi.middleware),
});

export default store;
