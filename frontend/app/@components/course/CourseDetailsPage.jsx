import { useEffect, useState } from "react";
import Heading from "@/app/@utils/Heading";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/courseApi";
import Loading from "../Loading";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetail from "./CourseDetail";
import {
  useGetStripeKeyQuery,
  useOrderPaymentMutation,
} from "@/redux/features/orders/orderApi";
import { loadStripe } from "@stripe/stripe-js";

const CourseDetailsPage = ({ id }) => {
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: key } = useGetStripeKeyQuery();
  const [activeItem, setActiveItem] = useState(1);

  const [orderPayment, { data: paymentData }] = useOrderPaymentMutation();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (key) {
      const publishableKey = key.stripePublishableKey;
      setStripePromise(loadStripe(publishableKey));
    }
    if (data) {
      const amount = Math.round(data.course.price) * 100;
      orderPayment(amount);
    }
  }, [data, key]);

  useEffect(() => {
    if (paymentData) {
      setClientSecret(paymentData.client_secret);
    }
  }, [paymentData]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Heading
            title={`${data.course.name} - ELearning`}
            description="Platform for learning new technologies and programming."
            keywords={data.course.tags}
          />
          <Header activeItem={activeItem} setActiveItem={setActiveItem} />
          {stripePromise && (
            <CourseDetail
              data={data.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
            />
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
