import React, { useState, useEffect } from 'react';
import Header from '../ui/Header';
import CartModal from '../ui/CartModal';
import AuthModal from '../ui/AuthModal';
import { Shield, Eye, Lock, Users, Mail, Calendar } from 'lucide-react';

export default function PrivacyPolicy() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Information We Collect',
      content: [
        'Personal information you provide when creating an account or making a purchase',
        'Usage data and analytics to improve our services',
        'Device information and browser data for security purposes',
        'Communication preferences and marketing consent'
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'How We Use Your Information',
      content: [
        'Process orders and provide customer support',
        'Improve our products and services',
        'Send important updates about your orders',
        'Provide personalized recommendations (with your consent)'
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Information Sharing',
      content: [
        'We never sell your personal information to third parties',
        'Trusted service providers help us operate our business',
        'Legal compliance when required by law',
        'Business transfers only with equivalent privacy protection'
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Data Security',
      content: [
        'Industry-standard encryption for all data transmission',
        'Secure servers with regular security audits',
        'Limited access to personal information by employees',
        'Regular security training for all team members'
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
            <Shield className="w-4 h-4 mr-2" />
            Your Privacy Matters
          </div>
          <h1 className="text-5xl lg:text-6xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Privacy <span className="text-[#d4af37]">Policy</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            We're committed to protecting your privacy and being transparent about how we handle your data.
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
            Our Commitment to You
          </h2>
          <p className="text-gray-300 leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            At EyeLura, we believe privacy is a fundamental right. This policy explains how we collect, use, and protect your personal information when you use our website and services. We're committed to being transparent and giving you control over your data.
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

        {/* Your Rights */}
        <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg mt-12 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h3 className="text-2xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Your Rights
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-light text-[#d4af37] mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Access & Control
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-[#d4af37] rounded-full"></div>
                  <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Request a copy of your data</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-[#d4af37] rounded-full"></div>
                  <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Update or correct your information</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-[#d4af37] rounded-full"></div>
                  <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Delete your account and data</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-light text-[#d4af37] mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Communication
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-[#d4af37] rounded-full"></div>
                  <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Opt out of marketing emails</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-[#d4af37] rounded-full"></div>
                  <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Control cookie preferences</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-[#d4af37] rounded-full"></div>
                  <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Report privacy concerns</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg mt-8 text-center transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <Mail className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
          <h3 className="text-2xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Questions About Privacy?
          </h3>
          <p className="text-gray-300 mb-6 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            Our privacy team is here to help with any questions or concerns.
          </p>
          <a 
            href="mailto:privacy@eyelura.com"
            className="bg-[#d4af37] hover:bg-[#e6c14d] text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 inline-block"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
          >
            Contact Privacy Team
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