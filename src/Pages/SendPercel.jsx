import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UseAuth from "../Hooks/UseAuth";

const SendPercel = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    control,
  } = useForm();

  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate()

  const serviceCenter = useLoaderData();

  const regionsDupicate = serviceCenter.map((c) => c.region);
  const regions = [...new Set(regionsDupicate)];
  console.log(regions);
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const recieverRegion = useWatch({ control, name: "senderRegion" });

  const districtByRegions = (region) => {
    const regionDistrict = serviceCenter.filter((c) => c.region === region);
    const district = regionDistrict.map((d) => d.district);
    return district;
  };

  const handleSendParcel = (data) => {
    console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.recieverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log("cost", cost);
    data.cost = cost;
    Swal.fire({
      title: "Agree with the cost?",
      text: `You will be charged ${cost} tk!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confurm and contunue payment!",
    }).then((result) => {
      if (result.isConfirmed) {
        //save the parcel info to theke database
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving the parcles", res.data);
          if (res.data.insertedId) {
            navigate('/dashboard/my-parcels')
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Parcel has created. Please Pay",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <h2 className="text-5xl font-bold">Send A Percel</h2>
      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="mt-12 text-black p-4"
      >
        {/* pacel type */}
        <div className="space-x-3">
          <label className="label cursor-pointer">
            <input
              type="radio"
              {...register("parcelType", { required: true })}
              className="radio"
              value="Document"
              defaultChecked
            />
            <span className="ml-2">Document</span>
          </label>

          <label className="label cursor-pointer">
            <input
              type="radio"
              {...register("parcelType", { required: true })}
              className="radio"
              value="Non-Document"
            />
            <span className="ml-2">Non-Document</span>
          </label>
        </div>

        {/* percel info */}
        <div className="grid grid-cols-1 md:grid-cols-2 my-6 gap-12">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight (kg)</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>
        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* sender info */}

          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Sender Details</h4>
            {/* sender name  */}
            <label className="label">Sender Name</label>
            <input
              type="text"
              {...register("senderName")}
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="Sender Name"
            />
            {/* sender email  */}
            <label className="label">Sender Email</label>
            <input
              type="email"
              {...register("senderEmail")}
              defaultValue={user?.email}
              className="input w-full"
              placeholder="Sender Email"
            />

            {/* sender region  */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Regions</legend>
              <select
                {...register("senderRegion")}
                defaultValue="Pick a rigion"
                className="select"
              >
                <option disabled={true}>Pick a Regions</option>

                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <span className="label">Optional</span>
            </fieldset>

            {/* sender district  */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender District</legend>
              <select
                {...register("senderDistrict")}
                defaultValue="Pick a district"
                className="select"
              >
                <option disabled={true}>Pick a District</option>

                {districtByRegions(senderRegion).map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <span className="label">Optional</span>
            </fieldset>

            {/* sender address  */}
            <label className="label mt-4">Sender Address</label>
            <input
              type="text"
              {...register("senderAddress")}
              className="input w-full"
              placeholder="Sender Address"
            />
          </fieldset>
          {/* receiver info */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Reciever Details</h4>
            {/* receiver name  */}
            <label className="label">Reciever Name</label>
            <input
              type="text"
              {...register("recieverName")}
              className="input w-full"
              placeholder="reciever Name"
            />

            {/* reciever email  */}
            <label className="label">Receiver Email</label>
            <input
              type="email"
              {...register("recieverEmail")}
              className="input w-full"
              placeholder="reciever Email"
            />

            {/* reciever region  */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Reciever Regions</legend>
              <select
                {...register("recieverRegion")}
                defaultValue="Pick a rigion"
                className="select"
              >
                <option disabled={true}>Pick a Regions</option>

                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <span className="label">Optional</span>
            </fieldset>

            {/* reciever district  */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Reciever District</legend>
              <select
                {...register("recieverDistrict")}
                defaultValue="Pick a district"
                className="select"
              >
                <option disabled={true}>Pick a District</option>

                {districtByRegions(recieverRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <span className="label">Optional</span>
            </fieldset>

            {/* receiver address  */}
            <label className="label mt-4">Reciever Address</label>
            <input
              type="text"
              {...register("recieverAddress")}
              className="input w-full"
              placeholder="reciever Address"
            />
          </fieldset>
        </div>
        <input
          type="submit"
          className="btn btn-primary text-black mt-4"
          value="Send Parcel"
        />
      </form>
    </div>
  );
};

export default SendPercel;
