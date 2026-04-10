import React from 'react';
import GlassCard from './GlassCard';
import GlassContainer from './GlassContainer';

const ExampleGlassPage = () => {
  return (
    <GlassContainer className="py-12">
      <GlassCard className="p-8 md:p-12 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to SwiftParcel
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Experience fast, reliable parcel delivery with our modern platform.
        </p>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6" hover>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mb-4">
            <span className="text-white text-2xl">🚀</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Delivery</h3>
          <p className="text-gray-600">Quick and reliable service</p>
        </GlassCard>

        <GlassCard className="p-6" hover>
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4">
            <span className="text-white text-2xl">�</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Live Tracking</h3>
          <p className="text-gray-600">Track your parcel in real-time</p>
        </GlassCard>

        <GlassCard className="p-6" hover>
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl mb-4">
            <span className="text-white text-2xl">🔒</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure</h3>
          <p className="text-gray-600">Your packages are safe with us</p>
        </GlassCard>
      </div>
    </GlassContainer>
  );
};

export default ExampleGlassPage;
