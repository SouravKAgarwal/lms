"use client";

import Heading from "./@utils/Heading";
import Header from "./@components/Header";
import Hero from "./@components/Hero";
import Courses from "./@components/course/Courses";
import { useEffect, useState } from "react";
import Reviews from "./@components/course/Reviews";
import FAQ from "./@components/FAQ";
import Footer from "./@components/Footer";

const Page = () => {
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    const storedActiveItem = localStorage.getItem("activeItem");
    if (storedActiveItem !== null) {
      setActiveItem(parseInt(storedActiveItem, 10));
    }
  }, []);

  return (
    <div>
      <Heading
        title="E-Learning"
        description="Platform for learning new technologies and programming."
        keywords="Programming,mern,dmbs,machine,learning"
      />
      <Header activeItem={activeItem} setActiveItem={setActiveItem} />
      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
