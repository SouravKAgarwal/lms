import Ratings from "../../@utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineUnorderedList } from "react-icons/ai";

const CourseCard = ({ item, isProfile }) => {
  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `/course-access/${item._id}`}
    >
      <div className="w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner">
        <Image
          src={item.thumbnail.url}
          width={1000}
          height={1000}
          className="rounded w-full object-contain"
          priority
          alt={item.name}
        />
        <h1 className="font-Poppins text-base text-black dark:text-white mt-4">
          {item.name}
        </h1>
        <div className="w-full flex items-center justify-between pt-2">
          <Ratings rating={item.ratings} />
          <h5
            className={`text-black dark:text-white ${
              isProfile && "hidden md:inline"
            }`}
          >
            {item.purchased} Students
          </h5>
        </div>
        <div className="w-full flex items-center justify-between py-3">
          <div className="flex">
            <h3 className="text-black dark:text-white">
              {item.price === 0 ? "FREE" : "$" + item.price}
            </h3>
            <h5 className="pl-3 text-sm line-through opacity-80 text-black dark:text-white">
              ${item.estimatedPrice}
            </h5>
          </div>
          <div className="flex items-center">
            <AiOutlineUnorderedList size={20} fill="#fff" />
            <h5 className="pl-2 text-black dark:text-white">
              {item.courseData.length} Lectures
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
