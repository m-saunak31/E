import React, { useState, useEffect } from 'react';
import Header from '../ui/Header';
import CartModal from '../ui/CartModal';
import AuthModal from '../ui/AuthModal';
import { Truck, RotateCcw, Shield, Clock, MapPin, Package } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ShippingReturns() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('shipping');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const shippingOptions = [
    {
      name: 'Standard Shipping',
      time: '5-7 Business Days',
      cost: 'Free on orders ₹999+',
      description: 'Regular delivery to your doorstep',
      icon: <Package className="w-6 h-6" />
    },
    {
      name: 'Express Shipping',
      time: '2-3 Business Days',
      cost: '₹199',
      description: 'Faster delivery for urgent orders',
      icon: <Truck className="w-6 h-6" />
    },
    {
      name: 'Same Day Delivery',
      time: 'Same Day',
      cost: '₹399',
      description: 'Available in select metro cities',
      icon: <Clock className="w-6 h-6" />
    }
  ];

  const returnSteps = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Contact us within 30 days of delivery',
      icon: <RotateCcw className="w-6 h-6" />
    },
    {
      step: 2,
      title: 'Pack Securely',
      description: 'Use original packaging and include all accessories',
      icon: <Package className="w-6 h-6" />
    },
    {
      step: 3,
      title: 'Free Pickup',
      description: 'We arrange free pickup from your location',
      icon: <Truck className="w-6 h-6" />
    },
    {
      step: 4,
      title: 'Quick Refund',
      description: 'Refund processed within 5-7 business days',
      icon: <Shield className="w-6 h-6" />
    }
  ];

  const policies = [
    {
      title: 'Free Shipping',
      description: 'On all orders above ₹999',
      details: ['No minimum order for premium members', 'Applies to standard shipping only', 'Express shipping charges may apply']
    },
    {
      title: '30-Day Returns',
      description: 'Hassle-free returns within 30 days',
      details: ['Items must be in original condition', 'Free return shipping provided', 'Prescription glasses have special terms']
    },
    {
      title: 'Secure Packaging',
      description: 'Premium protective packaging',
      details: ['Shock-resistant cases', 'Eco-friendly materials', 'Tamper-evident sealing']
    },
    {
      title: 'Order Tracking',
      description: 'Real-time tracking for all orders',
      details: ['SMS and email notifications', 'Live tracking updates', 'Delivery confirmation']
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <div className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full text-sm text-[#d4af37] font-medium shadow-sm mb-6">
            <Truck className="w-4 h-4 mr-2" />
            Delivery & Returns
          </div>
          <h1 className="text-5xl lg:text-6xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Shipping & <span className="text-[#d4af37]">Returns</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            Fast, secure delivery and hassle-free returns. Your satisfaction is our priority.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Tab Navigation */}
        <div className={`mb-12 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="flex justify-center">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full p-2">
              <button
                onClick={() => setActiveTab('shipping')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === 'shipping'
                    ? 'bg-[#d4af37] text-black'
                    : 'text-gray-300 hover:text-white'
                }`}
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
              >
                Shipping
              </button>
              <button
                onClick={() => setActiveTab('returns')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === 'returns'
                    ? 'bg-[#d4af37] text-black'
                    : 'text-gray-300 hover:text-white'
                }`}
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
              >
                Returns
              </button>
            </div>
          </div>
        </div>

        {/* Shipping Tab */}
        {activeTab === 'shipping' && (
          <div className="space-y-16">
            {/* Shipping Options */}
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <h2 className="text-3xl font-light text-white mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Shipping Options
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {shippingOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-4 text-black">
                      {option.icon}
                    </div>
                    <h3 className="text-xl font-light text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                      {option.name}
                    </h3>
                    <div className="text-[#d4af37] font-semibold mb-2">{option.time}</div>
                    <div className="text-gray-300 font-medium mb-4">{option.cost}</div>
                    <p className="text-gray-400 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                      {option.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Shipping Zones */}
            <div className={`transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                <h3 className="text-2xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                  Delivery Zones
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-light text-[#d4af37] mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                      Metro Cities
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#d4af37]" />
                        <span className="font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Mumbai, Delhi, Bangalore, Chennai</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#d4af37]" />
                        <span className="font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Hyderabad, Pune, Kolkata, Ahmedabad</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-green-400" />
                        <span className="font-light text-green-400" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Same-day delivery available</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-light text-[#d4af37] mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                      Other Cities
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#d4af37]" />
                        <span className="font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>All major cities and towns</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-blue-400" />
                        <span className="font-light text-blue-400" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Standard & Express delivery</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-purple-400" />
                        <span className="font-light text-purple-400" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Secure packaging guaranteed</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Returns Tab */}
        {activeTab === 'returns' && (
          <div className="space-y-16">
            {/* Return Process */}
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <h2 className="text-3xl font-light text-white mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Easy Return Process
              </h2>
              
              <div className="grid md:grid-cols-4 gap-8">
                {returnSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
                      {step.step}
                    </div>
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-[#d4af37]">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-light text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                      {step.title}
                    </h3>
                    <p className="text-gray-400 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Return Policy Details */}
            <div className={`transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                <h3 className="text-2xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                  Return Policy Details
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-light text-[#d4af37] mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                      What Can Be Returned
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                        <span className="font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Unused items in original packaging</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                        <span className="font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Items with all original accessories</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                        <span className="font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Non-prescription eyewear</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-light text-[#d4af37] mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                      Return Conditions
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                        <span className="font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Prescription glasses (special terms apply)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                        <span className="font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Damaged or modified items</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                        <span className="font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Items returned after 30 days</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Policies Grid */}
        <div className={`mt-16 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
              Our Commitments
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {policies.map((policy, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-lg font-light text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                  {policy.title}
                </h3>
                <p className="text-[#d4af37] font-medium mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}>
                  {policy.description}
                </p>
                <ul className="space-y-1">
                  {policy.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-[#d4af37] rounded-full mt-2"></div>
                      <span className="text-gray-400 text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
      />
      
      <AuthModal />
    </div>
  );
}