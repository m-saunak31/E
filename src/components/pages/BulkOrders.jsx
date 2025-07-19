import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../ui/Header';
import CartModal from '../ui/CartModal';
import AuthModal from '../ui/AuthModal';
import { Users, Building, GraduationCap, Heart, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BulkOrders() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [formData, setFormData] = useState({
    organizationType: '',
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    quantity: '',
    message: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Bulk order inquiry:', formData);
    // Handle form submission
  };

  const tiers = [
    {
      quantity: '10-49 Units',
      discount: '15%',
      features: ['Volume Pricing', 'Dedicated Support', 'Custom Packaging'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      quantity: '50-99 Units',
      discount: '25%',
      features: ['Enhanced Discount', 'Priority Processing', 'Custom Branding', 'Free Shipping'],
      color: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      quantity: '100+ Units',
      discount: '35%',
      features: ['Maximum Savings', 'Account Manager', 'Custom Design', 'Flexible Payment'],
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const clientTypes = [
    {
      icon: <Building className="w-8 h-8" />,
      title: 'Corporate',
      description: 'Employee benefits and corporate gifting programs'
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Educational',
      description: 'Schools, universities, and educational institutions'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Healthcare',
      description: 'Hospitals, clinics, and healthcare organizations'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Organizations',
      description: 'Non-profits, clubs, and community groups'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <div className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full text-sm text-[#d4af37] font-medium shadow-sm mb-6">
            <Users className="w-4 h-4 mr-2" />
            Volume Discounts Available
          </div>
          <h1 className="text-5xl lg:text-6xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Bulk <span className="text-[#d4af37]">Orders</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            Special pricing for organizations, schools, and businesses. The more you order, the more you save.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Pricing Tiers */}
          <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
            <h2 className="text-3xl font-light text-white mb-8" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
              Volume Pricing Tiers
            </h2>
            
            <div className="space-y-6">
              {tiers.map((tier, index) => (
                <motion.div
                  key={index}
                  className={`relative bg-gray-900/50 backdrop-blur-sm border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 ${
                    tier.popular ? 'border-[#d4af37] shadow-lg shadow-[#d4af37]/20' : 'border-gray-800'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-6">
                      <div className="bg-[#d4af37] text-black px-3 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                        {tier.quantity}
                      </h3>
                      <p className="text-gray-400 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                        Volume discount
                      </p>
                    </div>
                    <div className={`text-3xl font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>
                      {tier.discount}
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-[#d4af37] rounded-full"></div>
                        <span className="font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Request Quote
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 font-light mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                    Organization Type
                  </label>
                  <select
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                    required
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                  >
                    <option value="">Select organization type</option>
                    <option value="corporate">Corporate</option>
                    <option value="educational">Educational</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="nonprofit">Non-Profit</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 font-light mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                      Organization Name
                    </label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                      placeholder="Your organization"
                      required
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-light mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                      Contact Name
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                      required
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 font-light mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                      required
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-light mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                      placeholder="Your phone number"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-light mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                    Estimated Quantity
                  </label>
                  <select
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                    required
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                  >
                    <option value="">Select quantity range</option>
                    <option value="10-49">10-49 units</option>
                    <option value="50-99">50-99 units</option>
                    <option value="100-199">100-199 units</option>
                    <option value="200+">200+ units</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-light mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                    Additional Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your requirements..."
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#d4af37] hover:bg-[#e6c14d] text-black py-4 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
                >
                  Request Quote
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Client Types */}
        <div className={`mt-20 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
              We Serve All Organizations
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {clientTypes.map((type, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-4 text-black">
                  {type.icon}
                </div>
                <h3 className="text-xl font-light text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                  {type.title}
                </h3>
                <p className="text-gray-400 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                  {type.description}
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