import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/utility/baseQuery";

export const bankApi = createApi({
  reducerPath: "Bank",
  baseQuery,
  tagTypes: ["Bank"],
  endpoints: (builder) => ({
    fetchBanks: builder.query({
      query: () => "bank/banks",
      providesTags: ["Bank"],
    }),

    createBank: builder.mutation({
      query: (data) => ({
        url: "bank/banks",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bank"],
    }),

    updateBank: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `bank/banks/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Bank"],
    }),

    deleteBank: builder.mutation({
      query: (id) => ({
        url: `bank/banks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bank"],
    }),
  }),
});

export const {
  useFetchBanksQuery,
  useCreateBankMutation,
  useUpdateBankMutation,
  useDeleteBankMutation,
} = bankApi;
