import { HiMinus, HiPlus } from "react-icons/hi";
import { useGetLayoutQuery } from "../../redux/features/layout/layoutApi";
import { useEffect, useState } from "react";

const FAQ = () => {
  const { data } = useGetLayoutQuery("FAQ");
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    data && setQuestions(data.layout.faq);
  }, [data]);

  const toggleQuestion = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="w-[90%] md:w-[80%] m-auto mt-[120px]">
      <h1 className="block text-xl text-center md:text-3xl font-Poppins font-[500] pb-4">
        Frequently Asked Questions
      </h1>
      <div className="mb-10">
        <dl className="space-y-8">
          {questions.map((q) => (
            <div
              key={q._id}
              className={`${
                q._id !== questions[0]._id && "border-t"
              } border-gray-200 pt-6`}
            >
              <dt className="text-lg">
                <button
                  className="flex items-start w-full justify-between text-left focus:outline-none dark:text-white text-black"
                  onClick={() => toggleQuestion(q._id)}
                >
                  <span className="font-Poppins text-black dark:text-white">
                    {q.question}
                  </span>
                  <span className="ml-6 flex shrink-0">
                    {activeQuestion === q._id ? (
                      <HiMinus className="h-6 w-6" />
                    ) : (
                      <HiPlus className="w-6 h-6" />
                    )}
                  </span>
                </button>
              </dt>
              {activeQuestion === q._id && (
                <dd className="mt-2 pr-12">
                  <p className="text-base font-Josefin text-black dark:text-white">
                    {q.answer}
                  </p>
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default FAQ;
