import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin, Heart, Star, Shield, Truck, RotateCcw } from 'lucide-react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('footer-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer id="footer-section" className="relative bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#d4af37] rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#d4af37] rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#d4af37] rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className={`border-b border-gray-800/50 py-24 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
            <div className="text-center max-w-4xl mx-auto space-y-8">
              
              {/* Badge */}
              <div className="inline-flex items-center px-6 py-3 bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-full text-sm text-[#d4af37] font-medium shadow-lg">
                <span className="w-2 h-2 bg-[#d4af37] rounded-full mr-3 animate-pulse"></span>
                Exclusive Updates
              </div>

              {/* Headline */}
              <h2 className="text-5xl lg:text-6xl font-light text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Stay in <span className="text-[#d4af37] relative">
                  Focus
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#d4af37] rounded-full animate-pulse"></div>
                </span>
              </h2>
              
              {/* Subtext */}
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                Get exclusive deals, new arrivals, and <span className="text-[#d4af37] font-medium">student discounts</span> delivered to your inbox.
              </p>

              {/* Newsletter Form */}
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto pt-6">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 text-white placeholder-gray-500 shadow-lg"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="group bg-[#d4af37] hover:bg-[#e6c14d] text-black px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl whitespace-nowrap flex items-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
                >
                  {isSubscribed ? (
                    <>
                      <Heart className="w-5 h-5 fill-current" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe Now
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-gray-500">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#d4af37]" />
                  <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>No spam, ever</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#d4af37]" />
                  <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Exclusive offers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#d4af37]" />
                  <span className="text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Early access</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className={`py-24 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-5xl font-light text-[#d4af37] mb-6 cursor-pointer hover:text-[#e6c14d] transition-colors duration-300" 
                    style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}
                    onClick={() => handleNavigation('/')}>
                  EyeLura
                </h2>
                <p className="text-gray-300 mb-8 leading-relaxed text-lg max-w-md font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                  Redefining eyewear for the modern generation. Premium quality, affordable prices, and cutting-edge virtual try-on technology.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300 hover:text-[#d4af37] transition-colors duration-300 cursor-pointer">
                  <Mail className="w-5 h-5" />
                  <span className="font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>support@eyelura.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-[#d4af37] transition-colors duration-300 cursor-pointer">
                  <Phone className="w-5 h-5" />
                  <span className="font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-[#d4af37] transition-colors duration-300 cursor-pointer">
                  <MapPin className="w-5 h-5" />
                  <span className="font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>123 Vision Street, NY 10001</span>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="space-y-6">
                <h4 className="text-white font-light text-lg" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>Follow Our Journey</h4>
                <div className="flex space-x-4">
                  <a href="#" className="group w-12 h-12 bg-gray-900/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-700 hover:border-[#d4af37] hover:bg-[#d4af37] transition-all duration-300 transform hover:scale-110">
                    <Instagram className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors duration-300" />
                  </a>
                  <a href="#" className="group w-12 h-12 bg-gray-900/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-700 hover:border-[#d4af37] hover:bg-[#d4af37] transition-all duration-300 transform hover:scale-110">
                    <Facebook className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors duration-300" />
                  </a>
                  <a href="#" className="group w-12 h-12 bg-gray-900/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-700 hover:border-[#d4af37] hover:bg-[#d4af37] transition-all duration-300 transform hover:scale-110">
                    <Twitter className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors duration-300" />
                  </a>
                  <a href="#" className="group w-12 h-12 bg-gray-900/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-700 hover:border-[#d4af37] hover:bg-[#d4af37] transition-all duration-300 transform hover:scale-110">
                    <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Shop Column */}
            <div className="space-y-6">
              <h3 className="text-xl font-light text-white mb-6 relative" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Shop
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#d4af37] rounded-full"></div>
              </h3>
              <ul className="space-y-4">
                <li><button onClick={() => handleNavigation('/shop')} className="text-gray-300 hover:text-[#d4af37] transition-colors duration-300 text-base font-light block text-left" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>All Collections</button></li>
                <li><button onClick={() => handleNavigation('/kids')} className="text-gray-300 hover:text-[#d4af37] transition-colors duration-300 text-base font-light block text-left" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Kids Collection</button></li>
                <li><button onClick={() => handleNavigation('/shop?category=new')} className="text-gray-300 hover:text-[#d4af37] transition-colors duration-300 text-base font-light block text-left" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>New Arrivals</button></li>
                <li><button onClick={() => handleNavigation('/shop?category=bestsellers')} className="text-gray-300 hover:text-[#d4af37] transition-colors duration-300 text-base font-light block text-left" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Best Sellers</button></li>
                <li><a href="#try-on" className="text-gray-300 hover:text-[#d4af37] transition-colors duration-300 text-base font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>AR Try-On</a></li>
                <li><button onClick={() => handleNavigation('/shop?category=limited')} className="text-gray-300 hover:text-[#d4af37] transition-colors duration-300 text-base font-light block text-left" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Limited Editions</button></li>
              </ul>
            </div>

            {/* Students & Deals */}
            <div className="space-y-6">
              <h3 className="text-xl font-light text-white mb-6 relative" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Students & Deals
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#d4af37] rounded-full"></div>
              </h3>
              <ul className="space-y-4">
                <li><button onClick={() => handleNavigation('/student-discount')} className="text-gray-300 hover:text-[#d4af37] transition-colors duration-300 text-base font-light block text-left" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Student Discount</button></li>
                <li><button onClick={() => handleNavigation('/first-time-buyer')} className="text-gray-300 hover:text-[#d4af37] transition-colors duration-300 text-base font-light block text-left" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>First-Time Buyer</button></li>
                <li><button onClick={() => handleNavigation('/prescription-deals')} className="text-gray-300 hover:text-[#d4af37] transition-colors duration-300 text-base font-light block text-left" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Prescription Deals</button></li>
                <li><button onClick={() => handleNavigation('/bulk-orders')} className="text-gray-300 hover:text-[#d4af37] transition-colors duration-300 text-base font-light block text-left" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Bulk Orders</button></li>
              </ul>
            </div>

            {/* Support Column */}
            <div className="space-y-6">
              <h3 className="text-xl font-light text-white mb-6 relative" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Support
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#d4af37] rounded-full"></div>
              </h3>
              <ul className="space-y-4">
                <li><button onClick={() => handleNavigation('/contact')} className="text-gray-300 hover:text-[#d4af37] transition-colors duration-300 text-base font-light block text-left" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Contact Us</button></li>
                <li><button onClick={() => handleNavigation('/about')} className="text-gray-300 hover:text-[#d4af37] transition-colors duration-300 text-base font-light block text-left" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>About Us</button></li>
                <li><button onClick={() => handleNavigation('/size-guide')} className="text-gray-300 hover:text-[#d4af37] transition-colors duration-300 text-base font-light block text-left" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Size Guide</button></li>
                <li><button onClick={() => handleNavigation('/shipping-returns')} className="text-gray-300 hover:text-[#d4af37] transition-colors duration-300 text-base font-light block text-left" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Shipping & Returns</button></li>
                <li><button onClick={() => handleNavigation('/faq')} className="text-gray-300 hover:text-[#d4af37] transition-colors duration-300 text-base font-light block text-left" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>FAQ</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`border-t border-gray-800/50 py-12 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="text-gray-400 text-base font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                © 2025 EyeLura. Crafted with <Heart className="w-4 h-4 inline text-[#d4af37] fill-current mx-1" /> for clear vision.
              </div>
              <div className="flex flex-wrap items-center gap-6 text-base">
                <button onClick={() => handleNavigation('/privacy')} className="text-gray-400 hover:text-[#d4af37] transition-colors duration-300 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Privacy Policy</button>
                <span className="text-gray-600">•</span>
                <button onClick={() => handleNavigation('/terms')} className="text-gray-400 hover:text-[#d4af37] transition-colors duration-300 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Terms of Service</button>
                <span className="text-gray-600">•</span>
                <button onClick={() => handleNavigation('/accessibility')} className="text-gray-400 hover:text-[#d4af37] transition-colors duration-300 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Accessibility</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}