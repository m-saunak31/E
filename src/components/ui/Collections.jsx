import React, { useState, useEffect } from 'react';
import { ArrowRight, Eye, Sparkles, Star } from 'lucide-react';

const collections = [
  {
    title: 'Sunglasses',
    description: 'Timeless designs crafted from premium materials, offering both style and UV protection for every occasion.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80',
    link: '#products',
    badge: 'UV Protection',
    price: 'From $39',
    features: ['100% UV Protection', 'Premium Materials', 'Lightweight Design']
  },
  {
    title: 'Frames',
    description: 'Contemporary frames that blend cutting-edge materials with minimalist design philosophy for everyday wear.',
    image: 'https://i.ibb.co/XkXbMGrZ/lensabl-0-Gf-Plommtx-M-unsplash.jpg',
    link: '#products',
    badge: 'Blue Light Filter',
    price: 'From $29',
    features: ['Blue Light Protection', 'Student Discounts', 'AR Try-On Ready']
  }
];

export default function Collections() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background decorative elements - matching Hero */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#d4af37] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#d4af37] rounded-full blur-2xl"></div>
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div 
              key={i} 
              className="border border-gray-200 animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-sm text-[#d4af37] font-medium shadow-sm mb-6">
              <span className="w-2 h-2 bg-[#d4af37] rounded-full mr-2 animate-pulse"></span>
              Premium Collection
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Signature{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#d4af37] to-[#d4af37] bg-clip-text text-transparent">
                  Collections
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#d4af37] to-[#d4af37] rounded-full transform scale-x-100 animate-pulse"></div>
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Meticulously curated eyewear that defines contemporary luxury and timeless sophistication.
              <span className="text-[#d4af37] font-semibold"> Student discounts available</span> on all frames.
            </p>
          </div>

          {/* Collections Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {collections.map((item, index) => (
              <div
                key={index}
                className={`group relative transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Glowing border effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#d4af37] to-[#d4af37] rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                
                {/* Card Container */}
                <div className="relative bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-3xl transform hover:-translate-y-2">
                  
                  {/* Image Container */}
                  <div className="relative h-80 md:h-96 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Overlay elements */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-[#d4af37] text-sm font-medium shadow-lg">
                      {item.badge}
                    </div>
                    
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-gray-800 text-sm font-medium shadow-lg">
                      {item.price}
                    </div>

                    {/* Floating elements */}
                    <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-[#d4af37] to-[#d4af37] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 animate-bounce">
                      <span className="text-white text-xl">✨</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-[#d4af37] transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      {item.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                      {item.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-700">
                          <div className="w-6 h-6 bg-gradient-to-r from-[#d4af37] to-[#d4af37] rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <a
                      href={item.link}
                      className="group/btn relative bg-gradient-to-r from-[#d4af37] to-[#d4af37] hover:from-[#c9a030] hover:to-[#c9a030] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl inline-flex items-center gap-3"
                    >
                      <span className="relative z-10">Explore {item.title}</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#b9992e] to-[#b9992e] rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof Section */}
          <div className={`text-center mb-12 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="flex items-center justify-center gap-6 text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#d4af37] to-[#d4af37] rounded-full border-2 border-white shadow-sm"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-[#d4af37] to-[#d4af37] rounded-full border-2 border-white shadow-sm"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-[#d4af37] to-[#d4af37] rounded-full border-2 border-white shadow-sm"></div>
                </div>
                <span className="text-sm">10K+ happy customers</span>
              </div>
              <div className="text-sm">
                <span className="text-[#d4af37] font-semibold">4.9/5</span> rating
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#try-on" className="group relative bg-gradient-to-r from-[#d4af37] to-[#d4af37] hover:from-[#c9a030] hover:to-[#c9a030] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <span className="relative z-10">AR Try On</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#b9992e] to-[#b9992e] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a href="#collections" className="group border-2 border-gray-300 hover:border-[#d4af37] text-gray-700 hover:text-[#d4af37] px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-[#f8f3e0]">
                View All Collections
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}