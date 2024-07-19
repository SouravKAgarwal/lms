import { apiSlice } from "../api/apiSlices";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "orders/all-orders",
        method: "GET",
        credentials: "include",
      }),
    }),
    getStripeKey: builder.query({
      query: () => ({
        url: "orders/payment/stripe-key",
        method: "GET",
        credentials: "include",
      }),
    }),
    orderPayment: builder.mutation({
      query: (amount) => ({
        url: "orders/payment",
        method: "POST",
        body: { amount },
        credentials: "include",
      }),
    }),
    createOrder: builder.mutation({
      query: ({ courseId, paymentInfo }) => ({
        url: "orders/create",
        method: "POST",
        body: { courseId, paymentInfo },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetStripeKeyQuery,
  useOrderPaymentMutation,
  useCreateOrderMutation,
} = orderApi;
