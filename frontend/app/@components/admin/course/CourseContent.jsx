import { Field, Input, Label, Textarea } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { toast } from "sonner";

const CourseContent = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleCourseSubmit,
}) => {
  const [collapsed, setCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);

  const handleCollapseToggle = (index) => {
    const updatedCollapsed = [...collapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index, linkIndex) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const handleInputChange = (sectionIndex, field, value) => {
    const updatedData = [...courseContentData];
    updatedData[sectionIndex] = {
      ...updatedData[sectionIndex],
      [field]: value,
    };
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.videoLength === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields!");
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        videoLength: "",
        links: [{ title: "", url: "" }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].videoLength === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields!");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection + 1}`,
        videoLength: "",
        links: [{ title: "", url: "" }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].videoLength === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields!");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit} className="">
        {courseContentData.map((item, index) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <div key={index}>
              <div
                className={`w-full bg-[#cdc8c817] p-4 rounded ${
                  showSectionInput ? "mt-10" : "mb-0"
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className="w-full flex items-center mb-5">
                      <Input
                        className={`w-full py-1.5 bg-transparent px-3 text-black dark:text-white font-Poppins ${
                          item.videoSection === "Untitled Section"
                            ? "w-[135px]"
                            : "min-w-fit"
                        }`}
                        type="text"
                        autoComplete="off"
                        value={item.videoSection}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "videoSection",
                            e.target.value
                          )
                        }
                      />
                      <BsPencil className="cursor-pointer dark:text-white text-black" />
                    </div>
                  </>
                )}
                <div className="w-full flex items-center justify-between my-0">
                  <>
                    {item.title ? (
                      <p className="font-Josefin dark:text-white text-black px-4">
                        {index + 1}. {item.title}
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </>
                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`dark:text-white text-xl mx-2 text-black ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      className="dark:text-white text-black text-base"
                      style={{
                        transform: collapsed[index]
                          ? "rotate(0deg)"
                          : "rotate(180deg)",
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!collapsed[index] && (
                  <>
                    <Field className="my-3">
                      <Label className="text-sm/6 font-medium text-black dark:text-white">
                        Video Title
                      </Label>
                      <Input
                        className="mt-2 block w-full rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
                        type="text"
                        autoComplete="off"
                        name="title"
                        placeholder="Project Plan"
                        value={item.title}
                        onChange={(e) =>
                          handleInputChange(index, "title", e.target.value)
                        }
                      />
                    </Field>
                    <Field className="mb-3">
                      <Label className="text-sm/6 font-medium text-black dark:text-white">
                        Video URL
                      </Label>
                      <Input
                        className="mt-2 block w-full rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
                        type="text"
                        autoComplete="off"
                        name="videoUrl"
                        placeholder="https://www.video.com"
                        value={item.videoUrl}
                        onChange={(e) =>
                          handleInputChange(index, "videoUrl", e.target.value)
                        }
                      />
                    </Field>
                    <Field className="mb-3">
                      <Label className="text-sm/6 font-medium text-black dark:text-white">
                        Video Length
                      </Label>
                      <Input
                        className="mt-2 block w-full rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
                        type="number"
                        name="videoLength"
                        autoComplete="off"
                        placeholder="0"
                        value={item.videoLength}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "videoLength",
                            e.target.value
                          )
                        }
                      />
                    </Field>
                    <Field className="mb-3">
                      <Label className="text-sm/6 font-medium text-black dark:text-white">
                        Video Description
                      </Label>
                      <Textarea
                        className="mt-2 block w-full resize-none rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
                        rows={3}
                        autoComplete="off"
                        id="description"
                        value={item.description}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Video Description"
                      />
                    </Field>
                    {item.links.map((link, linkIndex) => (
                      <div className="mb-3 block" key={linkIndex}>
                        <div className="w-full flex items-center justify-between">
                          <label className="text-sm/6 font-medium text-black dark:text-white">
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            } text-black dark:text-white text-xl`}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex)
                            }
                          />
                        </div>
                        <Input
                          className="mt-2 block w-full rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
                          type="text"
                          autoComplete="off"
                          placeholder="Source Code ...."
                          value={link.title}
                          onChange={(e) =>
                            setCourseContentData((prevData) => [
                              ...prevData.slice(0, index),
                              {
                                ...prevData[index],
                                links: [
                                  ...prevData[index].links.slice(0, linkIndex),
                                  {
                                    ...prevData[index].links[linkIndex],
                                    title: e.target.value,
                                  },
                                  ...prevData[index].links.slice(linkIndex + 1),
                                ],
                              },
                              ...prevData.slice(index + 1),
                            ])
                          }
                        />
                        <Input
                          className="mt-2 block w-full rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
                          autoComplete="off"
                          type="text"
                          placeholder="Source URL ...."
                          value={link.url}
                          onChange={(e) =>
                            setCourseContentData((prevData) => [
                              ...prevData.slice(0, index),
                              {
                                ...prevData[index],
                                links: [
                                  ...prevData[index].links.slice(0, linkIndex),
                                  {
                                    ...prevData[index].links[linkIndex],
                                    url: e.target.value,
                                  },
                                  ...prevData[index].links.slice(linkIndex + 1),
                                ],
                              },
                              ...prevData.slice(index + 1),
                            ])
                          }
                        />
                      </div>
                    ))}
                    <div className="inline-block mb-4">
                      <p
                        className="flex items-center dark:text-white text-black cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className="mr-2" />
                        Add Link
                      </p>
                    </div>
                  </>
                )}
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className="flex items-center text-sm dark:text-white text-black cursor-pointer mt-4"
                      onClick={(e) => newContentHandler(item)}
                    >
                      <PlusCircleIcon className="mr-2 text-black/80 dark:text-white/50 cursor-pointer w-8 h-8" />
                      Add New Content
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div
          className="flex items-center dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <PlusCircleIcon className="mr-2 my-[10px] text-black/80 dark:text-white/50 cursor-pointer w-8 h-8" />
          Add New Section
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
      </form>
    </div>
  );
};

export default CourseContent;
