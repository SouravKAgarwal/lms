import { useEffect, useState } from "react";
import {
  useEditLayoutMutation,
  useGetLayoutQuery,
} from "../../../../redux/features/layout/layoutApi";
import { Input, Textarea } from "@headlessui/react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "sonner";

const EditFaq = () => {
  const { data, refetch } = useGetLayoutQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });

  const [faq, setFaq] = useState([]);

  const [editLayout, { isSuccess, error, isLoading }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setFaq(data?.layout?.faq);
    }
  }, [data]);

  const toggleQuestion = (id) => {
    setFaq((prevFaq) =>
      prevFaq.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleQuestionChange = (id, value) => {
    setFaq((prevFaq) =>
      prevFaq.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChange = (id, value) => {
    setFaq((prevFaq) =>
      prevFaq.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const handleNewFaq = () => {
    setFaq([...faq, { question: "", answer: "" }]);
  };

  const areFaqUnchanged = (originalFaq, newFaq) => {
    return JSON.stringify(originalFaq) === JSON.stringify(newFaq);
  };

  const isFaqEmpty = (faq) => {
    return faq.some((q) => q.question === "" || q.answer === "");
  };

  const handleSubmit = async () => {
    if (!(areFaqUnchanged(data?.layout?.faq, faq) || isFaqEmpty(faq)))
      await editLayout({ type: "FAQ", faq });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }

    if (isSuccess) {
      toast.success("FAQ updated!");
      refetch();
    }
  }, [isSuccess, error]);
  return (
    <div className="w-[90%] md:w-[80%] m-auto mt-[120px]">
      <h1 className="block text-xl md:text-3xl font-Poppins font-[500] pb-4">
        Frequently Asked Questions
      </h1>
      <div className="mb-10">
        <dl className="space-y-8">
          {faq.map((q) => (
            <div
              key={q._id}
              className={`${
                q._id !== faq[0]._id && "border-t"
              } border-gray-200 pt-6`}
            >
              <dt className="text-lg">
                <button
                  className="flex items-start w-full justify-between text-left focus:outline-none dark:text-white text-black"
                  onClick={() => toggleQuestion(q._id)}
                >
                  <Input
                    className="block w-full bg-transparent border-none text-black dark:text-white focus:outline-none"
                    value={q.question}
                    onChange={(e) =>
                      handleQuestionChange(q._id, e.target.value)
                    }
                    placeholder="Add your question...."
                    autoComplete="off"
                  />
                  <span className="ml-6 flex shrink-0">
                    {q.active ? (
                      <HiMinus className="h-6 w-6" />
                    ) : (
                      <HiPlus className="w-6 h-6" />
                    )}
                  </span>
                </button>
              </dt>
              {q.active && (
                <dd className="mt-2 pr-12">
                  <Textarea
                    className="block w-full resize-none bg-transparent border-none text-black dark:text-white focus:outline-none"
                    value={q.answer}
                    onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                    placeholder="Add your answer...."
                    rows={3}
                    autoComplete="off"
                  />
                  <span className="mt-6 flex shrink-0">
                    <AiOutlineDelete
                      className="dark:text-white text-black text-base cursor-pointer"
                      onClick={() => {
                        setFaq((prevFaq) =>
                          prevFaq.filter((item) => item._id !== q._id)
                        );
                      }}
                    />
                  </span>
                </dd>
              )}
            </div>
          ))}
        </dl>
        <IoMdAddCircleOutline
          className="text-black dark:text-white cursor-pointer text-[25px] mt-6"
          onClick={handleNewFaq}
        />
        <div className="w-full flex justify-end">
          <button
            type="submit"
            className={`w-full md:w-[150px] mt-5 py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white focus:outline-none ${
              areFaqUnchanged(data?.layout?.faq, faq) || isFaqEmpty(faq)
                ? "cursor-no-drop bg-[#cccccc34]"
                : "cursor-pointer bg-[#42d383]"
            }`}
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFaq;
