import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../ui/Header';
import CartModal from '../ui/CartModal';
import AuthModal from '../ui/AuthModal';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      details: 'support@eyelura.com',
      description: 'Get in touch for any questions'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri 9AM-6PM EST'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      details: '123 Vision Street, NY 10001',
      description: 'Our flagship showroom'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Business Hours',
      details: 'Mon-Fri: 9AM-6PM',
      description: 'Weekend: 10AM-4PM'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <div className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full text-sm text-[#d4af37] font-medium shadow-sm mb-6">
            <span className="w-2 h-2 bg-[#d4af37] rounded-full mr-2 animate-pulse"></span>
            Get in Touch
          </div>
          <h1 className="text-5xl lg:text-6xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Contact <span className="text-[#d4af37]">Us</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            Have questions about our eyewear or need assistance? We're here to help you find the perfect pair.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 font-light mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                      placeholder="Your full name"
                      required
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-light mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                      Email Address
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
                </div>
                <div>
                  <label className="block text-gray-300 font-light mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                    required
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Product Support</option>
                    <option value="student">Student Discount</option>
                    <option value="prescription">Prescription Help</option>
                    <option value="returns">Returns & Exchanges</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 font-light mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                    required
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#d4af37] hover:bg-[#e6c14d] text-black py-4 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className={`space-y-8 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
            <div className="space-y-6">
              <h2 className="text-3xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Get in Touch
              </h2>
              <p className="text-lg text-gray-400 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                We're here to help you with any questions about our products, services, or your order.
              </p>
            </div>

            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center text-black flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-light text-white mb-1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                        {info.title}
                      </h3>
                      <p className="text-[#d4af37] font-medium mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}>
                        {info.details}
                      </p>
                      <p className="text-gray-400 text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                        {info.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Quick Answers
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-light text-gray-300 mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                    How do I get my student discount?
                  </h4>
                  <p className="text-gray-500 text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                    Verify your student status during checkout for instant savings.
                  </p>
                </div>
                <div>
                  <h4 className="font-light text-gray-300 mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                    What's your return policy?
                  </h4>
                  <p className="text-gray-500 text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                    30-day hassle-free returns with free shipping both ways.
                  </p>
                </div>
                <div>
                  <h4 className="font-light text-gray-300 mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                    How does AR try-on work?
                  </h4>
                  <p className="text-gray-500 text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                    Use your device's camera to virtually try on frames in real-time.
                  </p>
                </div>
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