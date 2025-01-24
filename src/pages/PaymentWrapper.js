import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { fetchTransactionDetails } from "../API/calls";

const PaymentStatus = () => {

  let [searchParams, _] = useSearchParams();

  const [transactionId, setTransactionId] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    setTransactionId(searchParams.get("txn"));
  }, [searchParams]);

  const fetchTransationDetails = async () => {
    return toast.promise(fetchTransactionDetails(transactionId), {
      loading: "Fetching details...",
      success: (res) => {
        setPaymentDetails(res.data.data);
        return "Payment Details loaded successfully";
      },
      error: (err) => {
        return "Please contact the helpdesk for help";
      }
    })
  }

  useEffect(() => {
    if (transactionId) {
      fetchTransationDetails();
    }
  }, [transactionId]);

  useEffect(() => {
    console.log(paymentDetails);
  }, [paymentDetails]);

  return (
    <section className="w-screen h-screen flex font-poppins items-center justify-center p-5 bg-violet-200">
      {paymentDetails && paymentDetails.status === "INITIATED" && (
        <div className="text-center">
          <h1 className="text-6xl mb-5 text-violet-900">Waiting...</h1>
          <p className="text-lg text-violet-700">Hold tight while we update your details. 😬</p>
        </div>
      )}
      {paymentDetails && paymentDetails.status === "SUCCESS" && (
        <div className="text-center">
          <h1 className="text-4xl mb-10 text-violet-900">Success 😀</h1>
          <p className="text-lg text-violet-700">Thank you for attending kriya.</p>
        </div>
      )}
      {paymentDetails && paymentDetails.status === "ERROR" && (
        <div className="text-center">
          <h1 className="text-4xl mb-10 text-violet-900">Failed 😔</h1>
          <p className="text-lg text-violet-700">Sorry for the inconvenience, kindly approach helpdesk.</p>
        </div>
      )}
    </section>
  );
};

export default PaymentStatus;