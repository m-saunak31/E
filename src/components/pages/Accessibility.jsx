import React, { useState, useEffect } from 'react';
import Header from '../ui/Header';
import CartModal from '../ui/CartModal';
import AuthModal from '../ui/AuthModal';
import { Accessibility as AccessibilityIcon, Eye, Ear, Hand, Heart, Calendar, Mail } from 'lucide-react';

export default function Accessibility() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Visual Accessibility',
      content: [
        'High contrast mode for better visibility',
        'Scalable fonts and adjustable text sizes',
        'Screen reader compatible markup',
        'Alternative text for all images and graphics'
      ]
    },
    {
      icon: <Hand className="w-6 h-6" />,
      title: 'Motor Accessibility',
      content: [
        'Full keyboard navigation support',
        'Large clickable areas for easier interaction',
        'Voice control compatibility',
        'Reduced motion options for sensitive users'
      ]
    },
    {
      icon: <Ear className="w-6 h-6" />,
      title: 'Auditory Accessibility',
      content: [
        'Captions for all video content',
        'Visual indicators for audio alerts',
        'Text alternatives for audio information',
        'Compatible with hearing aid devices'
      ]
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Cognitive Accessibility',
      content: [
        'Clear and simple navigation structure',
        'Consistent layout across all pages',
        'Error prevention and clear error messages',
        'Timeout warnings and extensions available'
      ]
    }
  ];

  const standards = [
    'WCAG 2.1 AA Compliance',
    'Section 508 Standards',
    'ADA Title III Requirements',
    'EN 301 549 European Standard'
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <div className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full text-sm text-[#d4af37] font-medium shadow-sm mb-6">
            <AccessibilityIcon className="w-4 h-4 mr-2" />
            Inclusive Design
          </div>
          <h1 className="text-5xl lg:text-6xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Accessibility <span className="text-[#d4af37]">Statement</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            We're committed to making EyeLura accessible to everyone, regardless of ability or technology.
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
            Our Commitment
          </h2>
          <p className="text-gray-300 leading-relaxed font-light mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            At EyeLura, we believe that everyone deserves access to quality eyewear and an exceptional online shopping experience. We're committed to ensuring our website and services are accessible to people with disabilities.
          </p>
          <p className="text-gray-300 leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            We continuously work to improve accessibility and usability for all our customers, following established guidelines and best practices.
          </p>
        </div>

        {/* Accessibility Features */}
        <div className="space-y-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
              style={{ transitionDelay: `${(index + 3) * 200}ms` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center text-black">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                  {feature.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {feature.content.map((item, itemIndex) => (
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

        {/* Standards Compliance */}
        <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg mt-12 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h3 className="text-2xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Standards & Guidelines
          </h3>
          <p className="text-gray-300 leading-relaxed font-light mb-6" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            Our accessibility efforts are guided by internationally recognized standards and guidelines:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {standards.map((standard, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-3 h-3 bg-[#d4af37] rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                  {standard}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Assistive Technologies */}
        <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg mt-8 transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h3 className="text-2xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Supported Technologies
          </h3>
          <p className="text-gray-300 leading-relaxed font-light mb-6" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            Our website is designed to work with a wide range of assistive technologies:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-3">
                <Eye className="w-8 h-8 text-black" />
              </div>
              <h4 className="text-lg font-light text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Screen Readers
              </h4>
              <p className="text-gray-400 text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                JAWS, NVDA, VoiceOver
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-3">
                <Hand className="w-8 h-8 text-black" />
              </div>
              <h4 className="text-lg font-light text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Voice Control
              </h4>
              <p className="text-gray-400 text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                Dragon, Voice Control
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-3">
                <AccessibilityIcon className="w-8 h-8 text-black" />
              </div>
              <h4 className="text-lg font-light text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Switch Navigation
              </h4>
              <p className="text-gray-400 text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                Switch Control, Eye Gaze
              </p>
            </div>
          </div>
        </div>

        {/* Ongoing Efforts */}
        <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg mt-8 transform transition-all duration-1000 delay-1400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h3 className="text-2xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Ongoing Improvements
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-light text-[#d4af37] mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Current Initiatives
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-[#d4af37] rounded-full mt-2"></div>
                  <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Regular accessibility audits</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-[#d4af37] rounded-full mt-2"></div>
                  <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>User testing with disabled users</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-[#d4af37] rounded-full mt-2"></div>
                  <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Staff accessibility training</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-light text-[#d4af37] mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Future Plans
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-[#d4af37] rounded-full mt-2"></div>
                  <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Enhanced AR try-on accessibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-[#d4af37] rounded-full mt-2"></div>
                  <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Multi-language support</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-[#d4af37] rounded-full mt-2"></div>
                  <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Advanced personalization options</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg mt-8 text-center transform transition-all duration-1000 delay-1600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <Mail className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
          <h3 className="text-2xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Help Us Improve
          </h3>
          <p className="text-gray-300 mb-6 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            Your feedback helps us create a more accessible experience for everyone. Let us know how we can improve.
          </p>
          <a 
            href="mailto:accessibility@eyelura.com"
            className="bg-[#d4af37] hover:bg-[#e6c14d] text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 inline-block"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
          >
            Send Accessibility Feedback
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