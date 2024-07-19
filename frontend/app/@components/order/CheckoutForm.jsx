import { useLoadUserQuery } from "@/redux/features/api/apiSlices";
import { useCreateOrderMutation } from "@/redux/features/orders/orderApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CheckoutForm = ({ setOpen, data }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);

  const {} = useLoadUserQuery({ skip: loadUser ? false : true });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      createOrder({ courseId: data._id, paymentInfo: paymentIntent });
    }
  };

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);
      redirect(`/course-access/${data._id}`);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [orderData, error]);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span
          id="button-text"
          className="w-full flex items-center justify-center md:w-[150px] mt-2 py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-blue-600/80 cursor-pointer focus:outline-none"
        >
          {isLoading ? "Paying...." : "Pay Now"}
        </span>
      </button>
      {message && (
        <div id="payment-message" className="text-red-500 font-Poppins pt-2">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
