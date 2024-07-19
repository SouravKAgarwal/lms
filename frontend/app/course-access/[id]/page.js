"use client";

import Loading from "@/app/@components/Loading";
import CourseContent from "@/app/@components/course/CourseContent";
import { useLoadUserQuery } from "@/redux/features/api/apiSlices";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Page = ({ params }) => {
  const id = params.id;
  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find((item) => item === id);
      if (!isPurchased) {
        redirect("/");
      }
    }
    if (error) {
      redirect("/");
    }
  }, [data, error]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <CourseContent id={id} />
        </div>
      )}
    </>
  );
};

export default Page;
