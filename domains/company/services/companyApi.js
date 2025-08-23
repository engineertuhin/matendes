import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/utility/baseQuery";
export const companyApi = createApi({
    reducerPath: "Company",
    baseQuery: baseQuery,
    tagTypes: ["Company"],
    endpoints: (builder) => ({
        companyCreate: builder.mutation({
            query: (credentials) => ({
                url: "companies",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["Company"],
        }),
        companyUpdate: builder.mutation({
            query: ({ id, credentials }) => ({
                url: `companies/${id}`,
                method: "PUT",
                body: credentials,
            }),
            invalidatesTags: ["Company"],
        }),
        companyDelete: builder.mutation({
            query: ({ id }) => ({
                url: `companies/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Company"],
        }),
        companyFetch: builder.query({
            query: () => "companies",
            providesTags: ["Company"],
        }),
        companySearch: builder.query({
            query: ({ search }) => ({
                url: "companies",
                method: "GET",
                params: search ? { search } : undefined, // send as query parameter
            }),
            providesTags: ["Company"], // optional caching
        }),
    }),
});

export const {
    useCompanyCreateMutation,
    useCompanyUpdateMutation,
    useCompanyDeleteMutation,
    useCompanyFetchQuery,
    useCompanySearchQuery,
} = companyApi;
