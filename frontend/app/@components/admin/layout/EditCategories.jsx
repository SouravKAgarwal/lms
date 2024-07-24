import { useEffect, useState } from "react";
import {
  useEditLayoutMutation,
  useGetLayoutQuery,
} from "../../../../redux/features/layout/layoutApi";
import Loading from "../../Loading";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "sonner";
import { Input } from "@headlessui/react";

const EditCategories = () => {
  const { data, refetch } = useGetLayoutQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });

  const [categories, setCategories] = useState([]);

  const [editLayout, { isSuccess, error, isLoading }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories || []);
    }
  }, [data]);

  const handleCategoryChange = (id, value) => {
    setCategories((prevCategory) =>
      prevCategory.map((q) => (q._id === id ? { ...q, title: value } : q))
    );
  };

  const handleNewCategory = () => {
    if (
      categories.length === 0 ||
      categories[categories.length - 1].title !== ""
    ) {
      setCategories((prevCategory) => [...prevCategory, { title: "" }]);
    } else {
      toast.error("Categories cannot be empty!");
    }
  };

  const areCategoriesUnchanged = (originalCategory, newCategory) => {
    return JSON.stringify(originalCategory) === JSON.stringify(newCategory);
  };

  const isCategoryEmpty = (category) => {
    return category.some((q) => q.title === "");
  };

  const handleSubmit = async () => {
    if (
      !(
        areCategoriesUnchanged(data?.layout?.categories, categories) ||
        isCategoryEmpty(categories)
      )
    ) {
      await editLayout({ type: "Categories", categories });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }

    if (isSuccess) {
      toast.success("Categories updated!");
      refetch();
    }
  }, [isSuccess, error]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-[90%] md:w-[50%] m-auto mt-[120px] text-center">
          <h1 className="block text-xl md:text-3xl font-Poppins font-[500] pb-4">
            All Categories
          </h1>
          {categories.map((c, i) => (
            <div className="p-3" key={i}>
              <div className="flex items-center w-full justify-center">
                <Input
                  className="bg-transparent w-full border-none text-black dark:text-white focus:outline-none"
                  value={c.title}
                  onChange={(e) => handleCategoryChange(c._id, e.target.value)}
                  placeholder="Enter category title..."
                  autoComplete="off"
                />
                <AiOutlineDelete
                  className="dark:text-white text-black text-base cursor-pointer"
                  onClick={() => {
                    setCategories((prevCategory) =>
                      prevCategory.filter((item) => item._id !== c._id)
                    );
                  }}
                />
              </div>
            </div>
          ))}
          <div className="w-full flex justify-start">
            <IoMdAddCircleOutline
              className="text-black dark:text-white cursor-pointer text-[25px] mt-6"
              onClick={handleNewCategory}
            />
          </div>
          <button
            type="submit"
            className={`w-full md:w-[150px] mt-5 py-2 px-4 border border-transparent absolute bottom-12 right-12 rounded shadow-sm text-sm font-medium text-white focus:outline-none ${
              areCategoriesUnchanged(data?.layout?.categories, categories) ||
              isCategoryEmpty(categories)
                ? "cursor-no-drop bg-[#cccccc34]"
                : "cursor-pointer bg-[#42d383]"
            }`}
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      )}
    </>
  );
};

export default EditCategories;
