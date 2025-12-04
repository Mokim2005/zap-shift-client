import React from "react";
import { FaBabyCarriage } from "react-icons/fa";
import bookingIcon from "../../assets/bookingIcon.png";

const BannerCard = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl mb-3">How it Works</h1>
      <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
        {/* card1  */}
        <div className="bg-white space-y-2 rounded-xl p-2 border-2 border-primary">
          <img src={bookingIcon} alt="" />

          <h3 className="text-xl font-semibold">Booking Pick & Drop</h3>
          <p className="text-gray-500">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
        {/* card2  */}
        <div className="bg-white space-y-2 rounded-xl p-2 border-2 border-primary">
          <img src={bookingIcon} alt="" />

          <h3 className="text-xl font-semibold">Cash On Delivery</h3>
          <p className="text-gray-500">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
        {/* card3  */}
        <div className="bg-white space-y-2 rounded-xl p-2 border-2 border-primary">
          <img src={bookingIcon} alt="" />

          <h3 className="text-xl font-semibold">Delivery Hub</h3>
          <p className="text-gray-500">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
        {/* card4  */}
        <div className="bg-white space-y-2 rounded-xl p-2 border-2 border-primary">
          <img src={bookingIcon} alt="" />
          <h3 className="text-xl font-semibold">Booking SME & Corporate</h3>
          <p className="text-gray-500">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
