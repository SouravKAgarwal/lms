import { apiSlice } from "../api/apiSlices";

export const courseApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "courses/create",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getCourses: builder.query({
      query: () => ({
        url: "courses/all-courses",
        method: "GET",
        credentials: "include",
      }),
    }),
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `courses/edit/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `courses/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getUserCourses: builder.query({
      query: () => ({
        url: `courses/all`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `courses/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getCourseContent: builder.query({
      query: (id) => ({
        url: `courses/content/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    addQuestion: builder.mutation({
      query: ({ question, courseId, contentId }) => ({
        url: `courses/question`,
        method: "PUT",
        body: {
          question,
          courseId,
          contentId,
        },
        credentials: "include",
      }),
    }),
    addAnswer: builder.mutation({
      query: ({ answer, courseId, contentId, questionId }) => ({
        url: `courses/answer`,
        method: "PUT",
        body: {
          answer,
          courseId,
          contentId,
          questionId,
        },
        credentials: "include",
      }),
    }),
    addReview: builder.mutation({
      query: ({ id, review, rating }) => ({
        url: `courses/review/${id}`,
        method: "PUT",
        body: {
          review,
          rating,
        },
        credentials: "include",
      }),
    }),
    addReviewReply: builder.mutation({
      query: ({ comment, courseId, reviewId }) => ({
        url: `courses/review/reply`,
        method: "PUT",
        body: {
          comment,
          courseId,
          reviewId,
        },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCoursesQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetUserCoursesQuery,
  useGetCourseDetailsQuery,
  useGetCourseContentQuery,
  useAddQuestionMutation,
  useAddAnswerMutation,
  useAddReviewMutation,
  useAddReviewReplyMutation,
} = courseApi;
