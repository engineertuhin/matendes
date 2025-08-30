import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/utility/baseQuery";

export const dynamicSelectApi = createApi({
    reducerPath: "dynamic-select",
    baseQuery: baseQuery,
    tagTypes: ["dynamic-select"],
    endpoints: (builder) => ({
        dynamicSelectSearch: builder.query({
            query: ({ data }) => ({
                url: data.url,
                method: "GET",
                params: data.search ? { search: data.search } : undefined, // send as query parameter
            }),
            providesTags: ["dynamic-select"],
        }),
    }),
});

export const { useDynamicSelectSearchQuery } = dynamicSelectApi;
