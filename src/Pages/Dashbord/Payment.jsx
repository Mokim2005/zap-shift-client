import { useQuery } from "@tanstack/react-query";
import React from "react";
// import { useParams } from "react-router";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = UseAxiosSecure();
  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  if (isLoading) {
    return (
      <div>
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  }

  const handlePayment = async()=>{
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName
    }
    const res = await axiosSecure.post('/create-cheakout-session', paymentInfo)
    console.log(res.data)
    window.location.href = res.data.url
  }

  return (
    <div>
      
      <h1>Please pay  {parcel.cost} for : {parcel.parcelName} </h1>
      <button onClick={handlePayment} className="btn btn-primary text-black">Pay</button>
    </div>
  );
};

export default Payment;
