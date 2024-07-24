import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import CoursePlayer from "../admin/course/CoursePlayer";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input, Textarea } from "@headlessui/react";
import { toast } from "sonner";
import {
  useAddAnswerMutation,
  useAddQuestionMutation,
  useAddReviewMutation,
  useAddReviewReplyMutation,
  useGetCourseContentQuery,
} from "@/redux/features/courses/courseApi";
import moment from "moment";
import { FiMessageCircle } from "react-icons/fi";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "@/app/@utils/Ratings";
import socketIO from "socket.io-client";
import { IoMdSend } from "react-icons/io";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}) => {
  const { data: courseData, refetch: courseRefetch } = useGetCourseContentQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );
  const [addQuestion, { isSuccess, error, isLoading: questionCreateLoading }] =
    useAddQuestionMutation();
  const [
    addAnswer,
    {
      isSuccess: addAnswerSuccess,
      error: addAnswerError,
      isLoading: answerCreateLoading,
    },
  ] = useAddAnswerMutation();
  const [
    addReview,
    { isSuccess: reviewSuccess, error: reviewError, isLoading: reviewLoading },
  ] = useAddReviewMutation();

  const [
    addReviewReply,
    {
      isSuccess: commentSuccess,
      error: commentError,
      isLoading: commentLoading,
    },
  ] = useAddReviewReplyMutation();

  const course = courseData?.course;

  const [activeBar, setActiveBar] = useState(0);
  const [rating, setRating] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [review, setReview] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [comment, setComment] = useState("");
  const [reviewReply, setReviewReply] = useState(false);

  const reviewExists =
    course && course?.reviews?.find((item) => item.user._id === user._id);

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Review cannot be empty!");
    } else {
      addQuestion({ question, courseId: id, contentId: data[activeVideo]._id });
    }
  };

  const handleAnswer = () => {
    addAnswer({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId,
    });
  };

  const handleReview = () => {
    if (review.length === 0) {
      toast.error("Question cannot be empty!");
    } else {
      addReview({ id, review, rating });
    }
  };

  const handleComment = () => {
    addReviewReply({ comment, courseId: id, reviewId });
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      socketId.emit("notification", {
        userId: user._id,
        title: "New Question",
        message: `You have a new question in ${data[activeVideo].title}`,
      });
      toast.success("Question added successfully!");
    }
    if (addAnswerSuccess) {
      setAnswer("");
      refetch();
      if (user.role !== "admin") {
        socketId.emit("notification", {
          userId: user._id,
          title: "New Question Reply",
          message: `Question replied for ${data[activeVideo].title}`,
        });
      }
      toast.success("Replied successfully!");
    }
    if (reviewSuccess) {
      setReview("");
      setRating("");
      refetch();
      socketId.emit("notification", {
        userId: user._id,
        title: "New Review Received",
        message: `${user.name} has given a review on ${course.name}`,
      });
      toast.success("Review added successfully!");
    }
    if (commentSuccess) {
      setComment("");
      setReviewId("");
      refetch();
      toast.success("Replied successfully!");
    }
    if (error) {
      toast.error(error.data.message);
    }
    if (reviewError) {
      toast.error(reviewError.data.message);
    }
    if (addAnswerError) {
      toast.error(addAnswerError.data.message);
    }
    if (commentError) {
      toast.error(commentError.data.message);
    }
  }, [
    isSuccess,
    error,
    addAnswerSuccess,
    addAnswerError,
    reviewError,
    reviewSuccess,
    commentSuccess,
    commentError,
  ]);

  return (
    <div className="w-[95%] md:w-[86%] py-4 m-auto">
      <CoursePlayer videoUrl={data[activeVideo].videoUrl} />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`flex items-center justify-center w-[150px] mt-3 py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 cursor-pointer focus:outline-none ${
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
          className={`flex items-center justify-center w-[150px] mt-3 py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 cursor-pointer focus:outline-none ${
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
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner mt-4">
        {["Overview", "Resources", "Discussions", "Reviews"].map(
          (title, index) => (
            <h5
              key={index}
              className={`cursor-pointer font-medium ${
                activeBar === index && "text-red-500"
              }`}
              onClick={() => setActiveBar(index)}
            >
              {title}
            </h5>
          )
        )}
      </div>
      {activeBar === 0 && (
        <p className="whitespace-pre-line my-3 mb-10 font-Josefin">
          {data[activeVideo].description}
        </p>
      )}
      {activeBar === 1 && (
        <div className="mt-4">
          {data[activeVideo].links.map((item, index) => (
            <div className="mb-10" key={index}>
              <h2 className="md:inline-block font-medium">
                {item.title && item.title + " :"}
              </h2>
              <Link
                className="inline-block text-[#4395c4] md:pl-2"
                href={item.url}
              >
                {item.url}
              </Link>
            </div>
          ))}
        </div>
      )}

      {activeBar === 2 && (
        <>
          <div className="flex w-full space-x-4 mt-4 mb-10">
            <Image
              src={user.avatar ? user.avatar.url : "/profile.png"}
              className="w-[50px] h-[50px] rounded-full bg-black dark:bg-white"
              alt={user.name}
              width={1000}
              height={1000}
            />
            <div className="w-full flex relative">
              <Input
                className="block w-full rounded-full border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none"
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Write your question..."
              />
              <button
                type="submit"
                className="absolute right-0 bottom-0 py-3 px-3 rounded-r-full bg-indigo-600 text-white"
                onClick={handleQuestion}
                disabled={question === "" || questionCreateLoading}
              >
                <IoMdSend size={26} />
              </button>
            </div>
          </div>
          <div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswer={handleAnswer}
              user={user}
              questionId={questionId}
              setQuestionId={setQuestionId}
              isLoading={answerCreateLoading}
            />
          </div>
        </>
      )}
      {activeBar === 3 && (
        <div className="w-full mt-4">
          <>
            {!reviewExists && user.role !== "admin" && (
              <>
                <div className="w-full flex">
                  <Image
                    src={user.avatar ? user.avatar.url : "/profile.png"}
                    className="w-[50px] h-[50px] rounded-full bg-black dark:bg-white"
                    alt={user.name}
                    width={1000}
                    height={1000}
                  />
                  <div className="w-full">
                    <h5 className="pl-3 font-[500]">
                      Give a rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="w-full flex ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={20}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={20}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <Textarea
                      className="block w-full resize-none rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      rows={5}
                      id="review"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="Write your comment..."
                    />
                  </div>
                </div>
                <div className="w-full flex items-center justify-end mb-10">
                  <button
                    type="submit"
                    className={`w-full md:w-[150px] mt-5 py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 focus:outline-none ${
                      reviewLoading && "cursor-no-drop"
                    }`}
                    onClick={reviewLoading ? () => {} : handleReview}
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
            <div className="w-full">
              {course?.reviews &&
                [...course?.reviews].reverse().map((item, index) => (
                  <div className="w-full my-5" key={index}>
                    <div className="w-full flex">
                      <Image
                        src={
                          item.user.avatar
                            ? item.user.avatar.url
                            : "/profile.png"
                        }
                        className="w-[50px] h-[50px] rounded-full bg-black dark:bg-white"
                        alt={user.name}
                        width={1000}
                        height={1000}
                      />
                      <div className="ml-2">
                        <h1 className="font-Poppins text-[14px] font-medium">
                          {item.user.name}
                        </h1>
                        <Ratings rating={item.rating} />
                        <p className="text-sm mt-2">{item.comment}</p>
                        <small className="text-[#00000082] dark:text-[#ffffff83]">
                          {moment(item.createdAt).fromNow()}
                        </small>
                      </div>
                    </div>
                    {user.role === "admin" && (
                      <div className="w-full flex mt-2">
                        <span
                          className="pl-14 flex text-[#00000082] dark:text-[#ffffff83] cursor-pointer mr-2"
                          onClick={() => {
                            setReviewReply(!reviewReply);
                            setReviewId(item._id);
                          }}
                        >
                          <FiMessageCircle
                            size={20}
                            className="cursor-pointer text-[#00000083] dark:text-[#ffffff83]"
                          />
                          <span className="pl-1 mt-[-4px] cursor-pointer text-[#00000083] dark:text-[#ffffff83]">
                            Reply
                          </span>
                        </span>
                      </div>
                    )}
                    {reviewReply && item._id === reviewId && (
                      <>
                        <div className="w-full flex relative mt-4">
                          <Input
                            className="ml-12 mt-2 block w-[95%] border-b dark:border-white/50 bg-white/5 px-3 py-1.5 text-sm/6 text-black dark:text-white focus:outline-none"
                            type="text"
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Reply..."
                          />
                          <button
                            type="submit"
                            className="absolute right-0 bottom-0 py-2 px-2 rounded bg-indigo-600 text-white"
                            onClick={handleComment}
                            disabled={comment === "" || commentLoading}
                          >
                            <IoMdSend size={20} />
                          </button>
                        </div>
                        {item.commentReplies.map((i, index) => (
                          <div
                            className="w-full flex md:ml-12 my-5"
                            key={index}
                          >
                            <Image
                              src={
                                i.user.avatar
                                  ? i.user.avatar.url
                                  : "/profile.png"
                              }
                              className="w-[50px] h-[50px] rounded-full bg-black dark:bg-white"
                              alt={i.user.name}
                              width={1000}
                              height={1000}
                            />
                            <div className="pl-2">
                              <div className="flex items-center gap-2">
                                <h5 className="font-Poppins font-medium">
                                  {i.user.name}
                                </h5>
                                {i.user.role === "admin" && (
                                  <VscVerifiedFilled
                                    className="text-blue-400"
                                    size={20}
                                  />
                                )}
                              </div>
                              <p>{i.comment}</p>
                              <small className="text-[#000000d1] dark:text-[#ffffff83]">
                                {moment(i.createdAt).fromNow()}
                              </small>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                ))}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswer,
  questionId,
  setQuestionId,
  isLoading,
}) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item, index) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            answer={answer}
            setAnswer={setAnswer}
            questionId={questionId}
            setQuestionId={setQuestionId}
            handleAnswer={handleAnswer}
            isLoading={isLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  questionId,
  setQuestionId,
  item,
  answer,
  setAnswer,
  handleAnswer,
  isLoading,
}) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            <Image
              src={item.user.avatar ? item.user.avatar.url : "/profile.png"}
              className="w-[50px] h-[50px] rounded-full bg-black dark:bg-white"
              alt={item.user.name}
              width={1000}
              height={1000}
            />
          </div>
          <div className="pl-3">
            <h5 className="font-Poppins text-sm font-medium">
              {item.user.name}
            </h5>
            <p className="text-sm">{item.question}</p>
            <small className="text-[#00000082] dark:text-[#ffffff83]">
              {moment(item.createdAt).fromNow()}
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="pl-16 flex text-[#00000082] dark:text-[#ffffff83] cursor-pointer mr-2"
            onClick={() => {
              setReplyActive(!replyActive);
              setQuestionId(item._id);
            }}
          >
            <FiMessageCircle
              size={20}
              className="cursor-pointer text-[#00000083] dark:text-[#ffffff83]"
            />
            <span className="pl-1 mt-[-4px] cursor-pointer text-[#00000083] dark:text-[#ffffff83]">
              {item.questionReplies.length}
            </span>
          </span>
        </div>
        {replyActive && item._id === questionId && (
          <>
            <>
              <div className="w-full flex relative">
                <Input
                  className="ml-12 mt-4 block w-[95%] rounded border-b dark:border-white/50 bg-white/5 px-3 py-1.5 text-sm/6 text-black dark:text-white focus:outline-none"
                  type="text"
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Reply..."
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-0 py-2 px-2 rounded-r bg-indigo-600 text-white"
                  onClick={handleAnswer}
                  disabled={answer === "" || isLoading}
                >
                  <IoMdSend size={20} />
                </button>
              </div>
            </>
            {item.questionReplies.map((item, index) => (
              <div className="w-full flex md:ml-12 my-5" key={index}>
                <div>
                  <Image
                    src={
                      item.user.avatar ? item.user.avatar.url : "/profile.png"
                    }
                    className="w-[50px] h-[50px] rounded-full bg-black dark:bg-white"
                    alt={item.user.name}
                    width={1000}
                    height={1000}
                  />
                </div>
                <div className="pl-3">
                  <div className="flex items-center gap-2">
                    <h5 className="font-Poppins text-sm font-medium">
                      {item.user.name}
                    </h5>
                    {item.user.role === "admin" && (
                      <VscVerifiedFilled className="text-blue-400" size={20} />
                    )}
                  </div>
                  <p className="text-sm mt-2">{item.answer}</p>
                  <small className="text-[#00000082] dark:text-[#ffffff83]">
                    {moment(item.createdAt).fromNow()}
                  </small>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
