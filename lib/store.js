import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/domains/auth/model/authSlice";
import { authApi } from "@/domains/auth/services/authApi";
import { companyApi } from "@/domains/company/services/companyApi";
import { roleApi } from "@/domains/role-and-permission/role/services/roleApi";
import { branchApi } from "@/domains/branch/services/branchApi";
import { departmentApi } from "@/domains/department/services/departmentApi";
import { jobPositionApi } from "@/domains/job-position/services/jobPositionApi";
import { dynamicSelectApi } from "@/domains/dynamic-select/services/dynamicSelectApi";
import { employApi } from "@/domains/employ/services/employApi";
import { salaryApi } from "@/domains/salary/services/salaryApi";
import employReducer from "@/domains/employ/model/employSlice";
import { attendanceApi } from "@/domains/attendance/services/attendanceApi";
import attendanceReducer from "@/domains/attendance/model/attendanceSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        employ: employReducer,
        attendance: attendanceReducer,
        [authApi.reducerPath]: authApi.reducer,
        [attendanceApi.reducerPath]: attendanceApi.reducer,
        [companyApi.reducerPath]: companyApi.reducer,
        [roleApi.reducerPath]: roleApi.reducer,
        [branchApi.reducerPath]: branchApi.reducer,
        [jobPositionApi.reducerPath]: jobPositionApi.reducer,
        [departmentApi.reducerPath]: departmentApi.reducer,
        [dynamicSelectApi.reducerPath]: dynamicSelectApi.reducer,
        [employApi.reducerPath]: employApi.reducer,
        [salaryApi.reducerPath]: salaryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(attendanceApi.middleware)
            .concat(companyApi.middleware)
            .concat(roleApi.middleware)
            .concat(departmentApi.middleware)
            .concat(jobPositionApi.middleware)
            .concat(dynamicSelectApi.middleware)
            .concat(employApi.middleware)
            .concat(branchApi.middleware)
            .concat(salaryApi.middleware), 
});

export default store;
