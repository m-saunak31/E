import React, { useState, useEffect } from 'react';
import Header from '../ui/Header';
import CartModal from '../ui/CartModal';
import AuthModal from '../ui/AuthModal';
import { FileText, Scale, ShoppingCart, Shield, AlertCircle, Calendar } from 'lucide-react';

export default function TermsOfService() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      title: 'Orders & Purchases',
      content: [
        'All orders are subject to acceptance and product availability',
        'Prices are subject to change without notice until order confirmation',
        'Payment must be received before order processing',
        'We reserve the right to cancel orders for any reason'
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Product Information',
      content: [
        'We strive for accuracy in all product descriptions and images',
        'Colors may vary due to monitor settings and lighting',
        'Prescription requirements must be provided by licensed professionals',
        'Virtual try-on is for reference only and may not reflect exact fit'
      ]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: 'User Responsibilities',
      content: [
        'Provide accurate information for orders and account creation',
        'Maintain confidentiality of your account credentials',
        'Use our services in compliance with applicable laws',
        'Report any unauthorized use of your account immediately'
      ]
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: 'Limitations & Liability',
      content: [
        'Our liability is limited to the purchase price of products',
        'We are not responsible for indirect or consequential damages',
        'Service availability may be interrupted for maintenance',
        'These terms are governed by the laws of New York State'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <div className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full text-sm text-[#d4af37] font-medium shadow-sm mb-6">
            <FileText className="w-4 h-4 mr-2" />
            Legal Agreement
          </div>
          <h1 className="text-5xl lg:text-6xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Terms of <span className="text-[#d4af37]">Service</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            These terms govern your use of EyeLura's services and products. Please read them carefully.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-gray-500">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
              Last updated: January 15, 2025
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Introduction */}
        <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg mb-12 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h2 className="text-2xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Agreement to Terms
          </h2>
          <p className="text-gray-300 leading-relaxed font-light mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            By accessing and using EyeLura's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
          <p className="text-gray-300 leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            These terms apply to all visitors, users, and others who access or use our service.
          </p>
        </div>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div 
              key={index}
              className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
              style={{ transitionDelay: `${(index + 3) * 200}ms` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center text-black">
                  {section.icon}
                </div>
                <h3 className="text-2xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                  {section.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#d4af37] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Returns & Refunds */}
        <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg mt-12 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h3 className="text-2xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Returns & Refunds
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-light text-[#d4af37] mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Return Policy
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-[#d4af37] rounded-full mt-2"></div>
                  <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>30-day return window from delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-[#d4af37] rounded-full mt-2"></div>
                  <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Items must be in original condition</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-[#d4af37] rounded-full mt-2"></div>
                  <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Free return shipping provided</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-light text-[#d4af37] mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Refund Process
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-[#d4af37] rounded-full mt-2"></div>
                  <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Refunds processed within 5-7 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-[#d4af37] rounded-full mt-2"></div>
                  <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Original payment method used</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-[#d4af37] rounded-full mt-2"></div>
                  <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Email confirmation sent</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Changes to Terms */}
        <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg mt-8 transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h3 className="text-2xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Changes to Terms
          </h3>
          <p className="text-gray-300 leading-relaxed font-light mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes constitutes acceptance of the new terms.
          </p>
          <p className="text-gray-300 leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            We recommend reviewing these terms periodically for any updates.
          </p>
        </div>

        {/* Contact */}
        <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg mt-8 text-center transform transition-all duration-1000 delay-1400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <Scale className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
          <h3 className="text-2xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Questions About These Terms?
          </h3>
          <p className="text-gray-300 mb-6 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            Our legal team is available to clarify any questions about these terms.
          </p>
          <a 
            href="mailto:legal@eyelura.com"
            className="bg-[#d4af37] hover:bg-[#e6c14d] text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 inline-block"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
          >
            Contact Legal Team
          </a>
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