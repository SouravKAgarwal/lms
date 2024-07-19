import { useEffect, useState } from "react";
import { useGetUserCoursesQuery } from "../../../redux/features/courses/courseApi";
import CourseCard from "./CourseCard";

const Courses = () => {
  const { data, isLoading } = useGetUserCoursesQuery();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <div>
      <div className="w-[90%] md:w-[80%] m-auto py-10">
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white md:leading-[60px] text-black font-[700] tracking-tight">
          Expand Your Career <span className="text-gradient">Opportunity</span>
          <br />
          Opportunity With Our Courses
        </h1>
        <div className="mt-10 grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-[35px] mb-12 border-0">
          {courses &&
            courses.map((item, i) => <CourseCard item={item} key={i} />)}
        </div>
      </div>
    </div>
  );
};

export default Courses;
