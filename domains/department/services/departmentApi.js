import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/utility/baseQuery";
export const departmentApi = createApi({
    reducerPath: "department",
    baseQuery: baseQuery,
    tagTypes: ["department"],
    endpoints: (builder) => ({
        departmentCreate: builder.mutation({
            query: (credentials) => ({
                url: "organization/branches",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["department"],
        }),
        departmentUpdate: builder.mutation({
            query: ({ id, credentials }) => ({
                url: `organization/branches/${id}`,
                method: "PUT",
                body: credentials,
            }),
            invalidatesTags: ["department"],
        }),
        departmentDelete: builder.mutation({
            query: ({ id }) => ({
                url: `organization/branches/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["department"],
        }),
        departmentFetch: builder.query({
            query: () => "organization/branches",
            providesTags: ["department"],
        }),
        departmentSearch: builder.query({
            query: ({ search }) => ({
                url: "organization/departments",
                method: "GET",
                params: search ? { search } : undefined, // send as query parameter
            }),
            providesTags: ["department"],
        }),
    }),
});

export const {
    useDepartmentCreateMutation,
    useDepartmentUpdateMutation,
    useDepartmentDeleteMutation,
    useDepartmentFetchQuery,
    useDepartmentSearchQuery,
} = departmentApi;
