import { Field, Input, Label } from "@headlessui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import {
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
} from "../../../redux/features/user/userApi";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlices";
import Loading from "../Loading";
import { toast } from "sonner";

const ProfileInfo = ({ user, avatar }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error, isLoading }] =
    useUpdateAvatarMutation();
  const [
    updateProfile,
    { isSuccess: editSuccess, error: editError, isLoading: editLoading },
  ] = useUpdateProfileMutation();
  const [loadUser, setLoadUser] = useState(false);
  const { refetch } = useLoadUserQuery(undefined, {
    skip: !loadUser ? false : true,
  });

  const imageHandler = (e) => {
    const file = new FileReader();

    file.onload = () => {
      const avatar = file.result;
      if (file.readyState === 2) {
        updateAvatar(avatar);
      }
    };
    file.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || editSuccess) {
      setLoadUser(true);
      refetch();
      setLoadUser(false);
      toast.success("Profile updated successfully");
    }
    if (error || editError) {
      toast.error(error.data.message || editError.data.message);
    }
  }, [isSuccess, editError, editSuccess, error, refetch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== "") {
      await updateProfile({ name });
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="relative">
          <Image
            className="w-32 h-32 cursor-pointer border-2 border-[#37a39a] rounded-full"
            src={
              user.avatar || avatar ? user.avatar.url || avatar : "/profile.png"
            }
            width={120}
            height={120}
            alt={user.name}
            priority
          />
          <input
            id="avatar"
            type="file"
            className="hidden"
            onChange={imageHandler}
            accept="image/png, image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-8 h-8 bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1 text-white" />
            </div>
          </label>
        </div>
      </div>
      <div className="w-full mt-6 pl-6 md:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="md:w-[60%] w-full m-auto block pb-4">
            <Field className="w-[100%]">
              <Label className="block pb-1">Full Name</Label>
              <Input
                className={`mt-2 block w-full rounded-lg border bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25`}
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                autoComplete="off"
              />
            </Field>
            <Field className="w-[100%] pt-4">
              <Label className="block pb-1">Email Address</Label>
              <Input
                className={`mt-2 block w-full rounded-lg border bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25`}
                value={user.email}
                readOnly
              />
            </Field>
            <button
              type="submit"
              className="mt-5 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      {isLoading && <Loading />}
      {editLoading && <Loading />}
    </>
  );
};

export default ProfileInfo;
