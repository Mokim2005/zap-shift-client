import React, { useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenter = useLoaderData();
  const mapRef = useRef(null);
  const [searchError, setSearchError] = useState(false);
  const bgImageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQebk4478O2EmO1jRhnrSnfmYGRCRus0WMz-A&s";

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.trim();

    if (!location) {
      setSearchError(true);
      setTimeout(() => setSearchError(false), 2000);
      return;
    }

    const district = serviceCenter.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase()),
    );

    if (district) {
      const coord = [district.latitude, district.longitude];
      mapRef.current?.flyTo(coord, 14);
      setSearchError(false);
    } else {
      setSearchError(true);
      setTimeout(() => setSearchError(false), 2000);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url('${bgImageUrl}')`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-screen bg-fixed pt-20"
    >
      {/* Dark overlay gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <FaMapMarkerAlt className="w-12 h-12 text-blue-400 mx-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Our Coverage Area
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              We serve 64 districts across the country with reliable and fast
              delivery services
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center">
                <input
                  name="location"
                  type="text"
                  placeholder="Search by district name..."
                  className="w-full px-6 py-4 bg-white/15 backdrop-blur-lg text-white placeholder-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 border border-white/30 transition-all duration-200"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-r-xl font-semibold transition-all duration-200 flex items-center space-x-2"
                >
                  <FaSearch className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
              {searchError && (
                <p className="text-red-300 text-sm mt-2 text-center">
                  District not found. Please try another search.
                </p>
              )}
            </form>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-6 text-center hover:bg-white/15 transition-all duration-200">
              <div className="text-3xl font-bold text-cyan-400 mb-2">64</div>
              <p className="text-gray-200">Districts Covered</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-6 text-center hover:bg-white/15 transition-all duration-200">
              <div className="text-3xl font-bold text-blue-400 mb-2">50K+</div>
              <p className="text-gray-200">Deliveries Completed</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-6 text-center hover:bg-white/15 transition-all duration-200">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                24/7
              </div>
              <p className="text-gray-200">Service Availability</p>
            </div>
          </div>

          {/* Map Container */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-2xl mb-8">
            <MapContainer
              center={position}
              zoom={8}
              scrollWheelZoom={true}
              className="h-[600px] md:h-[700px] w-full"
              ref={mapRef}
              attributionControl={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {serviceCenter.map((center, i) => (
                <Marker key={i} position={[center.latitude, center.longitude]}>
                  <Popup>
                    <div className="font-semibold text-gray-800">
                      {center.district}
                    </div>
                    <div className="text-sm text-gray-700 mt-1">
                      Service Areas: {center.covered_area.join(", ")}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-8 hover:bg-white/15 transition-all duration-200">
              <h3 className="text-xl font-bold text-white mb-4">
                Why Choose Us?
              </h3>
              <ul className="space-y-3 text-gray-200">
                <li className="flex items-start space-x-3">
                  <span className="text-blue-400 font-bold">✓</span>
                  <span>Nationwide coverage across 64 districts</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-400 font-bold">✓</span>
                  <span>Fast and reliable delivery service</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-400 font-bold">✓</span>
                  <span>Real-time tracking available</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-400 font-bold">✓</span>
                  <span>24/7 customer support</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-8 hover:bg-white/15 transition-all duration-200">
              <h3 className="text-xl font-bold text-white mb-4">
                Service Details
              </h3>
              <ul className="space-y-3 text-gray-200">
                <li className="flex items-start space-x-3">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>Average delivery time: 1-3 business days</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>Insured packages up to BDT 50,000</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>Eco-friendly packaging available</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>Competitive pricing in all areas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
