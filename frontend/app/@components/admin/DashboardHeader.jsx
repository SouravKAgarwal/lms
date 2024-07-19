"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import ThemesSwitcher from "../ThemesSwitcher";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useState } from "react";

const DashboardHeader = ({ open }) => {
  const [isOpen, setIsOpen] = useState(open !== undefined ? open : false);
  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="w-full flex items-center justify-end fixed p-6 top-5 right-0">
      <ThemesSwitcher />
      <div className="relative cursor-pointer m-2" onClick={handleOpen}>
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-5 h-5 text-sm flex items-center justify-center text-white">
          3
        </span>
      </div>
      <Dialog
        open={isOpen}
        onClose={handleOpen}
        className="w-[330px] h-[50vh] dark:bg-[#111C43] bg-white shadow-xl absolute top-24 right-4 z-10 rounded overflow-auto"
      >
        <DialogPanel>
          <h5 className="text-center text-base font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>
          <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f] p-4">
            <div className="w-full flex items-center justify-between">
              <p className="text-sm text-black dark:text-white">
                New Question Recieved
              </p>
              <p className="text-sm text-black dark:text-white cursor-pointer">
                Mark as read
              </p>
            </div>
            <p className="py-4 text-black font-Josefin dark:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              fuga non, incidunt tempora....
            </p>
            <p className="text-xs text-black dark:text-white">5 days ago</p>
          </div>
          <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f] p-4">
            <div className="w-full flex items-center justify-between">
              <p className="text-sm text-black dark:text-white">
                New Question Recieved
              </p>
              <p className="text-sm text-black dark:text-white cursor-pointer">
                Mark as read
              </p>
            </div>
            <p className="py-4 text-black font-Josefin dark:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              fuga non, incidunt tempora....
            </p>
            <p className="text-xs text-black dark:text-white">5 days ago</p>
          </div>
          <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f] p-4">
            <div className="w-full flex items-center justify-between">
              <p className="text-sm text-black dark:text-white">
                New Question Recieved
              </p>
              <p className="text-sm text-black dark:text-white cursor-pointer">
                Mark as read
              </p>
            </div>
            <p className="py-4 text-black font-Josefin dark:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              fuga non, incidunt tempora....
            </p>
            <p className="text-xs text-black dark:text-white">5 days ago</p>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default DashboardHeader;
