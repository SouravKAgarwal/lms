"use client";

import { useEffect, useState } from "react";
import CourseInfo from "./CourseInfo";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useEditCourseMutation,
  useGetCoursesQuery,
} from "../../../../redux/features/courses/courseApi";
import { toast } from "sonner";
import { redirect, useParams } from "next/navigation";

const EditCourse = () => {
  const { id } = useParams();
  const { data } = useGetCoursesQuery();

  const [editCourse, { isLoading, isSuccess, error }] = useEditCourseMutation();

  const editCourseData = data && data.courses.find((i) => i._id === id);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course updated successfully!");
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
    category: "",
    estimatedPrice: "",
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

  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        price: editCourseData.price,
        category: editCourseData.category,
        estimatedPrice: editCourseData.estimatedPrice,
        level: editCourseData.level,
        tags: editCourseData.tags,
        demoUrl: editCourseData.demoUrl,
        thumbnail: editCourseData.thumbnail.url,
      });
      setBenefits(editCourseData.benefits);
      setPrerequisities(editCourseData.prerequisites);
      setCourseContentData(editCourseData.courseData);
    }
  }, [editCourseData]);

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
      price: courseInfo.price,
      category: courseInfo.category,
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
      await editCourse({ id: id, data: courseData });
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
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed -z-1 top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
