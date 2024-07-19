import {
  useEditLayoutMutation,
  useGetLayoutQuery,
} from "../../../../redux/features/layout/layoutApi";
import { Textarea } from "@headlessui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { toast } from "sonner";
import Loading from "../../Loading";

const EditHero = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const { data, refetch } = useGetLayoutQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, error, isLoading }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data.layout.banner.title);
      setSubTitle(data.layout.banner.subTitle);
      setImage(data.layout.banner.image.url);
    }
  }, [data]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    await editLayout({ type: "Banner", title, subTitle, image });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }

    if (isSuccess) {
      toast.success("Banner updated!");
      refetch();
    }
  }, [isSuccess, error]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mx-auto max-w-4xl mt-[118px]">
          <div className="w-full flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-2/5 lg:w-1/3 flex items-center justify-center px-4 lg:justify-end z-10 relative">
              <div className="absolute inset-0 hero-animation rounded-full w-72 h-72 -top-7 left-5 md:-top-16 md:left-0 lg:-top-12 lg:-left-3" />
              <img
                src={image}
                alt="banner"
                className="w-[80%] lg:w-full h-auto object-contain object-center"
              />
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <label
                htmlFor="imageUpload"
                className="absolute bottom-4 right-4 cursor-pointer bg-[#39c1f3] rounded-full p-2"
              >
                <AiOutlineCamera size={24} className="text-white" />
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className="w-full md:w-3/5 lg:w-2/3 p-4 mt-10 md:mt-0">
              <Textarea
                className="mt-2 block w-full bg-transparent resize-none text-black dark:text-white focus:outline-none text-4xl font-bold tracking-tight capitalize h-auto"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={3}
              />
              <Textarea
                className="mt-2 text-lg leading-8 bg-transparent text-gray-600 dark:text-gray-500 block w-full resize-none focus:outline-none"
                name="title"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                rows={4}
              />
              <div className="w-full relative mt-4 flex gap-x-6">
                <input
                  type="search"
                  placeholder="Search Courses..."
                  className="bg-transparent border dark:border-none font-Poppins dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-3 w-full h-full outline-none"
                />
                <div className="absolute flex items-center justify-center w-[50px] h-full cursor-pointer right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
                  <BiSearch className="text-white" size={24} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <Image
                  width={1000}
                  height={1000}
                  src="https://edmy-react.hibootstrap.com/images/banner/client-1.jpg"
                  className="w-10 h-10 rounded-full"
                  alt="people"
                  priority
                />
                <Image
                  width={1000}
                  height={1000}
                  src="https://edmy-react.hibootstrap.com/images/banner/client-2.jpg"
                  className="w-10 h-10 rounded-full ml-[-20px]"
                  alt="people"
                  priority
                />
                <Image
                  width={1000}
                  height={1000}
                  src="https://edmy-react.hibootstrap.com/images/banner/client-3.jpg"
                  className="w-10 h-10 rounded-full ml-[-20px]"
                  alt="people"
                  priority
                />
                <div className="font-Josefin dark:text-[#edfff4] text-[#000000b3] pl-3 text-base font-[600]">
                  500K+ People already trusted us.{" "}
                  <div className="dark:text-[#46e256] text-[crimson] hidden md:inline-flex">
                    View Courses
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-end mb-10">
            <button
              type="submit"
              className="w-full md:w-[150px] mt-5 py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-[#37a39a] focus:outline-none"
              onClick={() => handleSubmit()}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditHero;
