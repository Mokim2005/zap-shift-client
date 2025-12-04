import React from "react";
import service from "../../assets/service.png";

const BannerBox = () => {
  return (
    <div className="border-2 bg-secondary  text-white p-8 mt-10 rounded-xl">
      <h1 className="text-2xl mt-8 md:text-4xl font-bold text-center">
        Our Services
      </h1>
      <p className="mb-4 text-center">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.{" "}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {/* box-1 */}
        <div className="border-2 p-2 bg-white rounded-2xl shadow-2xl text-center space-y-4">
          <img className=" flex  mx-auto" src={service} alt="" />
          <h2 className="text-xl text-black font-semibold">Express & Standard Delivery</h2>
          <p className="text-gray-500">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi.  Express delivery available in Dhaka within
            4–6 hours from pick-up to drop-off.
          </p>
        </div>
        {/* box-2 */}
        <div className="border-2 p-2 bg-white rounded-2xl shadow-2xl text-center space-y-4">
          <img className=" flex  mx-auto" src={service} alt="" />
          <h2 className="text-xl text-black font-semibold">Express & Standard Delivery</h2>
          <p className="text-gray-500">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi.  Express delivery available in Dhaka within
            4–6 hours from pick-up to drop-off.
          </p>
        </div>
        {/* box-3 */}
        <div className="border-2 p-2 bg-white rounded-2xl shadow-2xl text-center space-y-4">
          <img className=" flex  mx-auto" src={service} alt="" />
          <h2 className="text-xl text-black text-black font-semibold">Express & Standard Delivery</h2>
          <p className="text-gray-500">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi.  Express delivery available in Dhaka within
            4–6 hours from pick-up to drop-off.
          </p>
        </div>
        {/* box-4 */}
        <div className="border-2 p-2 bg-white rounded-2xl shadow-2xl text-center space-y-4">
          <img className=" flex  mx-auto" src={service} alt="" />
          <h2 className="text-xl text-black font-semibold">Express & Standard Delivery</h2>
          <p className="text-gray-500">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi.  Express delivery available in Dhaka within
            4–6 hours from pick-up to drop-off.
          </p>
        </div>
        {/* box-5 */}
        <div className="border-2 p-2 bg-white rounded-2xl shadow-2xl text-center space-y-4">
          <img className=" flex  mx-auto" src={service} alt="" />
          <h2 className="text-xl text-black font-semibold">Express & Standard Delivery</h2>
          <p className="text-gray-500">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi.  Express delivery available in Dhaka within
            4–6 hours from pick-up to drop-off.
          </p>
        </div>
        {/* box-6 */}
        <div className="border-2 p-2 bg-white rounded-2xl shadow-2xl text-center space-y-4">
          <img className=" flex  mx-auto" src={service} alt="" />
          <h2 className="text-xl text-black font-semibold">Express & Standard Delivery</h2>
          <p className="text-gray-500">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi.  Express delivery available in Dhaka within
            4–6 hours from pick-up to drop-off.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannerBox;
