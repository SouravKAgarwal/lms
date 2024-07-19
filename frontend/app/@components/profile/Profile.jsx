"use client";

import { useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogoutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";

const Profile = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [userLogout, setUserLogout] = useState(false);
  const {} = useLogoutQuery(undefined, {
    skip: !userLogout ? true : false,
  });

  const logoutHandler = async () => {
    await signOut();
    setUserLogout(true);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-16 md:w-[310px] h-[450px] bg-white dark:bg-slate-900 bg-opacity-90 border border-[#0000001d] dark:border-[#ffffff1d] rounded-md shadow-sm my-20 sticky ${
          scroll ? "top-28" : "top-8"
        } -left-8`}
      >
        <SidebarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-24">
          <ProfileInfo user={user} avatar={avatar} />
        </div>
      )}
      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-24">
          <ChangePassword />
        </div>
      )}
    </div>
  );
};

export default Profile;
