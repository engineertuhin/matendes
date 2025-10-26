import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/utility/baseQuery";

export const damageApi = createApi({
  reducerPath: "Damage",
  baseQuery,
  tagTypes: ["Damage"],
  endpoints: (builder) => ({
    fetchDamages: builder.query({
      query: () => "inventory/damages",
      providesTags: ["Damage"],
    }),

    createDamage: builder.mutation({
      query: (data) => ({
        url: "inventory/damages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Damage"],
    }),

    updateDamage: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `inventory/damages/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Damage"],
    }),

    deleteDamage: builder.mutation({
      query: (id) => ({
        url: `inventory/damages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Damage"],
    }),
  }),
});

export const {
  useFetchDamagesQuery,
  useCreateDamageMutation,
  useUpdateDamageMutation,
  useDeleteDamageMutation,
} = damageApi;