import React from 'react';
import GlassCard from '../Components/GlassCard';
import GlassContainer from '../Components/GlassContainer';
import GlassButton from '../Components/GlassButton';

/**
 * Complete showcase of the glass design system
 * Use this as a reference for implementing glass UI across your app
 */
const GlassDesignShowcase = () => {
  return (
    <GlassContainer className="py-12 space-y-8">
      {/* Hero Section */}
      <GlassCard className="p-12 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          SwiftParcel Delivery
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Fast, reliable, and secure parcel delivery service with real-time tracking
        </p>
        <div className="flex gap-4 justify-center">
          <GlassButton variant="primary" size="lg">
            Get Started
          </GlassButton>
          <GlassButton variant="secondary" size="lg">
            Learn More
          </GlassButton>
        </div>
      </GlassCard>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <GlassCard key={index} className="p-6" hover>
            <div className={`w-14 h-14 ${feature.gradient} rounded-2xl mb-4 flex items-center justify-center text-2xl`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* Stats Section */}
      <GlassCard className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* CTA Section */}
      <GlassCard className="p-12 text-center bg-gradient-to-br from-blue-50/80 to-purple-50/80">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Ready to ship with us?
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Join thousands of satisfied customers who trust SwiftParcel for their delivery needs
        </p>
        <GlassButton variant="primary" size="lg">
          Start Shipping Now
        </GlassButton>
      </GlassCard>
    </GlassContainer>
  );
};

const features = [
  {
    icon: '🚀',
    title: 'Fast Delivery',
    description: 'Same-day delivery available in major cities',
    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500'
  },
  {
    icon: '📍',
    title: 'Live Tracking',
    description: 'Track your parcel in real-time with GPS',
    gradient: 'bg-gradient-to-br from-purple-500 to-pink-500'
  },
  {
    icon: '🔒',
    title: 'Secure Handling',
    description: 'Your packages are insured and protected',
    gradient: 'bg-gradient-to-br from-indigo-500 to-blue-500'
  },
  {
    icon: '💰',
    title: 'Best Prices',
    description: 'Competitive rates with no hidden fees',
    gradient: 'bg-gradient-to-br from-green-500 to-emerald-500'
  },
  {
    icon: '📦',
    title: 'Easy Booking',
    description: 'Book your delivery in just a few clicks',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-500'
  },
  {
    icon: '🌍',
    title: 'Wide Coverage',
    description: 'Delivering to 100+ cities nationwide',
    gradient: 'bg-gradient-to-br from-teal-500 to-cyan-500'
  }
];

const stats = [
  { value: '50K+', label: 'Deliveries' },
  { value: '98%', label: 'On-Time Rate' },
  { value: '24/7', label: 'Support' },
  { value: '100+', label: 'Cities' }
];

export default GlassDesignShowcase;
