import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { X, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, authMode, setAuthMode, closeAuthModal, signin, signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (authMode === 'signin') {
        await signin(formData.email, formData.password);
      } else {
        await signup(formData.name, formData.email, formData.password);
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '' });
    setError('');
    setShowPassword(false);
  };

  const switchMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
    resetForm();
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay">
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuthModal}
          />
          
          {/* Modal */}
          <motion.div 
            className="relative w-full max-w-md mx-4 bg-gray-900/95 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-2xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                {authMode === 'signin' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <button 
                onClick={closeAuthModal}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 transition-colors duration-200 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="bg-red-900/50 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {authMode === 'signup' && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  required
                  className="w-full pl-12 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#d4af37] hover:bg-[#e6c14d] disabled:bg-gray-600 text-black py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
              >
                {isLoading ? 'Please wait...' : (authMode === 'signin' ? 'Sign In' : 'Create Account')}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={switchMode}
                  className="text-gray-400 hover:text-[#d4af37] transition-colors duration-300 font-light"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                >
                  {authMode === 'signin' 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"
                  }
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="px-6 pb-6 text-center text-xs text-gray-500 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}