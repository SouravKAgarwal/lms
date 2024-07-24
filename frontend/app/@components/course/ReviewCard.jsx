import Ratings from "@/app/@utils/Ratings";
import Image from "next/image";

const ReviewCard = ({ review }) => {
  return (
    <div className="w-full h-max dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner">
      <div className="flex w-full">
        <Image
          src={review.avatar}
          width={2000}
          height={2000}
          className="w-[50px] h-[50px] rounded-full object-cover"
          alt={review.name}
          priority
        />
        <div className="md:flex justify-between w-full hidden">
          <div className="pl-4">
            <h5 className="text-xl">{review.name}</h5>
            <h6 className="text-sm">{review.profession}</h6>
          </div>
          <Ratings rating={review.rating} />
        </div>
        <div className="flex flex-col justify-between w-full md:hidden">
          <div className="pl-4">
            <h5 className="text-xl">{review.name}</h5>
            <h6 className="text-sm">{review.profession}</h6>
          </div>
          <Ratings rating={review.rating} />
        </div>
      </div>
      <p className="pt-2 px-2 font-Poppins text-gray-500 dark:text-gray-300 text-[14px]">
        {review.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
