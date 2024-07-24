"use client";

import Heading from "../@utils/Heading";
import Header from "../@components/Header";
import Footer from "../@components/Footer";
import About from "../@components/About";
import { useState } from "react";

const Page = () => {
  const [activeItem, setActiveItem] = useState(2);

  return (
    <div>
      <Heading
        title="About Us"
        description="Platform for learning new technologies and programming."
        keywords="Programming,mern,dmbs,machine,learning"
      />
      <Header activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="min-h-screen mt-24">
        <About />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
