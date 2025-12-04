import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const PaymentSuccess = () => {
  const [searchPerams] = useSearchParams();
  const sessionId = searchPerams.get("session_id");
  const [paymentInfo, setPaymentInfo] = useState({});
  console.log(sessionId);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
            setPaymentInfo({
                transactionId: res.data.transactionId,
                trackingId: res.data.trackingId
            })
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div>
      <h1>payment successful </h1>
      <p>Your transactionId: {paymentInfo.transactionId}</p>
      <p>Your Parcel Tracking id: {paymentInfo.trackingId}</p>
      {/* <Link to="/dashboard/my-parcels">
        <button className="btn btn-primary text-black">Try Again</button>
      </Link> */}
    </div>
  );
};

export default PaymentSuccess;
