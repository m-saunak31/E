import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../ui/Header';
import CartModal from '../ui/CartModal';
import AuthModal from '../ui/AuthModal';
import { Eye, Percent, Shield, Clock, Star, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrescriptionDeals() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const deals = [
    {
      title: 'Complete Prescription Package',
      discount: '30%',
      originalPrice: 2499,
      salePrice: 1749,
      features: ['Premium Lenses', 'Anti-Glare Coating', 'UV Protection', 'Scratch Resistant'],
      popular: true
    },
    {
      title: 'Progressive Lens Special',
      discount: '25%',
      originalPrice: 3499,
      salePrice: 2624,
      features: ['Progressive Lenses', 'Blue Light Filter', 'Transition Coating', 'Premium Frame'],
      popular: false
    },
    {
      title: 'Student Prescription Deal',
      discount: '40%',
      originalPrice: 1999,
      salePrice: 1199,
      features: ['Basic Prescription', 'Blue Light Protection', 'Student Verification', 'Free Case'],
      popular: false
    }
  ];

  const services = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Free Eye Test',
      description: 'Professional eye examination at partner locations'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Prescription Guarantee',
      description: '100% accuracy guarantee or free remake'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Fast Processing',
      description: '3-5 business days for prescription glasses'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <div className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full text-sm text-[#d4af37] font-medium shadow-sm mb-6">
            <Eye className="w-4 h-4 mr-2" />
            Prescription Specialists
          </div>
          <h1 className="text-5xl lg:text-6xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Prescription <span className="text-[#d4af37]">Deals</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            Premium prescription eyewear at unbeatable prices. Clear vision shouldn't cost a fortune.
          </p>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {deals.map((deal, index) => (
              <motion.div
                key={index}
                className={`relative bg-gray-900/50 backdrop-blur-sm border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 ${
                  deal.popular ? 'border-[#d4af37] shadow-lg shadow-[#d4af37]/20' : 'border-gray-800'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {deal.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#d4af37] text-black px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-[#d4af37] mb-2">
                    {deal.discount} OFF
                  </div>
                  <h3 className="text-xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                    {deal.title}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-white">₹{deal.salePrice}</span>
                    <span className="text-lg text-gray-500 line-through">₹{deal.originalPrice}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {deal.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-[#d4af37]" />
                      <span className="font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate('/shop')}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    deal.popular
                      ? 'bg-[#d4af37] hover:bg-[#e6c14d] text-black'
                      : 'border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
                >
                  Get This Deal
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
              Our Prescription Services
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-4 text-black">
                  {service.icon}
                </div>
                <h3 className="text-xl font-light text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                  {service.title}
                </h3>
                <p className="text-gray-400 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                  {service.description}
                </p>
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