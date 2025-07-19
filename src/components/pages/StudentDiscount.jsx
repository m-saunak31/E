import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../ui/Header';
import CartModal from '../ui/CartModal';
import AuthModal from '../ui/AuthModal';
import { GraduationCap, Check, Star, Users, Gift, ArrowRight, Shield, Percent } from 'lucide-react';

export default function StudentDiscount() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleVerification = (e) => {
    e.preventDefault();
    if (email && studentId) {
      setIsVerified(true);
    }
  };

  const benefits = [
    { icon: <Percent className="w-6 h-6" />, title: '20% Off All Frames', description: 'Exclusive student pricing on our entire collection' },
    { icon: <Gift className="w-6 h-6" />, title: 'Free Shipping', description: 'Complimentary shipping on all student orders' },
    { icon: <Shield className="w-6 h-6" />, title: 'Extended Warranty', description: '3-year warranty instead of standard 2-year' },
    { icon: <Star className="w-6 h-6" />, title: 'Priority Support', description: 'Dedicated student support team' }
  ];

  const eligibleInstitutions = [
    'Universities & Colleges',
    'Community Colleges',
    'Graduate Schools',
    'Trade Schools',
    'Online Universities',
    'International Students'
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <div className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full text-sm text-[#d4af37] font-medium shadow-sm mb-6">
            <GraduationCap className="w-4 h-4 mr-2" />
            Student Exclusive
          </div>
          <h1 className="text-5xl lg:text-6xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Student <span className="text-[#d4af37]">Discount</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            Exclusive 20% discount for students. Premium eyewear made affordable for your academic journey.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Verification Form */}
          <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg">
              {!isVerified ? (
                <>
                  <h2 className="text-3xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                    Verify Your Student Status
                  </h2>
                  <form onSubmit={handleVerification} className="space-y-6">
                    <div>
                      <label className="block text-gray-300 font-light mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                        Student Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                        placeholder="your.name@university.edu"
                        required
                        style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-light mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                        Student ID or Institution Name
                      </label>
                      <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                        placeholder="Student ID or University Name"
                        required
                        style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#d4af37] hover:bg-[#e6c14d] text-black py-4 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
                    >
                      <Shield className="w-5 h-5" />
                      Verify Student Status
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                    Verification Complete!
                  </h2>
                  <p className="text-gray-300 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                    Your student discount is now active. Start shopping with 20% off!
                  </p>
                  <button
                    onClick={() => navigate('/shop')}
                    className="bg-[#d4af37] hover:bg-[#e6c14d] text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
                  >
                    Start Shopping
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Benefits */}
          <div className={`space-y-8 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
            <h2 className="text-3xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
              Student Benefits
            </h2>
            <div className="grid gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center text-black flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-light text-white mb-1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                        {benefit.title}
                      </h3>
                      <p className="text-gray-400 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Eligible Institutions */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Eligible Institutions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {eligibleInstitutions.map((institution, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#d4af37]" />
                    <span className="text-gray-300 text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                      {institution}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-20 text-center transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="text-4xl font-light text-[#d4af37] mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                25K+
              </div>
              <div className="text-gray-300 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                Students Verified
              </div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="text-4xl font-light text-[#d4af37] mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                500+
              </div>
              <div className="text-gray-300 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                Partner Universities
              </div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="text-4xl font-light text-[#d4af37] mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                $2M+
              </div>
              <div className="text-gray-300 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                Student Savings
              </div>
            </div>
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