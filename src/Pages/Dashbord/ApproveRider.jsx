import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { FaEye, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveRider = () => {
  const axiosSecure = UseAxiosSecure();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}/role`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider has been ${status}`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  const handleApproval = (rider) => {
    updateRiderStatus(rider, "approve");
  };

  const handleRejection = (rider) => {
    updateRiderStatus(rider, "rejected");
  };

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "rider request has been deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/riders/${id}`).then((res) => {
          if (res.data.deletedCount) {
            console.log(id);
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Rider request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-5xl">Riders Pending Approval: {riders.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Application Status</th>
              <th>work Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, i) => (
              <tr key={rider._id}>
                <th>{i + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.district}</td>
                <td>
                  <p
                    className={`${
                      rider.status === "approve"
                        ? "text-green-800"
                        : "text-red-500"
                    }`}
                  >
                    {rider.status}
                  </p>
                </td>
                <td>{rider.workStatus}</td>
                <td>
                  <button className="btn">
                    <FaEye></FaEye>
                  </button>
                  <button onClick={() => handleApproval(rider)} className="btn">
                    <FaUserCheck></FaUserCheck>
                  </button>
                  <button
                    onClick={() => handleRejection(rider)}
                    className="btn"
                  >
                    <IoPersonRemoveSharp></IoPersonRemoveSharp>
                  </button>
                  <button
                    onClick={() => handleDelete(rider._id)}
                    className="btn"
                  >
                    <FaTrashCan></FaTrashCan>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRider;
