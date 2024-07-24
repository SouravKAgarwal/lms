import { useGetUsersAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  AreaChart,
  Tooltip,
  Area,
} from "recharts";
import Loading from "../../Loading";

const CourseAnalytics = ({ isDashboard }) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery();

  const analyticsData = [];

  data &&
    data.users.last12Month.forEach((item) => {
      analyticsData.push({ name: item.month, count: item.count });
    });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className={`${
            !isDashboard
              ? " h-screen mt-[120px] m-auto px-3"
              : "dark:bg-[#111c43] shadow-sm pb-5 rounded-sm"
          }`}
        >
          <div className={``}>
            <h1
              className={`block text-xl md:text-3xl font-Poppins font-[500] py-2 px-5 ${
                isDashboard && "px-5 text-start text-base md:text-[20px]"
              }`}
            >
              Users Analytics
            </h1>
            {!isDashboard && (
              <p className="text-sm/6 font-medium text-black dark:text-white px-5">
                Last 12 Months Users Data
              </p>
            )}
          </div>
          <div
            className={`${
              isDashboard ? "h-[40vh]" : "h-[80vh]"
            } w-full flex justify-center items-center`}
          >
            <ResponsiveContainer
              width="100%"
              height={isDashboard ? "100%" : "50%"}
            >
              <AreaChart
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
                data={analyticsData}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#4d62d9"
                  fill="#4d62d9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
