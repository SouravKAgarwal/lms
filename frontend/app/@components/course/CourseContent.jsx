import { useGetCourseContentQuery } from "@/redux/features/courses/courseApi";
import React, { useState } from "react";
import Loading from "../Loading";
import Heading from "@/app/@utils/Heading";
import CourseContentMedia from "./CourseContentMedia";

const CourseContent = ({ id }) => {
  const { data: contentData, isLoading } = useGetCourseContentQuery(id);
  const data = contentData?.content;
  const [activeVideo, setActiveVideo] = useState(0);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full grid md:grid-cols-10">
          <Heading
            title={data[activeVideo].title}
            description=""
            keywords={data[activeVideo].tags}
          />
          <div className="col-span-7">
            <CourseContentMedia
              data={data}
              id={id}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CourseContent;
