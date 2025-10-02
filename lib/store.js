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
import { documentTypeApi } from "@/domains/document/services/documentTypeApi";
import { projectApi } from "@/domains/project/services/projectApi";
import { documentApi } from "@/domains/document/services/documentApi";
import { profileApi } from "@/domains/profile/services/profileApi";
import { clientApi } from "@/domains/client/services/clientApi";
import profileReducer from "@/domains/profile/model/profileSlice";
import { manualAttendanceApi } from "@/domains/manual-attendance/services/manualAttendanceApi";

const store = configureStore({
    reducer: {
        auth: authReducer,
        employ: employReducer,
        attendance: attendanceReducer,
        profileData: profileReducer,

        [authApi.reducerPath]: authApi.reducer,
        [companyApi.reducerPath]: companyApi.reducer,
        [roleApi.reducerPath]: roleApi.reducer,
        [branchApi.reducerPath]: branchApi.reducer,
        [departmentApi.reducerPath]: departmentApi.reducer,
        [jobPositionApi.reducerPath]: jobPositionApi.reducer,
        [dynamicSelectApi.reducerPath]: dynamicSelectApi.reducer,
        [employApi.reducerPath]: employApi.reducer,
        [salaryApi.reducerPath]: salaryApi.reducer,
        [attendanceApi.reducerPath]: attendanceApi.reducer, // keep only once
        [documentTypeApi.reducerPath]: documentTypeApi.reducer,
        [documentApi.reducerPath]: documentApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [manualAttendanceApi.reducerPath]: manualAttendanceApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [clientApi.reducerPath]: clientApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(companyApi.middleware)
            .concat(roleApi.middleware)
            .concat(departmentApi.middleware)
            .concat(projectApi.middleware)
            .concat(jobPositionApi.middleware)
            .concat(dynamicSelectApi.middleware)
            .concat(employApi.middleware)
            .concat(branchApi.middleware)
            .concat(salaryApi.middleware)
            .concat(attendanceApi.middleware) // keep only once
            .concat(manualAttendanceApi.middleware)
            .concat(documentTypeApi.middleware)
            .concat(documentApi.middleware)
            .concat(clientApi.middleware) // keep only once
            .concat(profileApi.middleware),
});

export default store;