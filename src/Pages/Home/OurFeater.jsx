import React from "react";
import tracking from "../../assets/live-tracking.png";
import delivery from "../../assets/safe-delivery.png";

const OurFeater = () => {
  return (
    <div>
      {/* box -1  */}
      <div className="border-2 p-4 rounded-2xl border-amber-400 flex justify-center items-center gap-5">
        <div>
          <img src={tracking} alt="" />
        </div>
        <div>
          <h2 className="font-bold text-xl">Live Parcel Tracking</h2>
          <p>
            <small className="text-gray-500">
              Stay updated in real-time with our live parcel tracking feature.
              From pick-up to delivery, monitor your shipment's journey and get
              instant status updates for complete peace of mind.
            </small>
          </p>
        </div>
      </div>
      {/* box -2  */}
      <div className="border-2 p-4 rounded-2xl border-amber-400 flex items-center gap-5">
        <div>
          <img src={delivery} alt="" />
        </div>
        <div>
          <h2 className="font-bold text-xl">100% Safe Delivery</h2>
          <p>
            <small className="text-gray-500">
              We ensure your parcels are handled with the utmost care and
              delivered securely to their destination. Our reliable process
              guarantees safe and damage-free delivery every time.
            </small>
          </p>
        </div>
      </div>
      {/* box -3  */}

     <div className="border-2 p-4 rounded-2xl border-amber-400 flex  items-center gap-5">
        <div>
          <img src={delivery} alt="" />
        </div>
        <div>
          <h2 className="font-bold text-xl">24/7 Call Center Support</h2>
          <p>
            <small className="text-gray-500">
              Our dedicated support team is available around the clock to assist
              you with any questions, updates, or delivery concerns—anytime you
              need us.
            </small>
          </p>
        </div>
      </div> 
    </div>
  );
};

export default OurFeater;
