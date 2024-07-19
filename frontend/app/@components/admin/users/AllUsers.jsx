import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import { Box, Button } from "@mui/material";
import Loading from "../../Loading";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserRoleMutation,
} from "../../../../redux/features/user/userApi";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Field,
  Input,
  Label,
  Select,
} from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

const AllUsers = ({ isTeam }) => {
  const { isLoading, data, refetch, error } = useGetUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();

  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation();

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }
    if (updateError) {
      toast.error(updateError.data.message);
    }
    if (deleteError) {
      toast.error(deleteError.data.message);
    }
    if (isSuccess) {
      toast.success("User role updated!");
      setActive(false);
      refetch();
    }
    if (deleteSuccess) {
      toast.success("User deleted successfully!");
      setOpen(false);
      refetch();
    }
  }, [updateError, isSuccess, deleteError, deleteSuccess, error]);

  const { theme } = useTheme();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const handleSubmit = () => {
    updateUserRole({ email, role });
  };

  const handleDelete = () => {
    deleteUser(userId);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.3 },
    { field: "courses", headerName: "Courses", flex: 0.3 },
    { field: "created_at", headerName: "Joined On", flex: 0.3 },
    {
      field: "  ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => {
              setOpen(!open);
              setUserId(params.row.id);
            }}
          >
            <AiOutlineDelete className="dark:text-white text-black" size={20} />
          </Button>
        </>
      ),
    },
    {
      field: " ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params) => {
        return (
          <div className="mt-4">
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail className="dark:text-white text-black" size={20} />
            </a>
          </div>
        );
      },
    },
  ];

  const rows = [];

  if (isTeam) {
    const newData = data && data.users.filter((item) => item.role === "admin");

    newData &&
      newData.forEach((item) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role === "user" ? "USER" : "ADMIN",
          courses: item.courses.length,
          created_at: moment(item.createdAt).fromNow(),
        });
      });
  } else {
    data &&
      data.users.forEach((item) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role === "user" ? "USER" : "ADMIN",
          courses: item.courses.length,
          created_at: moment(item.createdAt).fromNow(),
        });
      });
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loading />
      ) : (
        <Box m="20px">
          {isTeam && (
            <div className="w-full flex justify-end">
              <button
                className="w-full md:w-[150px] py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#37a39a] focus:outline-none"
                onClick={() => setActive(!active)}
              >
                Add New Member
              </button>
            </div>
          )}
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
          {active && (
            <div className="fixed inset-0 z-40 bg-black bg-opacity-70" />
          )}
          {active && (
            <Dialog open={active} onClose={() => setActive(false)}>
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <DialogPanel className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-gray-800 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-200"
                    onClick={() => setActive(false)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                  <h2 className="text-2xl font-bold font-Josefin mb-6 text-black dark:text-white">
                    Manage Team
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="w-full max-w-md">
                      <Field>
                        <Label className="text-sm/6 font-medium text-black dark:text-white">
                          Email
                        </Label>
                        <Input
                          className="mt-2 block w-full rounded-lg border bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@doe.com"
                        />
                      </Field>
                      <Field className="mt-4">
                        <Label className="text-sm/6 font-medium text-black dark:text-white">
                          Select Role
                        </Label>
                        <div className="relative">
                          <Select
                            className="mt-2 block w-full appearance-none rounded-lg border bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 *:text-black"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                          >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                          </Select>
                          <ChevronDownIcon
                            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                            aria-hidden="true"
                          />
                        </div>
                      </Field>
                    </div>

                    <button
                      type="submit"
                      className="mt-5 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                    >
                      Submit
                    </button>
                  </form>
                </DialogPanel>
              </div>
            </Dialog>
          )}
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
                    Delete User
                  </h5>
                  <h1 className="font-Poppins">
                    Are you sure you want to delete this user?
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

export default AllUsers;
