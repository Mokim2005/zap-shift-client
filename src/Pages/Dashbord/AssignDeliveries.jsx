import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Pagination from "../../Components/Pagination";
import Swal from "sweetalert2";

const AssignDeliveries = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Fetch parcels assigned to this rider
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "driver-assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`,
      );
      return res.data;
    },
  });

  // Confirm + Update parcel status
  const confirmStatusUpdate = (parcel, status) => {
    const statusText = status.split("_").join(" ");
    Swal.fire({
      title: `Are you sure?`,
      text: `Parcel status will be updated to "${statusText}"`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, update it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleStatusUpdate(parcel, status);
      }
    });
  };

  // Update parcel status
  const handleStatusUpdate = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };

    const message = `Parcel status is updated to ${status.split("_").join(" ")}`;

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 2500,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong.",
        });
      });
  };

  // Pagination Logic
  const totalPages = Math.ceil(parcels.length / ITEMS_PER_PAGE);
  const paginatedParcels = parcels.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div>
      <h2 className="text-4xl mb-4">
        Parcels Pending Pickup: {parcels.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Confirm</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedParcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{(currentPage - 1) * ITEMS_PER_PAGE + i + 1}</th>
                <td>{parcel.parcelName}</td>

                {/* Confirm / Accept / Reject */}
                <td>
                  {parcel.deliveryStatus === "driver_assigned" ? (
                    <>
                      <button
                        onClick={() =>
                          confirmStatusUpdate(parcel, "rider_arriving")
                        }
                        className="btn btn-primary text-black mr-2"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          confirmStatusUpdate(parcel, "driver_rejected")
                        }
                        className="btn btn-warning text-black"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="btn btn-primary text-black mr-2">
                      Accepted
                    </span>
                  )}
                </td>

                {/* Other actions */}
                <td>
                  <button
                    onClick={() =>
                      confirmStatusUpdate(parcel, "parcel_picked_up")
                    }
                    className="btn btn-primary text-black mr-2"
                  >
                    Mark as Picked Up
                  </button>
                  <button
                    onClick={() =>
                      confirmStatusUpdate(parcel, "parcel_delivered")
                    }
                    className="btn btn-primary text-black mr-2"
                  >
                    Mark as Delivered
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {parcels.length > ITEMS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default AssignDeliveries;
