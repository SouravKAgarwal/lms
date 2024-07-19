import { useGetOrdersQuery } from "../../../../redux/features/orders/orderApi";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import { useGetCoursesQuery } from "../../../../redux/features/courses/courseApi";
import { useGetUsersQuery } from "../../../../redux/features/user/userApi";
import { AiOutlineMail } from "react-icons/ai";
import Loading from "../../Loading";
import { useEffect, useState } from "react";
import moment from "moment";

const AllInvoices = ({ isDashboard }) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data } = useGetOrdersQuery();
  const { data: courseData } = useGetCoursesQuery();
  const { data: userData } = useGetUsersQuery();

  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item) => {
        const user = userData?.users.find((user) => user._id === item.userId);
        const course = courseData?.courses.find(
          (course) => course._id === item.courseId
        );
        return {
          ...item,
          username: user?.name,
          email: user?.email,
          title: course?.name,
          price: "$" + course?.price,
          createdAt: item.createdAt,
        };
      });
      setOrderData(temp);
    }
  }, [data, userData, courseData]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "username", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "email", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Course Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.3 },
    ...(isDashboard
      ? [{ field: "createdAt", headerName: "Purchased", flex: 0.5 }]
      : [
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params) => {
              return (
                <div className="mt-4">
                  <a href={`mailto:${params.row.email}`}>
                    <AiOutlineMail
                      className="text-black dark:text-white"
                      size={20}
                    />
                  </a>
                </div>
              );
            },
          },
        ]),
  ];

  const rows = [];

  orderData &&
    orderData.forEach((item) => {
      rows.push({
        id: item._id,
        username: item.username,
        email: item.email,
        title: item.title,
        price: item.price,
        createdAt: moment(item.createdAt).fromNow(),
      });
    });
  return (
    <div className={!isDashboard ? "mt-[120px]" : "mt-0"}>
      {isLoading ? (
        <Loading />
      ) : (
        <Box m={isDashboard ? "0" : "20px"}>
          <Box
            m={isDashboard ? "0" : "40px 0 0 0"}
            height={isDashboard ? "45vh" : "80vh"}
            overflow="hidden"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
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
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "#fff !important",
              },
            }}
          >
            <DataGrid
              columns={columns}
              rows={rows}
              components={isDashboard ? {} : { GridToolbar }}
              disableColumnMenu
              disableColumnFilter
              disableColumnSorting
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
