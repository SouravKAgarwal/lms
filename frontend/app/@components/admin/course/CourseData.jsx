import { Field, Input, Label } from "@headlessui/react";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "sonner";

const CourseData = ({
  active,
  setActive,
  benefits,
  setBenefits,
  prerequisities,
  setPrerequisities,
}) => {
  const handleBenefitChange = (index, value) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisitiesChange = (index, value) => {
    const updatedPrerequisities = [...prerequisities];
    updatedPrerequisities[index].title = value;
    setPrerequisities(updatedPrerequisities);
  };

  const handleAddPrerequisities = () => {
    setPrerequisities([...prerequisities, { title: "" }]);
  };

  const handleDeletePrerequisities = (index) => {
    if (index !== 0) {
      const updatedPrerequisities = [...prerequisities];
      updatedPrerequisities.splice(index, 1);
      setPrerequisities(updatedPrerequisities);
    }
  };

  const handleDeleteBenefit = (index) => {
    if (index !== 0) {
      const updatedBenefits = [...benefits];
      updatedBenefits.splice(index, 1);
      setBenefits(updatedBenefits);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1].title !== "" &&
      benefits[benefits.length - 1].title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill all the fields!");
    }
  };

  return (
    <div className="w-[80%] m-auto block mt-24">
      <div>
        <Field>
          <Label className="text-sm/6 font-medium text-black dark:text-white">
            What are the benefits for student in this course?
          </Label>
          {benefits.map((benefit, index) => (
            <div className="w-full flex items-center gap-2" key={index}>
              <Input
                className="mt-2 block w-full rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
                type="text"
                key={index}
                id={`benefit ${index}`}
                name="benefit"
                placeholder="You will be able to ...."
                value={benefit.title}
                onChange={(e) => handleBenefitChange(index, e.target.value)}
                required
              />
              <AiOutlineDelete
                className="w-6 h-6 cursor-pointer"
                onClick={() => handleDeleteBenefit(index)}
              />
            </div>
          ))}
          <PlusCircleIcon
            className="my-[10px] text-black/80 dark:text-white/50 cursor-pointer w-8 h-8"
            onClick={handleAddBenefits}
          />
        </Field>
        <Field>
          <Label className="text-sm/6 font-medium text-black dark:text-white">
            What are the prerequisities for student in this course?
          </Label>
          {prerequisities.map((prerequisit, index) => (
            <div className="w-full flex items-center gap-2" key={index}>
              <Input
                className="mt-2 block w-full rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
                type="text"
                key={index}
                id={`prerequisite ${index}`}
                name="prerequisit"
                placeholder="You will be able to ...."
                value={prerequisit.title}
                onChange={(e) =>
                  handlePrerequisitiesChange(index, e.target.value)
                }
                required
              />
              <AiOutlineDelete
                className="w-6 h-6 cursor-pointer"
                onClick={() => handleDeletePrerequisities(index)}
              />
            </div>
          ))}
          <PlusCircleIcon
            className="my-[10px] text-black/80 dark:text-white/50 cursor-pointer w-8 h-8"
            onClick={handleAddPrerequisities}
          />
        </Field>
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
          onClick={() => handleOptions()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseData;
