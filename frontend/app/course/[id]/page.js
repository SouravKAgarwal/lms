"use client";

import CourseDetailsPage from "../../@components/course/CourseDetailsPage";

const Page = ({ params }) => {
  return (
    <div>
      <CourseDetailsPage id={params.id} />
    </div>
  );
};

export default Page;
