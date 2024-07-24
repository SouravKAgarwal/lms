import { useGetLayoutQuery } from "../../../../redux/features/layout/layoutApi";
import { Field, Input, Label, Textarea } from "@headlessui/react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const CourseInfo = ({ courseInfo, setCourseInfo, active, setActive }) => {
  const { data } = useGetLayoutQuery("Categories");

  const [dragging, setDragging] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories || []);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit}>
        <Field>
          <Label className="text-sm/6 font-medium text-black dark:text-white">
            Course Name
          </Label>
          <Input
            className="mt-2 block w-full rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
            type="text"
            id="name"
            value={courseInfo.name || ""}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            placeholder="Course Name"
            autoComplete="off"
            required
          />
        </Field>
        <Field className="mt-4">
          <Label className="text-sm/6 font-medium text-black dark:text-white">
            Course Description
          </Label>
          <Textarea
            className="mt-2 block w-full resize-none rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            rows={3}
            id="description"
            value={courseInfo.description || ""}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            placeholder="Course Description"
            autoComplete="off"
            required
          />
        </Field>
        <div className="w-full flex justify-between mt-4">
          <Field className="w-[45%]">
            <Label className="text-sm/6 font-medium text-black dark:text-white">
              Price
            </Label>
            <Input
              className="mt-2 block w-full rounded-lg  border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
              type="number"
              id="price"
              value={courseInfo.price || ""}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              placeholder="$ 0"
              autoComplete="off"
              required
            />
          </Field>
          <Field className="w-[45%]">
            <Label className="text-sm/6 font-medium text-black dark:text-white">
              Estimated Price
            </Label>
            <Input
              className="mt-2 block w-full rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
              type="number"
              id="estimatedPrice"
              value={courseInfo.estimatedPrice || ""}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              placeholder="$ 0"
              autoComplete="off"
              required
            />
          </Field>
        </div>
        <div className="w-full flex justify-between mt-4">
          <Field className="w-[45%]">
            <Label className="text-sm/6 font-medium text-black dark:text-white">
              Category
            </Label>
            <Listbox
              value={courseInfo.category || ""}
              onChange={(value) =>
                setCourseInfo({
                  ...courseInfo,
                  category: value,
                })
              }
            >
              <div className="relative mt-2">
                <ListboxButton className="relative w-full cursor-default rounded-lg border dark:border-white/50 bg-white/5 py-1.5 text-left dark:text-white text-gray-900 shadow-sm sm:text-sm sm:leading-6">
                  <span className="flex items-center ml-3 truncate">
                    {courseInfo.category || "Select a category"}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-400"
                    />
                  </span>
                </ListboxButton>

                <ListboxOptions
                  transition
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                  {categories?.map((c) => (
                    <ListboxOption
                      key={c._id}
                      value={c.title}
                      className="group relative cursor-default select-none py-2 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                    >
                      <div className="flex items-center">
                        <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                          {c.title}
                        </span>
                      </div>

                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                        <CheckIcon aria-hidden="true" className="h-5 w-5" />
                      </span>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </Field>
          <Field className="w-[45%]">
            <Label className="text-sm/6 font-medium text-black dark:text-white">
              Tags
            </Label>
            <Input
              className="mt-2 block w-full rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
              type="text"
              id="tags"
              value={courseInfo.tags || ""}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              placeholder="Course Tags"
              autoComplete="off"
              required
            />
          </Field>
        </div>
        <div className="w-full flex justify-between mt-4">
          <Field className="w-[45%]">
            <Label className="text-sm/6 font-medium text-black dark:text-white">
              Level
            </Label>
            <Input
              className="mt-2 block w-full rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
              type="text"
              id="level"
              value={courseInfo.level || ""}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              placeholder="Beginner/Intermediate/Advanced"
              autoComplete="off"
              required
            />
          </Field>
          <Field className="w-[45%]">
            <Label className="text-sm/6 font-medium text-black dark:text-white">
              Demo URL
            </Label>
            <Input
              className="mt-2 block w-full rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
              type="text"
              id="demoUrl"
              value={courseInfo.demoUrl || ""}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              placeholder="www.demoUrl.com"
              required
            />
          </Field>
        </div>
        <div className="w-full mt-8">
          <Field>
            <input
              className="hidden"
              type="file"
              id="file"
              onChange={handleFileImage}
              accept="image/*"
            />
            <label
              htmlFor="file"
              className={`w-full min-h-[10vh] rounded-lg bg-white/5 dark:border-white/50 p-3 border flex items-center justify-center ${
                dragging ? "bg-blue-300" : "bg-transparent"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {courseInfo.thumbnail ? (
                <img
                  src={courseInfo.thumbnail}
                  className="max-h-full w-full object-cover"
                  alt={courseInfo.name}
                />
              ) : (
                <span className="text-black/50 cursor-pointer dark:text-white/50">
                  Drag and drop your thumbnail here or click to upload
                </span>
              )}
            </label>
          </Field>
        </div>
        <div className="w-full flex items-center justify-end mb-10">
          <button
            type="submit"
            className="w-full md:w-[150px] mt-5 py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-[#37a39a] focus:outline-none"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseInfo;
