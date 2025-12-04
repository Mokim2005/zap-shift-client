import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { userName, review: testymonial,user_photoURL } = review;
  return (
    <div className="max-w-sm rounded-xl p-6 bg-pink-100 shadow-md border border-pink-200">
      {/* Quote Icon */}
      <div className="text-pink-600 text-3xl mb-3">
        <FaQuoteLeft />
      </div>

      {/* Text */}
      <p className="text-gray-700  mb-6">{testymonial}</p>

      {/* Divider */}
      <div className="border-t border-gray-300 mb-4"></div>

      {/* Profile */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full">
            <img src={user_photoURL} alt="" />
        </div>


        <div>
          <h3 className="font-semibold text-gray-900">{userName}</h3>
          <p className="text-sm text-gray-600">Senior Product Designer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
