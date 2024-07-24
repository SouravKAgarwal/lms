import { useActivationMutation } from "../../../redux/features/auth/authApi";
import { Dialog, DialogPanel, Input } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Loading from "../Loading";

const Verification = ({ verification, setVerification, setLogin }) => {
  const { token } = useSelector((state) => state.auth);
  const [activation, { isSuccess, error, isLoading }] = useActivationMutation();
  const [invalidError, setInvalidError] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully");
      setVerification(false);
      setLogin(true);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error;
        toast.error(errorData.data.message);
        setInvalidError(true);
      } else {
        console.log("An error occured", error);
      }
    }
  }, [isSuccess, error]);

  const [verifyNumber, setVerifyNumber] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    console.log(verificationNumber);
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      activationCode: verificationNumber,
      token,
    });
  };

  const handleInputChange = (index, value) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  return (
    <Dialog open={verification} onClose={() => setVerification(false)}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPanel className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-800 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-200"
              onClick={() => setVerification(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 font-Josefin text-black dark:text-white">
              Verify your account
            </h2>
            <div className="w-full flex items-center justify-center mt-4">
              <div className="w-20 h-20 rounded-full bg-[#497df2] flex items-center justify-center">
                <VscWorkspaceTrusted size={40} />
              </div>
            </div>
            <div className="flex items-center justify-around mt-10">
              {Object.keys(verifyNumber).map((key, index) => (
                <Input
                  key={key}
                  ref={inputRefs[index]}
                  type="number"
                  className={`${
                    invalidError
                      ? "shake border-red-500"
                      : "dark:border-white border-[#0000004a]"
                  } w-16 h-16 bg-transparent border rounded-lg flex items-center text-black dark:text-white justify-center text-base font-Poppins outline-none text-center`}
                  placeholder=""
                  maxLength={1}
                  value={verifyNumber[key]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  autoComplete="off"
                />
              ))}
            </div>
            <button
              type="submit"
              onClick={verificationHandler}
              className="mt-5 w-full py-2.5 px-5 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#497df2] hover:bg-[#497dd6] focus:outline-none"
            >
              Verify OTP
            </button>
          </DialogPanel>
        </div>
      )}
    </Dialog>
  );
};

export default Verification;
