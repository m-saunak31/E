import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { Heart, ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';

export default function Header({ onCartClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartItemsCount } = useCart();
  const { getWishlistItemsCount } = useWishlist();
  const { user, logout, openAuthModal } = useAuth();

  // Check if we're on the kids page for special header styling
  const isKidsPage = location.pathname === '/kids';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const cartItemsCount = getCartItemsCount();
  const wishlistItemsCount = getWishlistItemsCount();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Kids', path: '/kids' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <motion.header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isKidsPage
          ? scrolled
            ? 'bg-gradient-to-r from-purple-600/90 via-pink-500/90 to-blue-500/90 backdrop-blur-xl border-b border-white/20 shadow-2xl'
            : 'bg-gradient-to-r from-purple-500/80 via-pink-400/80 to-blue-400/80 backdrop-blur-sm'
          : scrolled 
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
            : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <motion.button 
            onClick={() => handleNavigation('/')}
            className={`text-2xl md:text-3xl transition-all duration-300 font-light ${
              isKidsPage 
                ? 'text-white hover:text-yellow-200 drop-shadow-lg' 
                : 'text-white hover:text-[#d4af37]'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}
          >
            EyeLura
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`transition-all duration-300 font-light relative group ${
                  isKidsPage
                    ? `text-white hover:text-yellow-200 drop-shadow-md ${location.pathname === item.path ? 'text-yellow-200' : ''}`
                    : `text-white hover:text-[#d4af37] ${location.pathname === item.path ? 'text-[#d4af37]' : ''}`
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                  isKidsPage
                    ? `bg-yellow-200 ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`
                    : `bg-[#d4af37] ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`
                }`}></span>
              </motion.button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            
            {/* Wishlist Button */}
            <motion.button 
              onClick={() => handleNavigation('/wishlist')}
              className="relative group p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={`w-6 h-6 transition-colors duration-300 ${
                isKidsPage 
                  ? 'text-white group-hover:text-yellow-200 drop-shadow-md' 
                  : 'text-white group-hover:text-[#d4af37]'
              }`} />
              {wishlistItemsCount > 0 && (
                <motion.span 
                  className={`absolute -top-1 -right-1 text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium ${
                    isKidsPage 
                      ? 'bg-yellow-300 text-purple-800' 
                      : 'bg-[#d4af37] text-black'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
                >
                  {wishlistItemsCount}
                </motion.span>
              )}
            </motion.button>

            {/* Cart Button */}
            <motion.button 
              onClick={handleCartClick}
              className="relative group p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart className={`w-6 h-6 transition-colors duration-300 ${
                isKidsPage 
                  ? 'text-white group-hover:text-yellow-200 drop-shadow-md' 
                  : 'text-white group-hover:text-[#d4af37]'
              }`} />
              {cartItemsCount > 0 && (
                <motion.span 
                  className={`absolute -top-1 -right-1 text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium ${
                    isKidsPage 
                      ? 'bg-yellow-300 text-purple-800' 
                      : 'bg-[#d4af37] text-black'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </motion.button>

            {/* Auth Button */}
            <div className="relative">
              {user ? (
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center gap-2 transition-colors duration-300 p-2 ${
                    isKidsPage 
                      ? 'text-white hover:text-yellow-200 drop-shadow-md' 
                      : 'text-white hover:text-[#d4af37]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User className="w-6 h-6" />
                  <span className="hidden sm:block font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                    {user.name}
                  </span>
                </motion.button>
              ) : (
                <motion.button
                  onClick={openAuthModal}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                    isKidsPage 
                      ? 'bg-yellow-300 hover:bg-yellow-200 text-purple-800' 
                      : 'bg-[#d4af37] hover:bg-[#e6c14d] text-black'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
                >
                  Sign In
                </motion.button>
              )}

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {showUserMenu && user && (
                  <motion.div
                    className="absolute right-0 top-full mt-2 w-48 bg-black/90 backdrop-blur-xl border border-gray-800 rounded-lg shadow-xl"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-300 font-light ${
                          isKidsPage 
                            ? 'text-white hover:text-yellow-200 hover:bg-purple-800/50' 
                            : 'text-white hover:text-[#d4af37] hover:bg-gray-800/50'
                        }`}
                        style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <motion.button 
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${isKidsPage ? 'text-white drop-shadow-md' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isKidsPage ? 'text-white drop-shadow-md' : 'text-white'}`} />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className={`lg:hidden backdrop-blur-xl border-t ${
                isKidsPage 
                  ? 'bg-gradient-to-r from-purple-600/95 via-pink-500/95 to-blue-500/95 border-white/20' 
                  : 'bg-black/95 border-white/10'
              }`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="px-4 py-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    className={`block w-full text-left transition-colors duration-300 font-light py-2 ${
                      isKidsPage 
                        ? 'text-white hover:text-yellow-200' 
                        : 'text-white hover:text-[#d4af37]'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                  >
                    {item.name}
                  </motion.button>
                ))}
                {!user && (
                  <motion.button
                    onClick={() => {
                      openAuthModal();
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 rounded-full font-medium mt-4 ${
                      isKidsPage 
                        ? 'bg-yellow-300 text-purple-800' 
                        : 'bg-[#d4af37] text-black'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
                  >
                    Sign In
                  </motion.button>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}