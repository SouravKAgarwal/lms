import { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Dialog, DialogPanel } from "@headlessui/react";
import ThemesSwitcher from "../ThemesSwitcher";
import socketIO from "socket.io-client";
import moment from "moment";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationApi";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const DashboardHeader = ({ open }) => {
  const { data, isLoading, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();

  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(open !== undefined ? open : false);

  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/dbewz5dh0/video/upload/v1721581854/mixkit-software-interface-start-2574_w2qmbm.wav"
    )
  );

  useEffect(() => {
    audio.addEventListener("ended", () => audio.load());
    return () => {
      audio.removeEventListener("ended", () => audio.load());
    };
  }, [audio]);

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item) => item.status === "unread")
      );
    }
  }, [data]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      playSound();
    });
  }, [refetch]);

  const playSound = () => {
    if (audio.readyState >= 2) {
      audio.play();
    } else {
      audio.load();
      audio.play();
    }
  };

  const handleOpen = () => setIsOpen(!isOpen);

  const handleNotifyStatusChange = async (id) => {
    await updateNotificationStatus(id);
    refetch();
  };

  return (
    <div className="w-full flex items-center justify-end fixed p-6 top-0 z-50 right-0 bg-white dark:bg-[#0D131F]">
      <ThemesSwitcher />
      <div className="relative cursor-pointer m-2" onClick={handleOpen}>
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-5 h-5 text-sm flex items-center justify-center text-white">
          {notifications.length}
        </span>
      </div>
      <Dialog
        open={isOpen}
        onClose={handleOpen}
        className="w-[330px] h-[50vh] dark:bg-[#111C43] bg-white shadow-xl absolute top-24 right-4 z-50 rounded overflow-auto"
      >
        <DialogPanel>
          <h5 className="text-center text-base font-Poppins text-black dark:text-white p-3">
            Notifications ({notifications.length} Unread)
          </h5>
          {isLoading ? (
            <p className="h-[30vh] w-full justify-center items-center flex">
              Loading notifications...
            </p>
          ) : notifications.length === 0 ? (
            <p className="h-[30vh] w-full justify-center items-center flex">
              No new notifications.
            </p>
          ) : (
            notifications.map((item, index) => (
              <div
                className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f] p-4"
                key={index}
              >
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm text-black dark:text-white">
                    {item.title}
                  </p>
                  <p
                    className="text-xs text-black dark:text-white cursor-pointer"
                    onClick={() => handleNotifyStatusChange(item._id)}
                  >
                    Mark as read
                  </p>
                </div>
                <p className="py-4 text-black font-Josefin dark:text-white">
                  {item.message}
                </p>
                <p className="text-xs text-black dark:text-white">
                  {moment(item.createdAt).fromNow()}
                </p>
              </div>
            ))
          )}
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default DashboardHeader;
