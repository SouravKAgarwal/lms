import { useGetLayoutQuery } from "../../redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Loading from "./Loading";
import { useRouter } from "next/navigation";
import { Input } from "@headlessui/react";

const Hero = () => {
  const { data, isLoading } = useGetLayoutQuery("Banner");
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mx-auto max-w-4xl py-16 md:py-24 mt-16">
          <div className="w-full flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-2/5 lg:w-1/3 flex items-center justify-center px-4 lg:justify-end z-10 relative">
              <div className="absolute inset-0 hero-animation rounded-full w-72 h-72 -top-7 left-5 md:-top-16 md:left-0 lg:-top-12 lg:-left-3" />
              <Image
                width={1000}
                height={1000}
                src={data?.layout.banner.image.url}
                alt="banner"
                className="w-[80%] lg:w-full h-auto object-contain object-center z-[9900000]"
                priority
              />
            </div>
            <div className="w-full md:w-3/5 lg:w-2/3 p-4 mt-10 md:mt-0">
              <h1 className="text-4xl font-bold tracking-tight capitalize">
                {data?.layout.banner.title}
              </h1>
              <p className="mt-6 text-base leading-8 text-gray-400 dark:text-gray-500">
                {data?.layout.banner.subTitle}
              </p>
              <div className="w-full relative mt-10 flex gap-x-6">
                <Input
                  type="search"
                  placeholder="Search Courses..."
                  className="bg-transparent border dark:border-none font-Poppins dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-3 w-full h-full outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoComplete="off"
                />
                <div
                  className="absolute flex items-center justify-center w-[50px] h-full cursor-pointer right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"
                  onClick={handleSearch}
                >
                  <BiSearch className="text-white" size={24} />
                </div>
              </div>
              <div className="flex items-center mt-8">
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
                <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] pl-3 text-base font-[600]">
                  500K+ People already trusted us.{" "}
                  <Link
                    href="/courses"
                    className="dark:text-[#46e256] text-[crimson] hidden md:inline-flex"
                  >
                    View Courses
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
