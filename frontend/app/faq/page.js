"use client";

import Heading from "../@utils/Heading";
import Header from "../@components/Header";
import Footer from "../@components/Footer";
import { useState } from "react";
import FAQ from "../@components/FAQ";

const Page = () => {
  const [activeItem, setActiveItem] = useState(3);

  return (
    <div>
      <Heading
        title="Courses"
        description="Platform for learning new technologies and programming."
        keywords="Programming,mern,dmbs,machine,learning"
      />
      <Header activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="min-h-screen mt-24">
        <FAQ />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
