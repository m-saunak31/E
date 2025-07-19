import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { kidsProducts } from '../../data/products';
import Header from '../ui/Header';
import CartModal from '../ui/CartModal';
import AuthModal from '../ui/AuthModal';
import { Heart, ShoppingCart, Eye, Filter, Search, Sparkles, Star, Rainbow } from 'lucide-react';

// Floating Animation Components
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

const BouncingIcon = ({ icon, color, size = "text-4xl", delay = 0, position }) => (
  <motion.div
    className={`${color} ${size} absolute ${position}`}
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

export default function KidsShop() {
  const [filteredProducts, setFilteredProducts] = useState(kidsProducts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [ageRange, setAgeRange] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    let filtered = [...kidsProducts];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by age range
    if (ageRange !== 'all') {
      filtered = filtered.filter(product => {
        if (ageRange === '2-5') return product.ageRange.includes('2-4') || product.ageRange.includes('4-6');
        if (ageRange === '6-8') return product.ageRange.includes('6-8');
        if (ageRange === '9-12') return product.ageRange.includes('8-12') || product.ageRange.includes('6-12');
        return true;
      });
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        const badgePriority = { 'Super Cool!': 3, 'Hero Power!': 2, 'Magical!': 1 };
        filtered.sort((a, b) => (badgePriority[b.badge] || 0) - (badgePriority[a.badge] || 0));
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, priceRange, ageRange, searchQuery]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleWishlistToggle = (e, product) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product, product.colors[0], product.sizes[0], 1);
  };

  const categories = [
    { id: 'all', name: 'All Fun Glasses', icon: '🌈' },
    { id: 'kids-sunglasses', name: 'Cool Sunglasses', icon: '🕶️' },
    { id: 'kids-frames', name: 'Smart Frames', icon: '🤓' }
  ];

  const ageRanges = [
    { id: 'all', name: 'All Ages', icon: '👶' },
    { id: '2-5', name: '2-5 Years', icon: '🧒' },
    { id: '6-8', name: '6-8 Years', icon: '👦' },
    { id: '9-12', name: '9-12 Years', icon: '👧' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-pink-100 to-yellow-200 overflow-hidden">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <BouncingIcon icon="🌈" color="text-pink-400" delay={0} position="top-20 left-10" />
        <BouncingIcon icon="⭐" color="text-yellow-400" delay={0.5} position="top-40 right-20" />
        <BouncingIcon icon="🎈" color="text-red-400" delay={1} position="bottom-40 left-20" />
        <BouncingIcon icon="☁️" color="text-blue-300" delay={1.5} position="top-60 left-1/2" />
        <BouncingIcon icon="🦄" color="text-purple-400" delay={2} position="bottom-20 right-10" />
        <BouncingIcon icon="🌟" color="text-yellow-300" size="text-6xl" delay={0.3} position="top-32 right-1/4" />
        <BouncingIcon icon="🎨" color="text-pink-400" size="text-5xl" delay={0.8} position="bottom-60 left-1/4" />
        <BouncingIcon icon="🚀" color="text-blue-400" size="text-5xl" delay={1.2} position="top-1/2 right-20" />
        <BouncingIcon icon="🎪" color="text-red-400" size="text-4xl" delay={1.8} position="bottom-32 right-1/3" />
      </div>

      {/* Hero Section */}
      <div className={`pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="max-w-7xl mx-auto text-center">
          
          {/* Fun Badge */}
          <motion.div 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full text-white font-bold shadow-lg mb-8"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Kids' Eyewear Shop! 
            <Star className="w-5 h-5 ml-2" />
          </motion.div>
          
          {/* Main Title */}
          <motion.h1 
            className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-6 leading-tight"
            style={{ fontFamily: "'Fredoka One', cursive" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Amazing Kids
            <br />
            <span className="text-gradient-to-r from-yellow-400 to-orange-500">
              Glasses Store! 
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
            className="text-xl lg:text-2xl text-gray-700 font-bold mb-8 max-w-3xl mx-auto"
            style={{ fontFamily: "'Baloo 2', cursive" }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            🌟 Find Your Perfect Superhero Look! 🌟
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Fun Filters Section */}
        <div className={`mb-12 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            
            {/* Categories */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-purple-600 mb-4 flex items-center" style={{ fontFamily: "'Baloo 2', cursive" }}>
                <Rainbow className="w-5 h-5 mr-2" />
                Choose Style
              </h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg'
                        : 'bg-white/50 text-purple-600 hover:bg-pink-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontFamily: "'Baloo 2', cursive" }}
                  >
                    <span className="text-xl">{category.icon}</span>
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Age Range */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-blue-600 mb-4 flex items-center" style={{ fontFamily: "'Baloo 2', cursive" }}>
                <span className="text-xl mr-2">🎂</span>
                Age Group
              </h3>
              <div className="space-y-3">
                {ageRanges.map((age) => (
                  <motion.button
                    key={age.id}
                    onClick={() => setAgeRange(age.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-300 ${
                      ageRange === age.id
                        ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg'
                        : 'bg-white/50 text-blue-600 hover:bg-blue-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontFamily: "'Baloo 2', cursive" }}
                  >
                    <span className="text-xl">{age.icon}</span>
                    {age.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-green-600 mb-4 flex items-center" style={{ fontFamily: "'Baloo 2', cursive" }}>
                <Search className="w-5 h-5 mr-2" />
                Find Glasses
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search for cool glasses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/70 border-2 border-green-200 rounded-2xl text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                  style={{ fontFamily: "'Baloo 2', cursive" }}
                />
              </div>
            </div>

            {/* Sort */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-orange-600 mb-4 flex items-center" style={{ fontFamily: "'Baloo 2', cursive" }}>
                <span className="text-xl mr-2">🎯</span>
                Sort By
              </h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 bg-white/70 border-2 border-orange-200 rounded-2xl text-gray-700 focus:ring-2 focus:ring-orange-400 focus:border-transparent font-bold transition-all duration-300"
                style={{ fontFamily: "'Baloo 2', cursive" }}
              >
                <option value="featured">✨ Most Popular</option>
                <option value="price-low">💰 Cheapest First</option>
                <option value="price-high">💎 Most Expensive</option>
                <option value="rating">⭐ Best Rated</option>
                <option value="newest">🆕 Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="mb-8 text-center">
            <p className="text-xl text-purple-600 font-bold" style={{ fontFamily: "'Baloo 2', cursive" }}>
              Found <span className="text-pink-500">{filteredProducts.length}</span> awesome glasses! 🎉
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            /* Empty State */
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-8xl mb-6">😢</div>
              <h3 className="text-3xl font-bold text-purple-600 mb-4" style={{ fontFamily: "'Fredoka One', cursive" }}>
                Oops! No glasses found
              </h3>
              <p className="text-gray-600 font-bold mb-8" style={{ fontFamily: "'Baloo 2', cursive" }}>
                Try changing your search or filters!
              </p>
              <motion.button
                onClick={() => {
                  setSelectedCategory('all');
                  setAgeRange('all');
                  setSearchQuery('');
                  setPriceRange([0, 1500]);
                }}
                className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontFamily: "'Baloo 2', cursive" }}
              >
                🔄 Show All Glasses
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="group relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  onClick={() => handleProductClick(product.id)}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
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
                    <motion.div 
                      className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      -{product.discount}% OFF!
                    </motion.div>
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
                      <span className="text-sm font-bold text-orange-700">
                        Perfect for {product.ageRange} 👶
                      </span>
                    </div>

                    {/* Reviews */}
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <div className="flex text-yellow-400">
                        {'⭐'.repeat(Math.floor(product.rating))}
                      </div>
                      <span className="text-gray-600 font-bold">({product.reviews} happy kids!)</span>
                    </div>

                    {/* Fun Description */}
                    <p className="text-gray-600 text-center font-bold" style={{ fontFamily: "'Baloo 2', cursive" }}>
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
                      👀 See More Details!
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
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