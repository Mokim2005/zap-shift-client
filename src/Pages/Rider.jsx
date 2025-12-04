import React from "react";
import { useForm, useWatch } from "react-hook-form";
import UseAuth from "../Hooks/UseAuth";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {
  const { register, handleSubmit, control } = useForm();
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const serviceCenter = useLoaderData();

  const regionsDupicate = serviceCenter.map((c) => c.region);
  const regions = [...new Set(regionsDupicate)];
  console.log(regions);

  const riderRegion = useWatch({ control, name: "region" });

  const districtByRegions = (region) => {
    const regionDistrict = serviceCenter.filter((c) => c.region === region);
    const district = regionDistrict.map((d) => d.district);
    return district;
  };

  const handleRiderApplication = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your application has been submitted. We will reach to you in 15 days",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl text-primary">Be a Rider</h2>
      <form
        onSubmit={handleSubmit(handleRiderApplication)}
        className="mt-12 text-black p-4"
      >
        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* sender info */}

          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Rider Details</h4>
            {/* rider name  */}
            <label className="label">Rider Name</label>
            <input
              type="text"
              {...register("name")}
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="Rider Name"
            />
            {/* rider email  */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email")}
              defaultValue={user?.email}
              className="input w-full"
              placeholder="Rider Email"
            />

            {/* rider region  */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Regions</legend>
              <select
                {...register("region")}
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

            {/*rider district  */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend"> District</legend>
              <select
                {...register("district")}
                defaultValue="Pick a district"
                className="select"
              >
                <option disabled={true}>Pick a District</option>

                {districtByRegions(riderRegion).map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <span className="label">Optional</span>
            </fieldset>

            {/* rider address  */}
            <label className="label mt-4">Your Address</label>
            <input
              type="text"
              {...register("address")}
              className="input w-full"
              placeholder="Address"
            />
          </fieldset>
          {/* driving license */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">More Details</h4>
            {/*   */}
            <label className="label">Driving License</label>
            <input
              type="text"
              {...register("License")}
              className="input w-full"
              placeholder="Driving License"
            />

            {/* NID  */}
            <label className="label">NID</label>
            <input
              type="number"
              {...register("nid")}
              className="input w-full"
              placeholder="NID"
            />

            {/* bike information  */}
            <label className="label mt-4">BIKE</label>
            <input
              type="text"
              {...register("bike")}
              className="input w-full"
              placeholder="Bike"
            />
          </fieldset>
        </div>
        <input
          type="submit"
          className="btn btn-primary text-black mt-4"
          value="Apply as a Rider"
        />
      </form>
    </div>
  );
};

export default Rider;
