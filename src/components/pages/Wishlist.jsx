import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import Header from '../ui/Header';
import CartModal from '../ui/CartModal';
import AuthModal from '../ui/AuthModal';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Wishlist() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product, product.colors[0], product.sizes[0], 1);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <div className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full text-sm text-[#d4af37] font-medium shadow-sm mb-6">
            <span className="w-2 h-2 bg-[#d4af37] rounded-full mr-2 animate-pulse"></span>
            Your Collection
          </div>
          <h1 className="text-5xl lg:text-6xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Your <span className="text-[#d4af37]">Wishlist</span>
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            Curated pieces that caught your eye
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {wishlistItems.length === 0 ? (
          /* Empty Wishlist State */
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-2xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
              Your wishlist is empty
            </h3>
            <p className="text-gray-400 mb-8 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
              Discover exceptional eyewear and save your favorites
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-[#d4af37] hover:bg-[#e6c14d] text-black px-8 py-3 font-medium transition-all duration-300 transform hover:scale-105"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
            >
              Explore Collection
            </button>
          </motion.div>
        ) : (
          <>
            {/* Wishlist Header */}
            <div className={`flex items-center justify-between mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <p className="text-gray-400 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
              </p>
              {wishlistItems.length > 0 && (
                <button
                  onClick={clearWishlist}
                  className="text-gray-400 hover:text-red-400 transition-colors duration-300 flex items-center gap-2 font-light"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
              )}
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {wishlistItems.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 overflow-hidden transition-all duration-500 hover:border-[#d4af37]/50 hover:shadow-2xl hover:shadow-[#d4af37]/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => handleProductClick(product.id)}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Badge */}
                    {product.badge && (
                      <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-medium ${
                        product.badge === 'New' ? 'bg-green-500 text-white' :
                        product.badge === 'Limited' ? 'bg-red-500 text-white' :
                        product.badge === 'Student Fav' ? 'bg-blue-500 text-white' :
                        product.badge === 'Sport' ? 'bg-purple-500 text-white' :
                        product.badge === 'Classic' ? 'bg-gray-500 text-white' :
                        'bg-[#d4af37] text-black'
                      }`}>
                        {product.badge}
                      </div>
                    )}

                    {/* Remove from Wishlist */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(product.id);
                      }}
                      className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-black/70 transition-all duration-300"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Product Info */}
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 
                        className="text-lg font-light text-white group-hover:text-[#d4af37] transition-colors duration-300 cursor-pointer"
                        style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}
                        onClick={() => handleProductClick(product.id)}
                      >
                        {product.name}
                      </h3>
                      <div className="text-right">
                        <div className="text-lg font-medium text-[#d4af37]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}>
                          ₹{product.price}
                        </div>
                        {product.originalPrice && (
                          <div className="text-sm text-gray-500 line-through" style={{ fontFamily: "'Inter', sans-serif" }}>
                            ₹{product.originalPrice}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Reviews */}
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="flex text-[#d4af37]">
                        {'★'.repeat(Math.floor(product.rating))}
                        {'☆'.repeat(5 - Math.floor(product.rating))}
                      </div>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>({product.reviews})</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-[#d4af37] hover:bg-[#e6c14d] text-black py-2 px-4 font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                        style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="p-2 border border-gray-700 hover:border-red-400 text-gray-400 hover:text-red-400 transition-all duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
      
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
      />
      
      <AuthModal />
    </div>
  );
}