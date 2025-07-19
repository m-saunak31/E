import React, { useState, useEffect } from 'react';
import Header from '../ui/Header';
import CartModal from '../ui/CartModal';
import AuthModal from '../ui/AuthModal';
import { Ruler, Eye, Info, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SizeGuide() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('adults');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const adultSizes = [
    { size: 'XS', frameWidth: '125-130mm', lensWidth: '45-48mm', bridgeWidth: '14-16mm', templeLength: '135-140mm', faceShape: 'Narrow' },
    { size: 'S', frameWidth: '130-135mm', lensWidth: '48-52mm', bridgeWidth: '16-18mm', templeLength: '140-145mm', faceShape: 'Small to Medium' },
    { size: 'M', frameWidth: '135-140mm', lensWidth: '52-56mm', bridgeWidth: '18-20mm', templeLength: '145-150mm', faceShape: 'Medium' },
    { size: 'L', frameWidth: '140-145mm', lensWidth: '56-60mm', bridgeWidth: '20-22mm', templeLength: '150-155mm', faceShape: 'Large' },
    { size: 'XL', frameWidth: '145mm+', lensWidth: '60mm+', bridgeWidth: '22mm+', templeLength: '155mm+', faceShape: 'Extra Large' }
  ];

  const kidsSizes = [
    { size: 'XXS', frameWidth: '110-115mm', lensWidth: '40-43mm', bridgeWidth: '12-14mm', templeLength: '120-125mm', ageRange: '2-4 years' },
    { size: 'XS', frameWidth: '115-120mm', lensWidth: '43-46mm', bridgeWidth: '14-16mm', templeLength: '125-130mm', ageRange: '4-6 years' },
    { size: 'S', frameWidth: '120-125mm', lensWidth: '46-49mm', bridgeWidth: '16-18mm', templeLength: '130-135mm', ageRange: '6-8 years' },
    { size: 'M', frameWidth: '125-130mm', lensWidth: '49-52mm', bridgeWidth: '18-20mm', templeLength: '135-140mm', ageRange: '8-12 years' }
  ];

  const measurementTips = [
    {
      title: 'Frame Width',
      description: 'Total width of the frame from temple to temple',
      tip: 'Should match your face width for comfortable fit'
    },
    {
      title: 'Lens Width',
      description: 'Horizontal width of each lens',
      tip: 'Affects the overall look and coverage area'
    },
    {
      title: 'Bridge Width',
      description: 'Distance between the lenses over your nose',
      tip: 'Critical for comfort and proper positioning'
    },
    {
      title: 'Temple Length',
      description: 'Length of the arms from hinge to ear',
      tip: 'Should rest comfortably behind your ears'
    }
  ];

  const faceShapes = [
    {
      shape: 'Round',
      characteristics: 'Equal width and height, soft curves',
      recommended: 'Angular, rectangular frames',
      avoid: 'Round, small frames'
    },
    {
      shape: 'Square',
      characteristics: 'Strong jawline, broad forehead',
      recommended: 'Round, oval frames',
      avoid: 'Square, geometric frames'
    },
    {
      shape: 'Oval',
      characteristics: 'Balanced proportions, slightly wider cheekbones',
      recommended: 'Most frame styles work well',
      avoid: 'Frames that are too large or too small'
    },
    {
      shape: 'Heart',
      characteristics: 'Wide forehead, narrow chin',
      recommended: 'Bottom-heavy frames, aviators',
      avoid: 'Top-heavy, decorative frames'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <div className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full text-sm text-[#d4af37] font-medium shadow-sm mb-6">
            <Ruler className="w-4 h-4 mr-2" />
            Perfect Fit Guide
          </div>
          <h1 className="text-5xl lg:text-6xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Size <span className="text-[#d4af37]">Guide</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            Find your perfect fit with our comprehensive sizing guide and face shape recommendations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Category Selector */}
        <div className={`mb-12 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="flex justify-center">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full p-2">
              <button
                onClick={() => setSelectedCategory('adults')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === 'adults'
                    ? 'bg-[#d4af37] text-black'
                    : 'text-gray-300 hover:text-white'
                }`}
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
              >
                Adults
              </button>
              <button
                onClick={() => setSelectedCategory('kids')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === 'kids'
                    ? 'bg-[#d4af37] text-black'
                    : 'text-gray-300 hover:text-white'
                }`}
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
              >
                Kids
              </button>
            </div>
          </div>
        </div>

        {/* Size Chart */}
        <div className={`mb-16 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-light text-white mb-8" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                {selectedCategory === 'adults' ? 'Adult' : 'Kids'} Size Chart
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-4 px-4 text-[#d4af37] font-medium">Size</th>
                      <th className="text-left py-4 px-4 text-[#d4af37] font-medium">Frame Width</th>
                      <th className="text-left py-4 px-4 text-[#d4af37] font-medium">Lens Width</th>
                      <th className="text-left py-4 px-4 text-[#d4af37] font-medium">Bridge Width</th>
                      <th className="text-left py-4 px-4 text-[#d4af37] font-medium">Temple Length</th>
                      <th className="text-left py-4 px-4 text-[#d4af37] font-medium">
                        {selectedCategory === 'adults' ? 'Face Shape' : 'Age Range'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedCategory === 'adults' ? adultSizes : kidsSizes).map((size, index) => (
                      <motion.tr
                        key={index}
                        className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <td className="py-4 px-4 text-white font-semibold">{size.size}</td>
                        <td className="py-4 px-4 text-gray-300">{size.frameWidth}</td>
                        <td className="py-4 px-4 text-gray-300">{size.lensWidth}</td>
                        <td className="py-4 px-4 text-gray-300">{size.bridgeWidth}</td>
                        <td className="py-4 px-4 text-gray-300">{size.templeLength}</td>
                        <td className="py-4 px-4 text-gray-300">
                          {selectedCategory === 'adults' ? size.faceShape : size.ageRange}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Measurement Guide */}
        <div className={`mb-16 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
              How to Measure
            </h2>
            <p className="text-xl text-gray-400 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
              Understanding frame measurements for the perfect fit
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {measurementTips.map((tip, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ruler className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg font-light text-white mb-2 text-center" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                  {tip.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3 text-center font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                  {tip.description}
                </p>
                <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-lg p-3">
                  <p className="text-[#d4af37] text-xs text-center font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                    💡 {tip.tip}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Face Shape Guide */}
        <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
              Face Shape Guide
            </h2>
            <p className="text-xl text-gray-400 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
              Choose frames that complement your unique features
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {faceShapes.map((face, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg font-light text-white mb-3 text-center" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                  {face.shape} Face
                </h3>
                <p className="text-gray-400 text-sm mb-4 text-center font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                  {face.characteristics}
                </p>
                <div className="space-y-3">
                  <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-3">
                    <p className="text-green-400 text-xs font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                      ✓ Recommended: {face.recommended}
                    </p>
                  </div>
                  <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-3">
                    <p className="text-red-400 text-xs font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                      ✗ Avoid: {face.avoid}
                    </p>
                  </div>
                </div>
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