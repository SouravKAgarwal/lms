import { Field, Input, Label } from "@headlessui/react";
import { useEffect, useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useUpdatePasswordMutation } from "../../../redux/features/user/userApi";
import { toast } from "sonner";
import Loading from "../Loading";

const ChangePassword = () => {
  const [visibleOldPassword, setVisibleOldPassword] = useState(false);
  const [visibleNewPassword, setVisibleNewPassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updatePassword, { isSuccess, error, isLoading }] =
    useUpdatePasswordMutation();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      updatePassword({ oldPassword, newPassword });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  useEffect(() => {
    if (isSuccess) toast.success("Password changed successfully");

    if (error) {
      if ("data" in error) {
        const errorData = error;
        toast.error(errorData.data.message);
      } else {
        console.log("An error occured", error);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full flex items-center justify-center flex-col pl-7 px-2 md:px-5 md:pl-0">
      <h1 className="block text-xl md:text-3xl font-Poppins text-center font-[500] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          onSubmit={handlePasswordChange}
          className="flex flex-col items-center"
        >
          <div className="w-full max-w-md mt-3">
            <Field className="relative w-full mb-4">
              <Label className="text-sm/6 font-medium text-black dark:text-white">
                Old Password
              </Label>
              <Input
                className={`mt-2 block w-full rounded-lg border bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25`}
                type={visibleOldPassword ? "text" : "password"}
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter old password"
                autoComplete="off"
              />
              <div
                className={`absolute top-2/4 right-3 transform translate-y-1/3 cursor-pointer`}
                onClick={() => setVisibleOldPassword(!visibleOldPassword)}
              >
                {visibleOldPassword ? (
                  <VscEyeClosed className="text-gray-500" size={20} />
                ) : (
                  <VscEye className="text-gray-500" size={20} />
                )}
              </div>
            </Field>
            <Field className="relative w-full mb-4">
              <Label className="text-sm/6 font-medium text-black dark:text-white">
                New Password
              </Label>
              <Input
                className={`mt-2 block w-full rounded-lg border bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25`}
                type={visibleNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                autoComplete="off"
              />
              <div
                className={`absolute top-2/4 right-3 transform translate-y-1/3 cursor-pointer`}
                onClick={() => setVisibleNewPassword(!visibleNewPassword)}
              >
                {visibleNewPassword ? (
                  <VscEyeClosed className="text-gray-500" size={20} />
                ) : (
                  <VscEye className="text-gray-500" size={20} />
                )}
              </div>
            </Field>
            <Field className="relative w-full mb-4">
              <Label className="text-sm/6 font-medium text-black dark:text-white">
                Confirm Password
              </Label>
              <Input
                className={`mt-2 block w-full rounded-lg border bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25`}
                type={visibleConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter confirm password"
                autoComplete="off"
              />
              <div
                className={`absolute top-2/4 right-3 transform translate-y-1/3 cursor-pointer`}
                onClick={() =>
                  setVisibleConfirmPassword(!visibleConfirmPassword)
                }
              >
                {visibleConfirmPassword ? (
                  <VscEyeClosed className="text-gray-500" size={20} />
                ) : (
                  <VscEye className="text-gray-500" size={20} />
                )}
              </div>
            </Field>
          </div>
          <button
            type="submit"
            className="mt-5 w-full max-w-md py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          >
            Update
          </button>
        </form>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default ChangePassword;
