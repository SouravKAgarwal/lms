import { useGetCoursesAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Label,
  LabelList,
} from "recharts";
import Loading from "../../Loading";

const CourseAnalytics = () => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery();

  const analyticsData = [];

  data &&
    data.courses.last12Month.forEach((item) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="h-screen m-auto">
          <div className="mt-[120px] px-3">
            <h1 className="block text-xl md:text-3xl font-Poppins font-[500] pb-4 px-5">
              Courses Analytics
            </h1>
            <p className="text-sm/6 font-medium text-black dark:text-white px-5">
              Last 12 Months Courses Data
            </p>
          </div>
          <div className="w-full h-[80%] flex justify-center items-center">
            <ResponsiveContainer width="100%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
