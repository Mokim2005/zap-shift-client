import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [paymentInfo, setPaymentInfo] = useState({});
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center space-y-6">

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="text-green-600 w-12 h-12" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-500">
          Your payment has been completed successfully.
        </p>

        {/* Info Card */}
        <div className="bg-gray-50 border rounded-xl p-5 space-y-3 text-left">

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">
              Transaction ID
            </span>
            <span className="font-semibold text-gray-900">
              {paymentInfo.transactionId}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">
              Tracking ID
            </span>
            <span className="font-semibold text-indigo-600">
              {paymentInfo.trackingId}
            </span>
          </div>

        </div>

        {/* Button */}
        <Link to="/dashboard/my-parcels">
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-lg">
            View My Parcels
          </button>
        </Link>

      </div>
    </div>
  );
};

export default PaymentSuccess;