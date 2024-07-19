import { apiSlice } from "../api/apiSlices";
import { userLogin, userRegistration, userLogout } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.token,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activationCode, token }) => ({
        url: "verify",
        method: "POST",
        body: {
          activationCode,
          token,
        },
      }),
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLogin({
              token: result.data.token,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    socialAuth: builder.mutation({
      query: ({ name, email, avatar }) => ({
        url: "auth/social",
        method: "POST",
        body: {
          email,
          name,
          avatar,
        },
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLogin({
              token: result.data.token,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logout: builder.query({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch }) {
        try {
          dispatch(userLogout());
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginUserMutation,
  useSocialAuthMutation,
  useLogoutQuery,
} = authApi;
