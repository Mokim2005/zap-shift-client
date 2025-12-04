import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-5xl">Payment History: {payments.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Amount</th>
              <th>Paid Time</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment,i) => (
              <tr key={payment._id}>
                <th>{i+1}</th>
                <td>Mokim</td>
                <td>{payment.amount}</td>
                <td>{payment.paidAt}</td>
                <td>{payment.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
