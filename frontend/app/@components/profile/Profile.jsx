"use client";

import { useEffect, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogoutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../course/CourseCard";
import { useGetUserCoursesQuery } from "@/redux/features/courses/courseApi";

const Profile = ({ user }) => {
  const { data } = useGetUserCoursesQuery();
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [courses, setCourses] = useState();
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

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((item) => data.courses.find((course) => course._id === item))
        .filter((course) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data]);

  return (
    <div className="w-[85%] flex mx-auto mt-16">
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

      {active === 3 && (
        <div className="w-full pl-7 px-2 md:px-10 md:pl-8 mt-24">
          <h1 className="block text-xl md:text-3xl font-Poppins text-center font-[500] pb-2">
            Enrolled Courses
          </h1>
          {courses && courses.length === 0 && (
            <p className="text-sm/6 font-medium justify-center flex items-center min-h-[50vh]">
              No courses enrolled.
            </p>
          )}
          <div className="mt-10 grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-[35px] mb-12 border-0">
            {courses &&
              courses.map((item, i) => (
                <CourseCard item={item} key={i} isProfile={true} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
