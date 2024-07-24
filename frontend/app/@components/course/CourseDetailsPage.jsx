import CourseDetail from "@/app/@components/course/CourseDetail";
import Footer from "@/app/@components/Footer";
import Header from "@/app/@components/Header";
import Loading from "@/app/@components/Loading";
import Heading from "@/app/@utils/Heading";
import { useLoadUserQuery } from "@/redux/features/api/apiSlices";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/courseApi";
import {
  useGetStripeKeyQuery,
  useOrderPaymentMutation,
} from "@/redux/features/orders/orderApi";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const CourseDetailsPage = ({ id }) => {
  const { data: courseData, isLoading } = useGetCourseDetailsQuery(id);
  const { data: userData, refetch } = useLoadUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [user, setUser] = useState();
  const { data: key } = useGetStripeKeyQuery();
  const [activeItem, setActiveItem] = useState(1);

  const [orderPayment, { data: paymentData }] = useOrderPaymentMutation();

  const [data,setData] = useState();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (key) {
      const publishableKey = key.stripePublishableKey;
      setStripePromise(loadStripe(publishableKey));
    }
    if(courseData){
      setData(courseData.course);
    }
    if (courseData && user) {
      const amount = Math.round(courseData.course.price) * 100;
      orderPayment(amount);
    } else {
      refetch();
    }
  }, [courseData, key, user]);

  useEffect(() => {
    if (paymentData) {
      setClientSecret(paymentData.client_secret);
    }
  }, [paymentData]);

  useEffect(() => {
    if (userData) {
      setUser(userData.user);
    }
  }, [userData]);

  console.log(data,courseData);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Heading
            title={`${data.name} - ELearning`}
            description="Platform for learning new technologies and programming."
            keywords={data.tags}
          />
          <Header activeItem={activeItem} setActiveItem={setActiveItem} />
          <div className="mt-20">
            {stripePromise && (
              <CourseDetail
                data={data}
                stripePromise={stripePromise}
                clientSecret={clientSecret}
              />
            )}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
