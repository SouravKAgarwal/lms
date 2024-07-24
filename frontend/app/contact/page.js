"use client";

import Heading from "../@utils/Heading";
import Header from "../@components/Header";
import Footer from "../@components/Footer";
import { useState } from "react";
import Contact from "../@components/Contact";

const Page = () => {
  const [activeItem, setActiveItem] = useState();
  return (
    <div>
      <Heading
        title="Contact Us | E-Learning"
        description="Platform for learning new technologies and programming."
        keywords="Programming,mern,dmbs,machine,learning"
      />
      <Header activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="min-h-screen mt-24">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
