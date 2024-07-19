"use client";

import { useEffect, useState } from "react";
import CourseInfo from "./CourseInfo";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "../../../../redux/features/courses/courseApi";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const CreateCourse = () => {
  const [createCourse, { isLoading, isSuccess, error }] =
    useCreateCourseMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course created successfully!");
      redirect("/admin/courses");
    }
    if (error) {
      const errorMessage = error.data.message;
      toast.error(errorMessage);
    }
  }, [isSuccess, error]);

  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    category: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisities, setPrerequisities] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      videoLength: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  const handleSubmit = async () => {
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    const formattedPrerequisites = prerequisities.map((item) => ({
      title: item.title,
    }));
    const formattedCourseContentData = courseContentData.map((item) => ({
      videoUrl: item.videoUrl,
      title: item.title,
      description: item.description,
      videoSection: item.videoSection,
      videoLength: item.videoLength,
      links: item.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: item.suggestion,
    }));

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      category: courseInfo.category,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      level: courseInfo.level,
      tags: courseInfo.tags,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };

    setCourseData(data);
  };

  const handleCourseCreate = async () => {
    if (!isLoading) {
      await createCourse(courseData);
    }
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInfo
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            prerequisities={prerequisities}
            setBenefits={setBenefits}
            setPrerequisities={setPrerequisities}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleCourseSubmit={handleSubmit}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 3 && (
          <CoursePreview
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isLoading={isLoading}
            active={active}
            setActive={setActive}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed -z-1 top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
