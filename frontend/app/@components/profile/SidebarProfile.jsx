import {
  AdjustmentsHorizontalIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineLogout } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

const SidebarProfile = ({ user, active, avatar, setActive, logoutHandler }) => {
  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "bg-gray-300 dark:bg-slate-800" : "bg-transparent"
        } `}
        onClick={() => setActive(1)}
      >
        <Image
          width={20}
          height={20}
          src={
            user.avatar || avatar ? user.avatar.url || avatar : "/profile.png"
          }
          className="w-5 h-5 md:w-8 md:h-8 cursor-pointer rounded-full"
          alt={user.name}
          priority
        />
        <h5 className="px-2 md:block hidden font-Josefin">My Account</h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "bg-gray-300 dark:bg-slate-800" : "bg-transparent"
        } `}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} />
        <h5 className="px-2 md:block hidden font-Josefin">Change Password</h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "bg-gray-300 dark:bg-slate-800" : "bg-transparent"
        } `}
        onClick={() => setActive(3)}
      >
        <BookOpenIcon className="w-5 h-5" />
        <h5 className="px-2 md:block hidden font-Josefin">Enrolled Courses</h5>
      </div>
      {user.role === "admin" && (
        <Link
          className={`w-full flex items-center px-3 py-4 cursor-pointer`}
          href="/admin"
        >
          <AdjustmentsHorizontalIcon className="w-5 h-5" />
          <h5 className="px-2 md:block hidden font-Josefin">Admin Dashboard</h5>
        </Link>
      )}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? "bg-gray-300 dark:bg-slate-800" : "bg-transparent"
        } `}
        onClick={() => {
          logoutHandler();
        }}
      >
        <AiOutlineLogout size={20} />
        <h5 className="px-2 md:block hidden font-Josefin">Logout</h5>
      </div>
    </div>
  );
};

export default SidebarProfile;
