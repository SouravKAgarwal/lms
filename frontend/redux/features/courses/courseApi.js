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
} = courseApi;
