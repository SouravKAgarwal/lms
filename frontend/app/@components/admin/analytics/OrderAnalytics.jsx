import { useGetOrdersAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  Tooltip,
  CartesianGrid,
  Legend,
  Line,
} from "recharts";
import Loading from "../../Loading";

const CourseAnalytics = ({ isDashboard }) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery();

  const analyticsData = [];

  data &&
    data.orders.last12Month.forEach((item) => {
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
              : "dark:bg-[#111c43] shadow-sm rounded-sm"
          }`}
        >
          <div className={``}>
            <h1
              className={`block text-xl md:text-3xl font-Poppins font-[500] py-4 px-5 ${
                isDashboard && "text-start text-base md:text-[20px]"
              }`}
            >
              Order Analytics
            </h1>
            {!isDashboard && (
              <p className="text-sm/6 font-medium text-black dark:text-white px-5">
                Last 12 Months Orders Data
              </p>
            )}
          </div>
          <div
            className={`${
              isDashboard ? "h-[40vh]" : "h-[80vh]"
            } w-full flex justify-center items-center`}
          >
            <ResponsiveContainer width="100%" height="50%">
              <LineChart
                width={500}
                height={600}
                margin={{
                  top: 5,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
                data={analyticsData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
