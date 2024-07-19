import { DataGrid } from "@mui/x-data-grid";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { Box, Button } from "@mui/material";
import {
  useDeleteCourseMutation,
  useGetCoursesQuery,
} from "../../../../redux/features/courses/courseApi";
import Loading from "../../Loading";
import moment from "moment";
import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import Link from "next/link";

const AllCourses = () => {
  const { isLoading, data, refetch } = useGetCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation();
  const { theme } = useTheme();

  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");

  const handleDelete = () => {
    deleteCourse(courseId);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      toast.success("Course deleted successfully!");
      setOpen(false);
      refetch();
    }
  }, [isSuccess, error]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 0.8 },
    { field: "ratings", headerName: "Ratings", flex: 0.2 },
    { field: "purchased", headerName: "Purchased", flex: 0.2 },
    { field: "created_at", headerName: "Created At", flex: 0.4 },
    { field: "updated_at", headerName: "Last Updated", flex: 0.4 },
    {
      field: " ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params) => (
        <Link href={`/admin/edit-course/${params.row.id}`}>
          <AiFillEdit className="dark:text-white text-black mt-4" size={20} />
        </Link>
      ),
    },
    {
      field: "  ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => {
              setOpen(!open);
              setCourseId(params.row.id);
            }}
          >
            <AiOutlineDelete className="dark:text-white text-black" size={20} />
          </Button>
        </>
      ),
    },
  ];

  const rows = [];

  {
    data &&
      data.courses.forEach((item) => {
        rows.push({
          id: item._id,
          title: item.name,
          purchased: item.purchased,
          ratings: item.ratings,
          created_at: moment(item.createdAt).fromNow(),
          updated_at: moment(item.updatedAt).fromNow(),
        });
      });
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loading />
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .MuiSvgIcon-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30 !important"
                    : "1px solid #ccc !important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-iconSeparator": {
                display: "none",
              },
              "& .css-yrdy0g-MuiDataGrid-columnHeaderRow": {
                backgroundColor:
                  theme === "dark"
                    ? "#3e4396 !important"
                    : "#A4A9FC !important",
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1f2a40" : "#f2f0f0",
              },
              "& .columnSeparator--resizable": {
                border: "none",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? "#b7ebde !important" : "#000 !important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "#fff !important",
              },
            }}
          >
            <DataGrid
              columns={columns}
              rows={rows}
              disableColumnMenu
              disableColumnSorting
            />
          </Box>
          {open && (
            <div className="fixed inset-0 z-40 bg-black bg-opacity-70" />
          )}
          {open && (
            <Dialog open={open} onClose={() => setOpen(!open)}>
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <DialogPanel className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-gray-800 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-200"
                    onClick={() => setOpen(!open)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                  <h5 className="text-lg font-bold font-Josefin mb-6 text-black dark:text-white">
                    Delete Course
                  </h5>
                  <h1 className="font-Poppins">
                    Are you sure you want to delete this course?
                  </h1>
                  <div className="flex w-full items-center justify-between my-4 gap-4">
                    <button
                      type="submit"
                      className="mt-5 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#57c7a3] focus:outline-none"
                      onClick={() => setOpen(!open)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="mt-5 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#d63f3f] focus:outline-none"
                      onClick={() => handleDelete()}
                    >
                      Delete
                    </button>
                  </div>
                </DialogPanel>
              </div>
            </Dialog>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
