import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../utility/baseQuery";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login ",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
    // fetchUser: builder.query({
    //   query: () => "/v1/auth/me",
    // }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
