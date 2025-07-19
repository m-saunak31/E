import React, { useState, useEffect } from 'react';
import { products } from '../../data/products';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import Header from '../ui/Header';
import CartModal from '../ui/CartModal';
import AuthModal from '../ui/AuthModal';
import { Heart, ShoppingCart, Eye, Filter, Grid, List, Search, Sparkles, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Shop() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 2500]);
  const [isVisible, setIsVisible] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    setIsVisible(true);
    
    // Handle URL parameters for category navigation
    const urlParams = new URLSearchParams(location.search);
    const categoryParam = urlParams.get('category');
    const genderParam = urlParams.get('gender');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (genderParam) {
      setSelectedGender(genderParam);
    }
  }, [location]);

  useEffect(() => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by gender (simulated based on product names and categories)
    if (selectedGender !== 'all') {
      if (selectedGender === 'mens') {
        filtered = filtered.filter(product => 
          product.name.includes('Executive') || 
          product.name.includes('Aviator') ||
          product.category === 'sunglasses'
        );
      } else if (selectedGender === 'womens') {
        filtered = filtered.filter(product => 
          product.name.includes('Artisan') || 
          product.name.includes('Metropolitan') ||
          product.category === 'frames'
        );
      } else if (selectedGender === 'kids') {
        // Redirect to kids page for kids products
        navigate('/shop/kids');
        return;
      }
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
        const badgePriority = { 'Bestseller': 3, 'New': 2, 'Student Fav': 1 };
        filtered.sort((a, b) => (badgePriority[b.badge] || 0) - (badgePriority[a.badge] || 0));
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedGender, sortBy, priceRange, searchQuery, navigate]);

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
    { id: 'all', name: 'All Products', icon: '👓' },
    { id: 'sunglasses', name: 'Sunglasses', icon: '🕶️' },
    { id: 'frames', name: 'Frames', icon: '👓' }
  ];

  const genders = [
    { id: 'all', name: 'All', icon: '👥' },
    { id: 'mens', name: 'Men\'s', icon: '👨' },
    { id: 'womens', name: 'Women\'s', icon: '👩' },
    { id: 'unisex', name: 'Unisex', icon: '🤝' },
    { id: 'kids', name: 'Kids', icon: '👶' }
  ];

  return (
    <div className="min-h-screen bg-black content-wrapper">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Enhanced Hero Section */}
      <div className={`pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30 mb-8"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold">Premium Collection</span>
            <Star className="w-5 h-5 text-yellow-400 ml-2" />
          </motion.div>
          
          <h1 className="text-5xl lg:text-7xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Discover Your <span className="text-[#d4af37]">Perfect</span> Style
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            Explore our curated collection of premium eyewear designed for every lifestyle and personality
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Enhanced Category Navigation */}
        <div className={`mb-12 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {/* Category Pills */}
            <div className="col-span-2 md:col-span-3">
              <h3 className="text-white font-light mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Categories
              </h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/25'
                        : 'bg-gray-900/50 text-gray-300 hover:text-white border border-gray-800 hover:border-gray-700'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
                  >
                    <span className="text-lg">{category.icon}</span>
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </div>
            
            {/* Gender Pills */}
            <div className="col-span-2">
              <h3 className="text-white font-light mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                For Everyone
              </h3>
              <div className="flex flex-wrap gap-3">
                {genders.map((gender) => (
                  <motion.button
                    key={gender.id}
                    onClick={() => setSelectedGender(gender.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      selectedGender === gender.id
                        ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/25'
                        : 'bg-gray-900/50 text-gray-300 hover:text-white border border-gray-800 hover:border-gray-700'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
                  >
                    <span>{gender.icon}</span>
                    {gender.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Enhanced Filters Sidebar */}
          <div className={`lg:w-1/4 space-y-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-[#d4af37]" />
                <h3 className="text-lg font-light text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                  Refine Your Search
                </h3>
              </div>
              
              {/* Enhanced Search */}
              <div className="mb-6">
                <h4 className="font-light text-gray-300 mb-3" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Search</h4>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                  />
                </div>
              </div>

              {/* Enhanced Price Range */}
              <div className="mb-6">
                <h4 className="font-light text-gray-300 mb-3" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Price Range</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="2500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#d4af37] bg-gray-700 rounded-lg appearance-none h-2"
                  />
                  <div className="flex justify-between text-sm text-gray-400 font-light">
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>₹{priceRange[0]}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>₹{priceRange[1]}</span>
                  </div>
                  <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-lg p-3">
                    <p className="text-[#d4af37] text-xs text-center font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                      💡 Student discounts available on all frames!
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced Sort By */}
              <div>
                <h4 className="font-light text-gray-300 mb-3" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent font-light transition-all duration-300"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                >
                  <option value="featured">✨ Featured</option>
                  <option value="price-low">💰 Price: Low to High</option>
                  <option value="price-high">💎 Price: High to Low</option>
                  <option value="rating">⭐ Highest Rated</option>
                  <option value="newest">🆕 Newest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Enhanced Products Section */}
          <div className="lg:w-3/4">
            {/* Enhanced Toolbar */}
            <div className={`mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <div className="flex items-center gap-4">
                <p className="text-gray-400 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                  Showing <span className="text-[#d4af37] font-semibold">{filteredProducts.length}</span> products
                </p>
                {filteredProducts.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Star className="w-4 h-4 text-[#d4af37]" />
                    <span>Premium Quality Guaranteed</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors duration-300 ${
                      viewMode === 'grid' ? 'bg-[#d4af37] text-black' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors duration-300 ${
                      viewMode === 'list' ? 'bg-[#d4af37] text-black' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Products Grid */}
            <AnimatePresence mode="wait">
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#d4af37]/50 hover:shadow-2xl hover:shadow-[#d4af37]/10 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    onClick={() => handleProductClick(product.id)}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    {/* Enhanced Badge */}
                    {product.badge && (
                      <motion.div 
                        className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                          product.badge === 'New' ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' :
                          product.badge === 'Limited' ? 'bg-gradient-to-r from-red-400 to-pink-500 text-white' :
                          product.badge === 'Student Fav' ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white' :
                          product.badge === 'Sport' ? 'bg-gradient-to-r from-purple-400 to-indigo-500 text-white' :
                          product.badge === 'Classic' ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white' :
                          'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                        }`}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {product.badge}
                      </motion.div>
                    )}

                    {/* Enhanced Discount Badge */}
                    {product.discount && (
                      <motion.div 
                        className="absolute top-4 right-4 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        -{product.discount}%
                      </motion.div>
                    )}

                    {/* Enhanced Product Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={hoveredProduct === product.id && product.images && product.images[1] ? product.images[1] : product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      
                      {/* Enhanced Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Enhanced Hover Actions */}
                      <div className={`absolute inset-0 flex items-center justify-center gap-4 transition-all duration-300 ${
                        hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <motion.button
                          onClick={(e) => handleWishlistToggle(e, product)}
                          className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 ${
                            isInWishlist(product.id) 
                              ? 'bg-red-500 text-white shadow-lg shadow-red-500/25' 
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                        </motion.button>
                        
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(product.id);
                          }}
                          className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye className="w-5 h-5" />
                        </motion.button>
                        
                        <motion.button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center text-black hover:bg-[#e6c14d] transition-all duration-300 shadow-lg shadow-[#d4af37]/25"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Enhanced Product Info */}
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-light text-white group-hover:text-[#d4af37] transition-colors duration-300" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                          {product.name}
                        </h3>
                        <div className="text-right">
                          <div className="text-lg font-medium text-[#d4af37]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}>₹{product.price}</div>
                          {product.originalPrice && (
                            <div className="text-sm text-gray-500 line-through" style={{ fontFamily: "'Inter', sans-serif" }}>₹{product.originalPrice}</div>
                          )}
                        </div>
                      </div>

                      {/* Enhanced Reviews */}
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <div className="flex text-[#d4af37]">
                            {'★'.repeat(Math.floor(product.rating))}
                            {'☆'.repeat(5 - Math.floor(product.rating))}
                          </div>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>({product.reviews})</span>
                        </div>
                        <div className="text-green-400 text-xs font-semibold">
                          ✓ In Stock
                        </div>
                      </div>

                      {/* Enhanced Category tags */}
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-gray-800/50 rounded-full text-gray-300 text-xs capitalize font-light border border-gray-700" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                          {product.category}
                        </span>
                        {product.category === 'frames' && (
                          <span className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-xs font-light border border-blue-500/30" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                            💎 Prescription Ready
                          </span>
                        )}
                      </div>

                      {/* Enhanced CTA Button */}
                      <motion.button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(product.id);
                        }}
                        className="w-full bg-gradient-to-r from-[#d4af37] to-[#e6c14d] hover:from-[#e6c14d] hover:to-[#f0d666] text-black py-3 px-6 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                        style={{ fontFamily: "'Inter', sans-serif", fontWeight: '600' }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        ✨ View Details
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>

            {/* Enhanced Empty State */}
            {filteredProducts.length === 0 && (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-8xl mb-6">🔍</div>
                <h3 className="text-3xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                  No products found
                </h3>
                <p className="text-gray-400 font-light mb-8" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                  Try adjusting your filters or search terms
                </p>
                <motion.button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedGender('all');
                    setSearchQuery('');
                    setPriceRange([0, 2500]);
                  }}
                  className="bg-[#d4af37] hover:bg-[#e6c14d] text-black px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear All Filters
                </motion.button>
              </motion.div>
            )}
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