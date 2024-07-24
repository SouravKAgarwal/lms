"use client";

import CourseDetailsPage from "@/app/@components/course/CourseDetailsPage";

const Page = ({ params }) => {
  return (
    <div>
      <CourseDetailsPage id={params.id} />
    </div>
  );
};

export default Page;
