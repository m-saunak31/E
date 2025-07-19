import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../ui/Header';
import CartModal from '../ui/CartModal';
import AuthModal from '../ui/AuthModal';
import { Gift, Star, ShoppingCart, Eye, Percent, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FirstTimeBuyer() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const benefits = [
    {
      icon: <Percent className="w-8 h-8" />,
      title: '25% Off First Order',
      description: 'Welcome discount on your first purchase',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: 'Free Premium Case',
      description: 'Complimentary luxury case with every order',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Free AR Try-On',
      description: 'Virtual fitting technology at no extra cost',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: 'Free Shipping',
      description: 'No shipping costs on your first order',
      color: 'from-orange-400 to-red-500'
    }
  ];

  const steps = [
    { step: 1, title: 'Browse Collection', description: 'Explore our premium eyewear selection' },
    { step: 2, title: 'Try Virtual Fitting', description: 'Use AR technology to see how frames look' },
    { step: 3, title: 'Apply Discount', description: 'Get 25% off automatically at checkout' },
    { step: 4, title: 'Enjoy Your Glasses', description: 'Receive your perfect pair with free case' }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <div className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-400/30 mb-8"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 text-green-400 mr-2" />
            <span className="text-green-400 font-semibold">First-Time Buyer Special</span>
            <Gift className="w-5 h-5 text-green-400 ml-2" />
          </motion.div>
          
          <h1 className="text-5xl lg:text-7xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Welcome to <span className="text-[#d4af37]">EyeLura</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light mb-8" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            Start your premium eyewear journey with exclusive first-time buyer benefits
          </p>
          
          <motion.button
            onClick={() => navigate('/shop')}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Claim Your 25% Discount
          </motion.button>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-light text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                  {benefit.title}
                </h3>
                <p className="text-gray-400 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
              How It Works
            </h2>
            <p className="text-xl text-gray-400 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
              Your journey to perfect eyewear in 4 simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
                  {step.step}
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
      </div>

      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
      />
      
      <AuthModal />
    </div>
  );
}