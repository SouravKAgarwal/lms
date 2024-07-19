import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import CoursePlayer from "../admin/course/CoursePlayer";

const CourseContentMedia = ({ data, id, activeVideo, setActiveVideo }) => {
  return (
    <div className="w-[95%] md:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo].title}
        videoUrl={data[activeVideo].videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`w-full flex items-center justify-center md:w-[150px] mt-3 py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 cursor-pointer focus:outline-none ${
            activeVideo === 0 && "cursor-no-drop opacity-80"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>
        <div
          className={`w-full flex items-center justify-center md:w-[150px] mt-3 py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 cursor-pointer focus:outline-none ${
            data.length - 1 === activeVideo && "cursor-no-drop opacity-80"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-2xl font-[600]">{data[activeVideo].title}</h1>
    </div>
  );
};

export default CourseContentMedia;
