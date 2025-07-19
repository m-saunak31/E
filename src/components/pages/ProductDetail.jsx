import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import CartModal from '../ui/CartModal';
import AuthModal from '../ui/AuthModal';
import { ArrowLeft, Heart, Share2, ShoppingCart, Star, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const productData = getProductById(id);
    if (productData) {
      setProduct(productData);
      setSelectedColor(productData.colors[0]);
      setSelectedSize(productData.sizes[0]);
      setIsVisible(true);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, selectedColor, selectedSize, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Product Not Found
          </h2>
          <button
            onClick={() => navigate('/shop')}
            className="bg-[#d4af37] hover:bg-[#e6c14d] text-black px-6 py-3 font-medium transition-all duration-300"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  // Check if it's a kids product for special styling
  const isKidsProduct = product.category?.startsWith('kids');

  return (
    <div className={`min-h-screen pt-20 ${isKidsProduct ? 'bg-gradient-to-br from-sky-200 via-pink-100 to-yellow-200' : 'bg-black'}`}>
      
      {/* Back Button and Logo */}
      <div className={`px-4 sm:px-6 lg:px-8 py-6 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/shop')}
            className={`flex items-center gap-2 transition-colors duration-300 font-light ${
              isKidsProduct 
                ? 'text-purple-600 hover:text-pink-500' 
                : 'text-gray-400 hover:text-[#d4af37]'
            }`}
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
          >
            <ArrowLeft className="w-5 h-5" />
            {isKidsProduct ? 'Back to Kids' : 'Back to Shop'}
          </button>
          
          <button
            onClick={() => navigate('/')}
            className={`text-2xl transition-all duration-300 font-light ${
              isKidsProduct 
                ? 'text-purple-600 hover:text-pink-500' 
                : 'text-white hover:text-[#d4af37]'
            }`}
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}
          >
            EyeLura
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Product Images */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Main Image */}
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
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
              {product.discount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 text-xs font-medium">
                  -{product.discount}%
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index ? 'border-[#d4af37]' : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gray-800 text-sm text-gray-300 capitalize font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                  {product.category}
                </span>
                {product.inStock ? (
                  <span className="px-3 py-1 bg-green-900/50 text-green-300 text-sm flex items-center gap-1 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                    <Check className="w-3 h-3" />
                    In Stock
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-900/50 text-red-300 text-sm font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                    Out of Stock
                  </span>
                )}
              </div>

              <h1 className="text-4xl lg:text-5xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                {product.name}
              </h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-[#d4af37] fill-current' : 'text-gray-600'}`}
                    />
                  ))}
                  <span className="text-gray-400 ml-2 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-medium text-[#d4af37]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '400' }}>₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>₹{product.originalPrice}</span>
                )}
                {product.discount && (
                  <span className="px-2 py-1 bg-red-900/50 text-red-300 text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}>
                    Save {product.discount}%
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-300 leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
              {product.description}
            </p>

            {/* Options */}
            <div className="space-y-6">
              {/* Color Selection */}
              <div>
                <h3 className="text-lg font-light text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                  Color: {selectedColor}
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border-2 transition-all duration-300 font-light ${
                        selectedColor === color
                          ? 'border-[#d4af37] bg-[#d4af37] text-black'
                          : 'border-gray-700 hover:border-gray-600 text-gray-300'
                      }`}
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-light text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                  Size: {selectedSize}
                </h3>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 transition-all duration-300 font-light ${
                        selectedSize === size
                          ? 'border-[#d4af37] bg-[#d4af37] text-black'
                          : 'border-gray-700 hover:border-gray-600 text-gray-300'
                      }`}
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-light text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                  Quantity
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-700">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-800 transition-colors duration-300 text-white font-light"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-medium text-white" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}>{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="px-3 py-2 hover:bg-gray-800 transition-colors duration-300 text-white font-light"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-gray-400 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                    {product.stockCount} available
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 px-6 font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
                    addedToCart 
                      ? 'bg-green-500 text-white' 
                      : 'bg-[#d4af37] hover:bg-[#e6c14d] text-black'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>
                <button 
                  onClick={handleWishlistToggle}
                  className={`p-4 border-2 transition-all duration-300 hover:scale-105 ${
                    isInWishlist(product.id)
                      ? 'border-red-500 bg-red-500 text-white'
                      : 'border-gray-700 hover:border-[#d4af37] text-gray-400 hover:text-[#d4af37]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </button>
                <button className="p-4 border-2 border-gray-700 hover:border-[#d4af37] transition-all duration-300 hover:scale-105 text-gray-400 hover:text-[#d4af37]">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <button
                className="w-full border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black py-4 px-6 font-medium transition-all duration-300"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
              >
                Try Virtual Fitting
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800">
              <div className="text-center">
                <Truck className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
                <p className="text-sm text-gray-400 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
                <p className="text-sm text-gray-400 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>2 Year Warranty</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
                <p className="text-sm text-gray-400 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Easy Returns</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-800">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 px-6 font-medium transition-all duration-300 capitalize ${
                    activeTab === tab
                      ? 'text-[#d4af37] border-b-2 border-[#d4af37] bg-gray-800/50'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'description' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                    Product Features
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-[#d4af37]" />
                        <span className="text-gray-300 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                    Technical Specifications
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-800">
                        <span className="font-light text-gray-300 capitalize" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-gray-400 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                      Customer Reviews
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex text-[#d4af37]">
                        {'★'.repeat(Math.floor(product.rating))}
                        {'☆'.repeat(5 - Math.floor(product.rating))}
                      </div>
                      <span className="text-gray-400 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>({product.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-4xl mb-4">💬</div>
                    <p className="font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>Reviews feature coming soon</p>
                  </div>
                </div>
              )}
            </div>
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