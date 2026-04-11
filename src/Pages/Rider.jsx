import { useForm, useWatch } from "react-hook-form";
import { motion } from "framer-motion";
import UseAuth from "../Hooks/UseAuth";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {
  const { register, handleSubmit, control } = useForm();
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const serviceCenter = useLoaderData();

  const regionsDupicate = serviceCenter.map((c) => c.region);
  const regions = [...new Set(regionsDupicate)];

  const riderRegion = useWatch({ control, name: "region" });

  const districtByRegions = (region) => {
    const regionDistrict = serviceCenter.filter((c) => c.region === region);
    const district = regionDistrict.map((d) => d.district);
    return district;
  };

  const handleRiderApplication = (data) => {
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
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        backgroundImage: `url('https://www.shutterstock.com/image-photo/outdoor-photo-cyclist-riding-bicycle-260nw-2750967869.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/25 backdrop-blur-sm"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
            Become a Rider
          </h1>
          <p className="text-lg text-gray-100 drop-shadow-md max-w-2xl mx-auto">
            Join our delivery team and start earning. Fill out the application
            form below.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/15 dark:bg-gray-900/20 backdrop-blur-3xl border border-white/25 dark:border-white/15 rounded-3xl shadow-2xl p-6 md:p-8 lg:p-10"
        >
          <form
            onSubmit={handleSubmit(handleRiderApplication)}
            className="space-y-8"
          >
            {/* Two Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Rider Details Section */}
              <div className="space-y-6">
                <div className="pb-4 border-b border-white/20">
                  <h3 className="text-2xl font-semibold text-white">
                    Rider Details
                  </h3>
                  <p className="text-sm text-gray-100 mt-1">
                    Your personal information
                  </p>
                </div>

                {/* Rider Name */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    defaultValue={user?.displayName}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-white/5 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-white placeholder-white/50 backdrop-blur-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Rider Email */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    defaultValue={user?.email}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-white/5 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-white placeholder-white/50 backdrop-blur-sm"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Region */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Region
                  </label>
                  <select
                    {...register("region")}
                    defaultValue="Pick a region"
                    className="w-full px-4 py-3 bg-white/10 dark:bg-white/5 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-white backdrop-blur-sm"
                  >
                    <option disabled className="bg-gray-800 text-white">
                      Pick a Region
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
                  <p className="text-xs text-gray-100 mt-1">Optional</p>
                </div>

                {/* District */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    District
                  </label>
                  <select
                    {...register("district")}
                    defaultValue="Pick a district"
                    className="w-full px-4 py-3 bg-white/10 dark:bg-white/5 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-white backdrop-blur-sm"
                  >
                    <option disabled className="bg-gray-800 text-white">
                      Pick a District
                    </option>
                    {districtByRegions(riderRegion).map((c, i) => (
                      <option
                        key={i}
                        value={c}
                        className="bg-gray-800 text-white"
                      >
                        {c}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-100 mt-1">Optional</p>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Your Address
                  </label>
                  <input
                    type="text"
                    {...register("address")}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-white/5 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-white placeholder-white/50 backdrop-blur-sm"
                    placeholder="Enter your complete address"
                  />
                </div>
              </div>

              {/* More Details Section */}
              <div className="space-y-6">
                <div className="pb-4 border-b border-white/20">
                  <h3 className="text-2xl font-semibold text-white">
                    Additional Details
                  </h3>
                  <p className="text-sm text-gray-100 mt-1">
                    License and vehicle information
                  </p>
                </div>

                {/* Driving License */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Driving License Number
                  </label>
                  <input
                    type="text"
                    {...register("License")}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-white/5 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-white placeholder-white/50 backdrop-blur-sm"
                    placeholder="Enter your license number"
                  />
                </div>

                {/* NID */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    National ID (NID)
                  </label>
                  <input
                    type="number"
                    {...register("nid")}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-white/5 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-white placeholder-white/50 backdrop-blur-sm"
                    placeholder="Enter your NID number"
                  />
                </div>

                {/* Bike Information */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Bike Information
                  </label>
                  <input
                    type="text"
                    {...register("bike")}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-white/5 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-white placeholder-white/50 backdrop-blur-sm"
                    placeholder="e.g., Honda CB 150R - 2020"
                  />
                </div>

                {/* Info Box */}
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-300/30 rounded-lg backdrop-blur-sm">
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-300 mt-0.5 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium text-blue-200">
                        Application Review
                      </h4>
                      <p className="text-sm text-blue-100 mt-1">
                        We'll review your application within 15 business days
                        and contact you via email.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-white/20">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-200"
              >
                Submit Application
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Rider;
