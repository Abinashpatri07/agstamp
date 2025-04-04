import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// Define a service using a base URL and expected endpoint
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL,credentials:"include" }),
  endpoints: (build) => ({
    userRegister: build.mutation<RegisterResponse,UserRegister>({
        query: (user) => ({
        url: "/api/v1/user/register",
        method: 'POST',
        body: user,
        }),
    }),
    UserLogin:build.mutation<RegisterResponse,UserLogin>({
      query: (user) => ({
      url: "/api/v1/user/login",
      method: 'POST',
      body: user,
      }),
    }),
    UserInfo:build.query<RegisterResponse,void>({
      query: () => "/api/v1/user/info"
    }),
  }),
})

export const { useUserRegisterMutation,useUserLoginMutation,useUserInfoQuery } = userApi;