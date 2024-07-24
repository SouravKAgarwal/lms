"use client";

import Heading from "../@utils/Heading";
import Header from "../@components/Header";
import Footer from "../@components/Footer";
import CoursePage from "../@components/course/CoursePage";
import { useState } from "react";

const Page = () => {
  const [activeItem, setActiveItem] = useState(1);

  return (
    <div>
      <Heading
        title="Courses"
        description="Platform for learning new technologies and programming."
        keywords="Programming,mern,dmbs,machine,learning"
      />
      <Header activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="min-h-screen mt-24">
        <CoursePage />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
