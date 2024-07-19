import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import Ratings from "../../@utils/Ratings";
import { useSelector } from "react-redux";
import moment from "moment";
import CoursePlayer from "../admin/course/CoursePlayer";
import CourseContentList from "./CourseContentList.jsx";
import Link from "next/link";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../@components/order/CheckoutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlices";

const CourseDetail = ({ data, clientSecret, stripePromise }) => {
  const { data: userData } = useLoadUserQuery(undefined, {});
  const { user } = userData;
  const [open, setOpen] = useState(false);

  const discount =
    ((data.estimatedPrice - data.price) / data.estimatedPrice) * 100;
  const discountPercentage = discount.toFixed(0);

  const isPurchased = user && user.courses.find((i) => i === data._id);

  const handleOrder = () => {
    setOpen(true);
  };

  return (
    <div>
      <div className="w-[90%] md:w-[80%] m-auto py-5">
        <div className="w-full flex flex-col-reverse md:flex-row">
          <div className="w-full md:w-[60%] md:pr-5">
            <h1 className="text-2xl font-Poppins font-[600]">{data.name}</h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data.ratings} />
                <h5>{data.reviews.length} Reviews</h5>
              </div>
              <h5>{data.purchased} Students enrolled</h5>
            </div>
            <h1 className="text-2xl font-Poppins font-[600] mt-8">
              What will you learn from this course?
            </h1>
            <div>
              {data.benefits.map((benefit, index) => (
                <div className="w-full flex md:items-center py-2" key={index}>
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline size={20} />
                  </div>
                  <p className="pl-2">{benefit.title}</p>
                </div>
              ))}
            </div>
            <h1 className="text-2xl font-Poppins font-[600] mt-8">
              What are the prerequisites for this course?
            </h1>
            <div>
              {data.prerequisites.map((item, index) => (
                <div className="w-full flex md:items-center py-2" key={index}>
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline size={20} />
                  </div>
                  <p className="pl-2">{item.title}</p>
                </div>
              ))}
            </div>
            <h1 className="text-2xl font-Poppins font-[600] mt-8">
              Course Overview
            </h1>
            <CourseContentList data={data?.courseData} isDemo={true} />
            <div className="w-full mt-8">
              <h1 className="text-2xl font-Poppins font-[600]">
                Course Details
              </h1>
              <p className="text-base mt-4 whitespace-pre-line w-full overflow-hidden">
                {data.description}
              </p>
            </div>
            <div className="w-full mt-8">
              <div className="md:flex items-center mb-4">
                <h1 className="text-xl font-Poppins font-[600]">
                  Course Ratings
                </h1>
                <div className="mb-2 md:mb-[unset]" />
                <h5 className="text-base ml-2 font-Poppins opacity-60">
                  (
                  {Number.isInteger(data.ratings)
                    ? data.ratings.toFixed(1)
                    : data.ratings.toFixed(2)}
                  )
                </h5>
              </div>
              {(data.reviews && [...data.reviews].reverse()).map((i, index) => (
                <div className="w-full pb-4" key={index}>
                  <div className="flex">
                    <div className="w-[50px] h-[50px]">
                      <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                        <h1 className="uppercase text-lg text-white">
                          {i.user.name.slice(0, 2)}
                        </h1>
                      </div>
                    </div>
                    <div className="hidden md:block pl-2">
                      <div className="flex items-center">
                        <h5 className="pr-2">{i.user.name}</h5>
                        <Ratings rating={i.rating} />
                      </div>
                      <p>{i.comment}</p>
                      <small className="text-[#000000d1] dark:text-[#ffffff83]">
                        {moment(i.createdAt).fromNow()}
                      </small>
                    </div>
                    <div className="pl-2 flex md:hidden items-center">
                      <h5 className="pr-2">{i.user.name}</h5>
                      <Ratings rating={i.rating} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-[40%] relative">
            <div className="w-full">
              <CoursePlayer videoUrl={data.demoUrl} title={data.name} />
              <div className="flex items-center mt-4">
                <h1 className="text-2xl">
                  {data.price === 0 ? "FREE" : "$" + data.price}
                </h1>
                <h5 className="pl-3 text-xl line-through opacity-80">
                  ${data.estimatedPrice}
                </h5>
                <h4 className="pl-5 text-rose-500">
                  {discountPercentage}% off
                </h4>
              </div>
              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    href={`/course-access/${data._id}`}
                    className="w-full flex items-center justify-center md:w-[150px] mt-3 py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[crimson] cursor-pointer focus:outline-none"
                  >
                    Enter to Course
                  </Link>
                ) : (
                  <div
                    className="w-full flex items-center justify-center md:w-[150px] mt-3 py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[crimson] cursor-pointer focus:outline-none"
                    onClick={handleOrder}
                  >
                    Buy Now ${data.price}
                  </div>
                )}
              </div>
              <p className="pt-5 font-Poppins font-medium text-base">
                &#x2022;Source Code included
              </p>
              <p className="pt-1 font-Poppins font-medium text-base">
                &#x2022;Full lifetime access
              </p>
              <p className="pt-1 font-Poppins font-medium text-base">
                &#x2022;Cerificate of completion
              </p>
              <p className="pt-1 font-Poppins font-medium text-base">
                &#x2022;Premium Support
              </p>
            </div>
          </div>
        </div>
      </div>
      <>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[450px] min-h-[400px] bg-white rounded-xl shadow p-3">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  className="text-black cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full">
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm setOpen={setOpen} data={data} />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetail;
