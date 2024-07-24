import { useGetCourseContentQuery } from "@/redux/features/courses/courseApi";
import React, { useState } from "react";
import Loading from "../Loading";
import Heading from "@/app/@utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import CourseContentList from "./CourseContentList";
import { useSearchParams } from "next/navigation";

const CourseContent = ({ id, user }) => {
  const {
    data: contentData,
    isLoading,
    refetch,
  } = useGetCourseContentQuery(id, { refetchOnMountOrArgChange: true });
  const data = contentData?.course?.courseData;

  const [activeVideo, setActiveVideo] = useState(0);
  const [activeItem, setActiveItem] = useState(1);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Heading
            title={data[activeVideo].title}
            description=""
            keywords={data[activeVideo].tags}
          />
          <Header activeItem={activeItem} setActiveItem={setActiveItem} />
          <div className="w-full grid md:grid-cols-10">
            <div className="col-span-7">
              <CourseContentMedia
                data={data}
                id={id}
                activeVideo={activeVideo}
                user={user}
                setActiveVideo={setActiveVideo}
                refetch={refetch}
              />
            </div>
            <div className="hidden md:block md:col-span-3">
              <CourseContentList
                data={data}
                setActiveVideo={setActiveVideo}
                activeVideo={activeVideo}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContent;
