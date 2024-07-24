import Loading from "../Loading";
import CourseCard from "./CourseCard";
import { useGetUserCoursesQuery } from "@/redux/features/courses/courseApi";
import { useGetLayoutQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CoursePage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("title");
  const { data, isLoading } = useGetUserCoursesQuery();
  const { data: categoryData } = useGetLayoutQuery("Categories");

  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category === "All") {
      setCourses(data?.courses);
    } else {
      setCourses(data?.courses.filter((item) => item.category === category));
    }
    if (search) {
      if (category === "All") {
        setCourses(
          data?.courses.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )
        );
      } else {
        setCourses(
          data?.courses.filter(
            (item) =>
              item.name.toLowerCase().includes(search.toLowerCase()) &&
              item.category === category
          )
        );
      }
    }
  }, [category, data, search]);

  const categories = categoryData && categoryData.layout.categories;
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-[90%] md:w-[80%] m-auto">
          <div className="w-full flex items-center flex-wrap mt-4">
            <div
              className={`h-[35px] ${
                category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
              } m-3 px-3 rounded-[30px] flex items-center text-white justify-center font-Poppins cursor-pointer`}
              onClick={() => setCategory("All")}
            >
              All
            </div>
            {categories &&
              categories.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    category === item.title ? "bg-[crimson]" : "bg-[#5050cb]"
                  } m-3 px-3 py-1.5 rounded-[30px] flex items-center text-white justify-center font-Josefin cursor-pointer`}
                  onClick={() => setCategory(item.title)}
                >
                  {item.title}
                </div>
              ))}
          </div>
          {courses && courses.length === 0 && (
            <p className="text-sm/6 font-medium justify-center flex items-center min-h-[70vh]">
              {search
                ? "No courses found"
                : "No courses found in this category."}
            </p>
          )}
          <div className="mt-10 grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-[35px] mb-12 border-0">
            {courses &&
              courses.map((item, i) => <CourseCard item={item} key={i} />)}
          </div>
        </div>
      )}
    </>
  );
};

export default CoursePage;
