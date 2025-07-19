import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartModal({ isOpen, onClose }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleQuantityChange = (cartId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(cartId);
    } else {
      updateQuantity(cartId, newQuantity);
    }
  };

  const subtotal = getCartTotal();
  const savings = items.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex modal-overlay">
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Cart Sidebar */}
          <motion.div 
            className="relative ml-auto w-full max-w-md bg-black border-l border-gray-800 shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-black" />
                </div>
                <h2 className="text-xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                  Shopping Cart
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 transition-colors duration-200 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                /* Empty Cart State */
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-light text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                    Your cart is empty
                  </h3>
                  <p className="text-gray-400 mb-6 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                    Discover exceptional eyewear
                  </p>
                  <button 
                    onClick={onClose}
                    className="bg-[#d4af37] hover:bg-[#e6c14d] text-black px-6 py-3 font-medium transition-all duration-300 transform hover:scale-105"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                /* Cart Items */
                <div className="p-6">
                  <div className="space-y-6">
                    {items.map((item, index) => (
                      <motion.div 
                        key={item.cartId}
                        className="flex gap-4 p-4 bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all duration-300"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="relative flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-20 h-20 object-cover"
                          />
                          {item.discount && (
                            <div className="absolute -top-1 -right-1 bg-[#d4af37] text-black text-xs px-1 py-0.5">
                              -{item.discount}%
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-light text-white text-sm truncate" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                              {item.name}
                            </h4>
                            <button 
                              onClick={() => removeFromCart(item.cartId)}
                              className="text-gray-400 hover:text-red-400 transition-colors duration-200 ml-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-[#d4af37]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}>
                              ₹{item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="text-xs text-gray-500 line-through">₹{item.originalPrice}</span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mb-3 text-xs">
                            <span className="px-2 py-1 bg-gray-800 text-gray-300 font-light">
                              {item.selectedColor}
                            </span>
                            <span className="px-2 py-1 bg-gray-800 text-gray-300 font-light">
                              {item.selectedSize}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-1 bg-gray-800 text-xs text-gray-300 capitalize font-light">
                              {item.category}
                            </span>
                            <div className="flex items-center gap-2 bg-gray-800 p-1">
                              <button 
                                onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center hover:bg-gray-700 transition-colors duration-200 text-white"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-medium text-sm px-2 text-white min-w-[2rem] text-center" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}>
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center hover:bg-gray-700 transition-colors duration-200 text-white"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer - only show when cart has items */}
            {items.length > 0 && (
              <div className="border-t border-gray-800 p-6 space-y-4">
                {/* Savings Banner */}
                {savings > 0 && (
                  <div className="bg-gray-900/50 border border-[#d4af37]/30 p-3 text-center">
                    <p className="text-[#d4af37] font-medium text-sm" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}>
                      You're saving ₹{savings} on this order
                    </p>
                  </div>
                )}

                {/* Order Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-300 font-light">
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                      Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
                    </span>
                    <span className="font-medium" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-300 font-light">
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Shipping</span>
                    <span className="font-medium text-[#d4af37]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}>Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-medium text-[#d4af37] pt-2 border-t border-gray-800">
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: '400' }}>Total</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: '400' }}>₹{subtotal}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-[#d4af37] hover:bg-[#e6c14d] text-black py-3 font-medium transition-all duration-300 transform hover:scale-105" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}>
                    Proceed to Checkout
                  </button>
                  <div className="flex gap-2">
                    <button 
                      onClick={onClose}
                      className="flex-1 border border-gray-700 hover:border-[#d4af37] text-gray-300 hover:text-[#d4af37] py-3 font-medium transition-all duration-300 hover:bg-gray-900"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
                    >
                      Continue Shopping
                    </button>
                    <button 
                      onClick={clearCart}
                      className="px-4 border border-red-500/50 hover:border-red-400 text-red-400 hover:text-red-300 py-3 font-medium transition-all duration-300 hover:bg-red-500/10"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex justify-center gap-6 pt-4 text-xs text-gray-500 font-light">
                  <div className="flex items-center gap-1">
                    <span>🔒</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🚚</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>↩️</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Easy Returns</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}