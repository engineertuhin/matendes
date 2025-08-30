import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/utility/baseQuery";
export const employApi = createApi({
    reducerPath: "Employ",
    baseQuery: baseQuery,
    tagTypes: ["Employ"],
    endpoints: (builder) => ({
        employCreate: builder.mutation({
            query: (credentials) => ({
                url: "hrm/employees",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["Employ"],
        }),
        employUpdate: builder.mutation({
            query: ({ id, credentials }) => ({
                url: `hrm/employees/${id}`,
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["Employ"],
        }),
        employDelete: builder.mutation({
            query: ({ id }) => ({
                url: `hrm/employees/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Employ"],
        }),
        employFetch: builder.query({
            query: () => "hrm/employees",
            providesTags: ["Employ"],
        }),
    }),
});

export const {
    useEmployCreateMutation,
    useEmployUpdateMutation,
    useEmployDeleteMutation,
    useEmployFetchQuery,
} = employApi;
