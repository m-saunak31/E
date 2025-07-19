import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Header from '../ui/Header';
import CartModal from '../ui/CartModal';
import AuthModal from '../ui/AuthModal';
import { Heart, ShoppingCart, Star, Sparkles, Rainbow, Sun, Cloud } from 'lucide-react';

const kidsProducts = [
  {
    id: 101,
    name: 'Rainbow Explorer',
    price: 899,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    reviews: 156,
    rating: 4.9,
    category: 'kids-sunglasses',
    badge: 'Super Cool!',
    discount: 18,
    description: 'Colorful sunglasses that make every adventure more fun!',
    features: ['UV Protection', 'Flexible Frame', 'Fun Colors', 'Comfortable Fit'],
    specifications: {
      frameWidth: '120mm',
      lensWidth: '45mm',
      bridgeWidth: '16mm',
      templeLength: '125mm',
      weight: '15g',
      material: 'Flexible TR90'
    },
    colors: ['Rainbow', 'Pink', 'Blue'],
    sizes: ['XS', 'S'],
    ageRange: '3-8 years',
    inStock: true,
    stockCount: 25
  },
  {
    id: 102,
    name: 'Super Hero Specs',
    price: 799,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1556306535-38febf6782e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1556306535-38febf6782e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    reviews: 203,
    rating: 4.8,
    category: 'kids-frames',
    badge: 'Hero Power!',
    discount: 20,
    description: 'Transform into your favorite superhero with these awesome frames!',
    features: ['Blue Light Filter', 'Durable Design', 'Hero Colors', 'Easy Clean'],
    specifications: {
      frameWidth: '125mm',
      lensWidth: '48mm',
      bridgeWidth: '18mm',
      templeLength: '130mm',
      weight: '18g',
      material: 'Impact Resistant Acetate'
    },
    colors: ['Red', 'Blue', 'Green'],
    sizes: ['XS', 'S', 'M'],
    ageRange: '5-12 years',
    inStock: true,
    stockCount: 18
  },
  {
    id: 103,
    name: 'Princess Sparkle',
    price: 849,
    originalPrice: 1049,
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    reviews: 89,
    rating: 4.7,
    category: 'kids-sunglasses',
    badge: 'Magical!',
    discount: 19,
    description: 'Sparkly frames fit for a princess or prince!',
    features: ['Glitter Design', 'UV Protection', 'Comfortable', 'Magical Look'],
    specifications: {
      frameWidth: '118mm',
      lensWidth: '44mm',
      bridgeWidth: '15mm',
      templeLength: '120mm',
      weight: '14g',
      material: 'Sparkle Acetate'
    },
    colors: ['Pink', 'Purple', 'Gold'],
    sizes: ['XS', 'S'],
    ageRange: '4-10 years',
    inStock: true,
    stockCount: 32
  },
  {
    id: 104,
    name: 'Space Adventure',
    price: 929,
    originalPrice: 1129,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    reviews: 124,
    rating: 4.8,
    category: 'kids-frames',
    badge: 'Cosmic!',
    discount: 18,
    description: 'Blast off to space with these out-of-this-world frames!',
    features: ['Space Design', 'Blue Light Filter', 'Glow Effects', 'Adventure Ready'],
    specifications: {
      frameWidth: '130mm',
      lensWidth: '50mm',
      bridgeWidth: '17mm',
      templeLength: '135mm',
      weight: '20g',
      material: 'Cosmic Polymer'
    },
    colors: ['Galaxy', 'Silver', 'Black'],
    sizes: ['S', 'M'],
    ageRange: '6-12 years',
    inStock: true,
    stockCount: 21
  }
];

const FloatingElement = ({ children, delay = 0, duration = 3 }) => (
  <motion.div
    animate={{
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0]
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

const BouncingIcon = ({ icon, color, size = "text-4xl", delay = 0 }) => (
  <motion.div
    className={`${color} ${size} absolute`}
    animate={{
      y: [0, -20, 0],
      scale: [1, 1.2, 1]
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  >
    {icon}
  </motion.div>
);

export default function Kids() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product, product.colors[0], product.sizes[0], 1);
  };

  const handleWishlistToggle = (e, product) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-pink-100 to-yellow-200 overflow-hidden">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <BouncingIcon icon="🌈" color="text-pink-400" delay={0} />
        <BouncingIcon icon="⭐" color="text-yellow-400" delay={0.5} />
        <BouncingIcon icon="🎈" color="text-red-400" delay={1} />
        <BouncingIcon icon="☁️" color="text-blue-300" delay={1.5} />
        <BouncingIcon icon="🦄" color="text-purple-400" delay={2} />
        
        <div className="absolute top-20 left-10">
          <BouncingIcon icon="🌟" color="text-yellow-300" size="text-6xl" delay={0.3} />
        </div>
        <div className="absolute top-40 right-20">
          <BouncingIcon icon="🎨" color="text-pink-400" size="text-5xl" delay={0.8} />
        </div>
        <div className="absolute bottom-20 left-20">
          <BouncingIcon icon="🚀" color="text-blue-400" size="text-5xl" delay={1.2} />
        </div>
        <div className="absolute bottom-40 right-10">
          <BouncingIcon icon="🎪" color="text-red-400" size="text-4xl" delay={1.8} />
        </div>
      </div>

      {/* Hero Section */}
      <div className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="max-w-7xl mx-auto text-center">
          
          {/* Fun Badge */}
          <motion.div 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full text-white font-bold shadow-lg mb-8"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Kids' Eyewear Wonderland! 
            <Star className="w-5 h-5 ml-2" />
          </motion.div>
          
          {/* Main Title */}
          <motion.h1 
            className="text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-6 leading-tight"
            style={{ fontFamily: "'Fredoka One', cursive" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Super Cool
            <br />
            <span className="text-gradient-to-r from-yellow-400 to-orange-500">
              Kids Glasses! 
            </span>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 1 }}
              className="inline-block ml-4"
            >
              😎
            </motion.span>
          </motion.h1>
          
          {/* Fun Subtitle */}
          <motion.p 
            className="text-2xl lg:text-3xl text-gray-700 font-bold mb-8 max-w-4xl mx-auto"
            style={{ fontFamily: "'Baloo 2', cursive" }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            🌟 Where Style Meets Adventure! 🌟
            <br />
            <span className="text-lg text-gray-600">
              Discover magical eyewear that makes every kid feel like a superhero! 
            </span>
          </motion.p>

          {/* Fun Stats */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="text-3xl font-black text-pink-500">1000+</div>
              <div className="text-sm text-gray-600 font-semibold">Happy Kids! 😊</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="text-3xl font-black text-blue-500">100%</div>
              <div className="text-sm text-gray-600 font-semibold">Fun Guaranteed! 🎉</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="text-3xl font-black text-green-500">Safe</div>
              <div className="text-sm text-gray-600 font-semibold">& Comfortable! ✅</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              onClick={() => navigate('/shop')}
              className="group bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-10 py-4 rounded-full text-xl font-bold shadow-xl transform transition-all duration-300"
              style={{ fontFamily: "'Baloo 2', cursive" }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              🛍️ Shop Cool Glasses!
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
            
            <motion.button
              onClick={() => document.getElementById('try-on')?.scrollIntoView({ behavior: 'smooth' })}
              className="group border-4 border-yellow-400 hover:border-yellow-500 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-10 py-4 rounded-full text-xl font-bold shadow-xl transform transition-all duration-300"
              style={{ fontFamily: "'Baloo 2', cursive" }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              🎮 Try Virtual Fitting!
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h2 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 mb-4" style={{ fontFamily: "'Fredoka One', cursive" }}>
              Amazing Collection! 🎨
            </h2>
            <p className="text-xl text-gray-700 font-semibold" style={{ fontFamily: "'Baloo 2', cursive" }}>
              Pick your favorite style and become the coolest kid in school! 
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {kidsProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="group relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => handleProductClick(product.id)}
              >
                {/* Fun Badge */}
                <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                  product.badge === 'Super Cool!' ? 'bg-gradient-to-r from-pink-400 to-red-500' :
                  product.badge === 'Hero Power!' ? 'bg-gradient-to-r from-blue-500 to-purple-600' :
                  product.badge === 'Magical!' ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
                  'bg-gradient-to-r from-green-400 to-blue-500'
                }`}>
                  {product.badge}
                </div>

                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    -{product.discount}% OFF!
                  </div>
                )}

                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-sky-100 to-pink-100">
                  <img
                    src={hoveredProduct === product.id && product.images[1] ? product.images[1] : product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Floating Action Buttons */}
                  <div className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300 ${
                    hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <motion.button
                      onClick={(e) => handleWishlistToggle(e, product)}
                      className={`w-12 h-12 rounded-full backdrop-blur-sm border-2 border-white/50 flex items-center justify-center transition-all duration-300 ${
                        isInWishlist(product.id) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </motion.button>
                    
                    <motion.button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white hover:from-green-500 hover:to-blue-600 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300" style={{ fontFamily: "'Baloo 2', cursive" }}>
                      {product.name}
                    </h3>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">₹{product.price}</div>
                      {product.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">₹{product.originalPrice}</div>
                      )}
                    </div>
                  </div>

                  {/* Age Range */}
                  <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full px-3 py-1 text-center">
                    <span className="text-sm font-semibold text-orange-700">
                      Perfect for {product.ageRange} 👶
                    </span>
                  </div>

                  {/* Reviews */}
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <div className="flex text-yellow-400">
                      {'⭐'.repeat(Math.floor(product.rating))}
                    </div>
                    <span className="text-gray-600 font-semibold">({product.reviews} happy kids!)</span>
                  </div>

                  {/* Fun Description */}
                  <p className="text-gray-600 text-center font-medium" style={{ fontFamily: "'Baloo 2', cursive" }}>
                    {product.description}
                  </p>

                  {/* CTA Button */}
                  <motion.button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product.id);
                    }}
                    className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white py-3 px-6 rounded-full font-bold transition-all duration-300 shadow-lg"
                    style={{ fontFamily: "'Baloo 2', cursive" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    👀 View Details!
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Fun Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 mb-16"
            style={{ fontFamily: "'Fredoka One', cursive" }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Why Kids Love Us! 💖
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🛡️', title: 'Super Safe!', desc: 'UV protection & durable materials' },
              { icon: '🎨', title: 'Amazing Colors!', desc: 'Rainbow of fun colors to choose from' },
              { icon: '😊', title: 'Comfy Fit!', desc: 'Lightweight & comfortable all day long' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Baloo 2', cursive" }}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-medium" style={{ fontFamily: "'Baloo 2', cursive" }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-8" style={{ fontFamily: "'Fredoka One', cursive" }}>
            Ready for an Adventure? 🚀
          </h2>
          <p className="text-xl text-gray-700 font-semibold mb-8" style={{ fontFamily: "'Baloo 2', cursive" }}>
            Join thousands of happy kids who found their perfect glasses!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              onClick={() => navigate('/shop')}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-12 py-4 rounded-full text-xl font-bold shadow-xl"
              style={{ fontFamily: "'Baloo 2', cursive" }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              🌟 Start Shopping Now!
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/contact')}
              className="border-4 border-pink-400 hover:border-pink-500 bg-pink-100 hover:bg-pink-200 text-pink-800 px-12 py-4 rounded-full text-xl font-bold shadow-xl"
              style={{ fontFamily: "'Baloo 2', cursive" }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              📞 Ask Mom & Dad!
            </motion.button>
          </div>
        </motion.div>
      </div>

      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
      />
      
      <AuthModal />
    </div>
  );
}