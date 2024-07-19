import { Input } from "@headlessui/react";
import CoursePlayer from "./CoursePlayer";
import Ratings from "../../../@utils/Ratings";
import Loading from "../../Loading";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const CoursePreview = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
  isLoading,
  isEdit,
}) => {
  const discount =
    ((courseData.estimatedPrice - courseData.price) /
      courseData.estimatedPrice) *
    100;
  const discountPercentage = discount.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-[80%] m-auto py-5 mb-5">
          <div className="w-full relative">
            <div className="w-full mt-10">
              <CoursePlayer
                videoUrl={courseData?.demoUrl}
                title={courseData?.title}
              />
            </div>
            <div className="flex items-center">
              <h1 className="pt-5 text-[25px]">
                {courseData.price === 0 ? "FREE" : "$" + courseData.price}
              </h1>
              <h5 className="pl-3 text-[20px] mt-5 line-through opacity-80">
                ${courseData.estimatedPrice}
              </h5>
              <h4 className="pl-5 pt-5 text-[22px]">
                {discountPercentage}% off
              </h4>
            </div>

            <div className="flex items-center">
              <button className="w-full md:w-[150px] mt-5 py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[crimson] outline-none cursor-not-allowed">
                Buy Now ${courseData.price}
              </button>
            </div>

            <div className="flex items-center">
              <Input
                type="text"
                placeholder="Discount Code..."
                className="mt-6 block w-[60%] rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
              />
              <button className="w-full md:w-[150px] ml-3 mt-6 py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-500 outline-none">
                Apply
              </button>
            </div>
            <p className="pt-3 font-Poppins text-sm">
              &#x2022;Source Code included
            </p>
            <p className="pt-1 font-Poppins text-sm">
              &#x2022;Full lifetime access
            </p>
            <p className="pt-1 font-Poppins text-sm">
              &#x2022;Cerificate of completion
            </p>
            <p className="pt-1 font-Poppins text-sm">&#x2022;Premium Support</p>
          </div>
          <div className="w-full">
            <div className="w-full md:pr-5 mt-4">
              <h1 className="font-Poppins font-[600] text-[25px]">
                {courseData.name}
              </h1>
              <div className="flex items-center justify-between pt-3">
                <div className="flex items-center">
                  <Ratings rating={0} />
                  <h5>0 Reviews</h5>
                </div>
                <h5>0 Students</h5>
              </div>
              <h1 className="text-[20px] font-Poppins mt-4 font-[600]">
                What will you learn from this course?
              </h1>
            </div>
            {courseData.benefits.map((benefit, index) => (
              <div className="w-full flex md:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline size={20} />
                </div>
                <p className="pl-2">{benefit.title}</p>
              </div>
            ))}
            <h1 className="text-[20px] font-Poppins mt-4 font-[600]">
              What are the prerequisites for this course?
            </h1>
            {courseData.prerequisites.map((item, index) => (
              <div className="w-full flex md:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline size={20} />
                </div>
                <p className="pl-2">{item.title}</p>
              </div>
            ))}
            <div className="w-full">
              <h1 className="text-[20px] font-Poppins mt-4 font-[600]">
                Course Details
              </h1>
              <p className="mt-5 whitespace-pre-line w-full overflow-hidden">
                {courseData.description}
              </p>
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
            <button
              type="submit"
              className="w-full md:w-[150px] mt-5 py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-[#37a39a] focus:outline-none"
              onClick={() => prevButton()}
            >
              Prev
            </button>
            <button
              type="submit"
              className="w-full md:w-[150px] mt-5 py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-[#37a39a] focus:outline-none"
              onClick={() => createCourse()}
            >
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CoursePreview;
