"use client";

import Protected from "../@hooks/useProtected";
import Heading from "../@utils/Heading";
import Profile from "../@components/profile/Profile";
import { useSelector } from "react-redux";
import Header from "../@components/Header";
import { useState } from "react";

const Page = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeItem, setActiveItem] = useState(5);

  return (
    <div>
      <Protected>
        <Heading
          title={`${user.name}- Profile`}
          description="Platform for learning new technologies and programming."
          keywords="Programming,mern,dmbs,machine,learning"
        />
        <Header activeItem={activeItem} setActiveItem={setActiveItem} />
        <Profile user={user} />
      </Protected>
    </div>
  );
};

export default Page;
