import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Package, User, MapPin, Mail, Weight, Send } from "lucide-react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UseAuth from "../Hooks/UseAuth";

const SendPercel = () => {
  const {
    register,
    handleSubmit,
    control,
  } = useForm();

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
            navigate('/dashboard/my-parcels');
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
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Send a Parcel
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Fast, reliable, and secure delivery service
          </p>
        </div>

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 dark:border-gray-700/40 p-6 md:p-8"
        >
          <form onSubmit={handleSubmit(handleSendParcel)} className="space-y-8">
            {/* Parcel Type Selection */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4">
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
                  <div className="p-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 peer-checked:border-indigo-500 peer-checked:bg-indigo-50 dark:peer-checked:bg-indigo-900/30 peer-checked:shadow-lg transition-all duration-200 hover:border-indigo-400">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-400 dark:border-gray-500 peer-checked:border-indigo-500 peer-checked:bg-indigo-500 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100"></div>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">Document</span>
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
                  <div className="p-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 peer-checked:border-indigo-500 peer-checked:bg-indigo-50 dark:peer-checked:bg-indigo-900/30 peer-checked:shadow-lg transition-all duration-200 hover:border-indigo-400">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-400 dark:border-gray-500 peer-checked:border-indigo-500 peer-checked:bg-indigo-500 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100"></div>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">Non-Document</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Parcel Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Package className="w-4 h-4" />
                  Parcel Name
                </label>
                <input
                  type="text"
                  {...register("parcelName")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Enter parcel name"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Weight className="w-4 h-4" />
                  Parcel Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("parcelWeight")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Enter weight"
                />
              </div>
            </div>

            {/* Sender and Receiver Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sender Details */}
              <div className="space-y-6 p-6 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800">
                <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Sender Details
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input
                      type="text"
                      {...register("senderName")}
                      defaultValue={user?.displayName}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Sender name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Mail className="w-4 h-4" />
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("senderEmail")}
                      defaultValue={user?.email}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="sender@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <MapPin className="w-4 h-4" />
                      Region
                    </label>
                    <select
                      {...register("senderRegion")}
                      defaultValue="Pick a rigion"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option disabled>Pick a Regions</option>
                      {regions.map((r, i) => (
                        <option key={i} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">District</label>
                    <select
                      {...register("senderDistrict")}
                      defaultValue="Pick a district"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option disabled>Pick a District</option>
                      {districtByRegions(senderRegion).map((c, i) => (
                        <option key={i} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                    <input
                      type="text"
                      {...register("senderAddress")}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Full address"
                    />
                  </div>
                </div>
              </div>

              {/* Receiver Details */}
              <div className="space-y-6 p-6 rounded-xl bg-green-50/50 dark:bg-green-900/10 border border-green-200 dark:border-green-800">
                <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
                  <User className="w-5 h-5 text-green-600 dark:text-green-400" />
                  Receiver Details
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input
                      type="text"
                      {...register("recieverName")}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Receiver name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Mail className="w-4 h-4" />
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("recieverEmail")}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="receiver@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <MapPin className="w-4 h-4" />
                      Region
                    </label>
                    <select
                      {...register("recieverRegion")}
                      defaultValue="Pick a rigion"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      <option disabled>Pick a Regions</option>
                      {regions.map((r, i) => (
                        <option key={i} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">District</label>
                    <select
                      {...register("recieverDistrict")}
                      defaultValue="Pick a district"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      <option disabled>Pick a District</option>
                      {districtByRegions(recieverRegion).map((d, i) => (
                        <option key={i} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                    <input
                      type="text"
                      {...register("recieverAddress")}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Full address"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Info Card */}
            <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Pricing:</span> Documents start at 60 tk (same district) or 80 tk (different district). 
                Non-documents start at 110 tk (same district) or 150 tk (different district) for up to 3kg, with additional charges for extra weight.
              </p>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
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
