import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Package, User, MapPin, Mail, Weight, Send } from "lucide-react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UseAuth from "../Hooks/UseAuth";

const SendPercel = () => {
  const { register, handleSubmit, control } = useForm();

  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const serviceCenter = useLoaderData();

  const regionsDupicate = serviceCenter.map((c) => c.region);
  const regions = [...new Set(regionsDupicate)];
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
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving the parcles", res.data);
          if (res.data.insertedId) {
            navigate("/dashboard/my-parcels");
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/1804255712/photo/cyclist-in-city-traffic-using-the-bicycle-lane.jpg?s=612x612&w=0&k=20&c=Do8-Oy9-lgiHIq2PyXHReIWZe_YI1LjuPk2-GMkV9ks=')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/25 backdrop-blur-sm"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-3">
            Send a Parcel
          </h1>
          <p className="text-gray-100 text-lg drop-shadow-md">
            Fast, reliable, and secure delivery service
          </p>
        </div>

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/15 dark:bg-gray-900/20 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/25 dark:border-white/15 p-8 md:p-12 max-w-5xl mx-auto"
        >
          <form onSubmit={handleSubmit(handleSendParcel)} className="space-y-8">
            {/* Parcel Type Selection */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                <Package className="w-5 h-5" />
                Parcel Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="relative cursor-pointer group">
                  <input
                    type="radio"
                    {...register("parcelType", { required: true })}
                    value="Document"
                    defaultChecked
                    className="peer sr-only"
                  />
                  <div className="p-4 rounded-xl border-2 border-white/30 bg-white/10 dark:bg-white/5 peer-checked:border-blue-400 peer-checked:bg-blue-500/20 dark:peer-checked:bg-blue-500/30 peer-checked:shadow-lg transition-all duration-200 hover:border-blue-300/50 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-white/50 dark:border-white/40 peer-checked:border-blue-300 peer-checked:bg-blue-400 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100"></div>
                      </div>
                      <span className="font-medium text-white">Document</span>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer group">
                  <input
                    type="radio"
                    {...register("parcelType", { required: true })}
                    value="Non-Document"
                    className="peer sr-only"
                  />
                  <div className="p-4 rounded-xl border-2 border-white/30 bg-white/10 dark:bg-white/5 peer-checked:border-green-400 peer-checked:bg-green-500/20 dark:peer-checked:bg-green-500/30 peer-checked:shadow-lg transition-all duration-200 hover:border-green-300/50 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-white/50 dark:border-white/40 peer-checked:border-green-300 peer-checked:bg-green-400 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100"></div>
                      </div>
                      <span className="font-medium text-white">
                        Non-Document
                      </span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Parcel Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-white">
                  <Package className="w-4 h-4" />
                  Parcel Name
                </label>
                <input
                  type="text"
                  {...register("parcelName")}
                  className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 dark:bg-white/5 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all backdrop-blur-sm"
                  placeholder="Enter parcel name"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-white">
                  <Weight className="w-4 h-4" />
                  Parcel Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("parcelWeight")}
                  className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 dark:bg-white/5 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all backdrop-blur-sm"
                  placeholder="Enter weight"
                />
              </div>
            </div>

            {/* Sender and Receiver Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sender Details */}
              <div className="space-y-6 p-6 rounded-2xl bg-blue-500/10 border border-blue-300/30 backdrop-blur-sm">
                <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
                  <User className="w-5 h-5 text-blue-300" />
                  Sender Details
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Name
                    </label>
                    <input
                      type="text"
                      {...register("senderName")}
                      defaultValue={user?.displayName}
                      className="w-full px-4 py-2.5 rounded-lg border border-white/30 bg-white/10 dark:bg-white/5 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all backdrop-blur-sm"
                      placeholder="Sender name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-white">
                      <Mail className="w-4 h-4" />
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("senderEmail")}
                      defaultValue={user?.email}
                      className="w-full px-4 py-2.5 rounded-lg border border-white/30 bg-white/10 dark:bg-white/5 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all backdrop-blur-sm"
                      placeholder="sender@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-white">
                      <MapPin className="w-4 h-4" />
                      Region
                    </label>
                    <select
                      {...register("senderRegion")}
                      defaultValue="Pick a rigion"
                      className="w-full px-4 py-2.5 rounded-lg border border-white/30 bg-white/10 dark:bg-white/5 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all backdrop-blur-sm"
                    >
                      <option disabled className="bg-gray-800 text-white">
                        Pick a Regions
                      </option>
                      {regions.map((r, i) => (
                        <option
                          key={i}
                          value={r}
                          className="bg-gray-800 text-white"
                        >
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      District
                    </label>
                    <select
                      {...register("senderDistrict")}
                      defaultValue="Pick a district"
                      className="w-full px-4 py-2.5 rounded-lg border border-white/30 bg-white/10 dark:bg-white/5 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all backdrop-blur-sm"
                    >
                      <option disabled className="bg-gray-800 text-white">
                        Pick a District
                      </option>
                      {districtByRegions(senderRegion).map((c, i) => (
                        <option
                          key={i}
                          value={c}
                          className="bg-gray-800 text-white"
                        >
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Address
                    </label>
                    <input
                      type="text"
                      {...register("senderAddress")}
                      className="w-full px-4 py-2.5 rounded-lg border border-white/30 bg-white/10 dark:bg-white/5 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all backdrop-blur-sm"
                      placeholder="Full address"
                    />
                  </div>
                </div>
              </div>

              {/* Receiver Details */}
              <div className="space-y-6 p-6 rounded-2xl bg-green-500/10 border border-green-300/30 backdrop-blur-sm">
                <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
                  <User className="w-5 h-5 text-green-300" />
                  Receiver Details
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Name
                    </label>
                    <input
                      type="text"
                      {...register("recieverName")}
                      className="w-full px-4 py-2.5 rounded-lg border border-white/30 bg-white/10 dark:bg-white/5 text-white placeholder-white/50 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all backdrop-blur-sm"
                      placeholder="Receiver name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-white">
                      <Mail className="w-4 h-4" />
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("recieverEmail")}
                      className="w-full px-4 py-2.5 rounded-lg border border-white/30 bg-white/10 dark:bg-white/5 text-white placeholder-white/50 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all backdrop-blur-sm"
                      placeholder="receiver@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-white">
                      <MapPin className="w-4 h-4" />
                      Region
                    </label>
                    <select
                      {...register("recieverRegion")}
                      defaultValue="Pick a rigion"
                      className="w-full px-4 py-2.5 rounded-lg border border-white/30 bg-white/10 dark:bg-white/5 text-white focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all backdrop-blur-sm"
                    >
                      <option disabled className="bg-gray-800 text-white">
                        Pick a Regions
                      </option>
                      {regions.map((r, i) => (
                        <option
                          key={i}
                          value={r}
                          className="bg-gray-800 text-white"
                        >
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      District
                    </label>
                    <select
                      {...register("recieverDistrict")}
                      defaultValue="Pick a district"
                      className="w-full px-4 py-2.5 rounded-lg border border-white/30 bg-white/10 dark:bg-white/5 text-white focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all backdrop-blur-sm"
                    >
                      <option disabled className="bg-gray-800 text-white">
                        Pick a District
                      </option>
                      {districtByRegions(recieverRegion).map((d, i) => (
                        <option
                          key={i}
                          value={d}
                          className="bg-gray-800 text-white"
                        >
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Address
                    </label>
                    <input
                      type="text"
                      {...register("recieverAddress")}
                      className="w-full px-4 py-2.5 rounded-lg border border-white/30 bg-white/10 dark:bg-white/5 text-white placeholder-white/50 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all backdrop-blur-sm"
                      placeholder="Full address"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Info Card */}
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-300/30 backdrop-blur-sm">
              <p className="text-sm text-white">
                <span className="font-semibold">Pricing:</span> Documents start
                at 60 tk (same district) or 80 tk (different district).
                Non-documents start at 110 tk (same district) or 150 tk
                (different district) for up to 3kg, with additional charges for
                extra weight.
              </p>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Parcel
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SendPercel;
