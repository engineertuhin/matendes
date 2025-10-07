import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/utility/baseQuery";

export const categoryApi = createApi({
  reducerPath: "ToolCategory",
  baseQuery,
  tagTypes: ["ToolCategory"],
  endpoints: (builder) => ({
    fetchCategories: builder.query({
      query: () => "tool-categories",
      providesTags: ["ToolCategory"],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: "tool-categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ToolCategory"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `tool-categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ToolCategory"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `tool-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ToolCategory"],
    }),
  }),
});

export const {
  useFetchCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
