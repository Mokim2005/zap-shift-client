import React, { useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../Components/Pagination";

const CompletedDeliveries = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const { data: Parcels = [] } = useQuery({
    queryKey: ["parcels", user.email, "driver-assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`,
      );
      return res.data;
    },
  });

  const calculatePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.cost * 0.8;
    } else {
      return parcel.cost * 0.6;
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(Parcels.length / ITEMS_PER_PAGE);
  const paginatedParcels = Parcels.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div>
      <h2 className="text-4xl text-black">
        Completed Deliveries: {Parcels.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>

              <th>Created At</th>
              <th>Pikup District</th>
              <th>Cost</th>
              <th>Payout</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedParcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{(currentPage - 1) * ITEMS_PER_PAGE + i + 1}</th>
                <td>{parcel.parcelName}</td>

                <td>{parcel.createdAt}</td>
                <td>{parcel.senderDistrict}</td>
                <td>${parcel.cost}</td>
                <td>${calculatePayout(parcel)}</td>
                <td>
                  <button className="btn btn-primary text-black">
                    Cash Out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {Parcels.length > ITEMS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default CompletedDeliveries;
