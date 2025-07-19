import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const products = [
  {
    id: 1,
    name: 'Aviator Prestige',
    price: 1329,
    originalPrice: 1599,
    image: 'https://i.ibb.co/271DJ6YD/austin-p-x-ro8-SEHw-Gw-unsplash.jpg',
    images: [
      'https://i.ibb.co/271DJ6YD/austin-p-x-ro8-SEHw-Gw-unsplash.jpg',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80'
    ],
    reviews: 248,
    rating: 4.8,
    category: 'sunglasses',
    badge: 'Bestseller',
    discount: 17,
    colors: ['Gold', 'Silver', 'Black'],
    sizes: ['Small', 'Medium', 'Large']
  },
  {
    id: 2,
    name: 'Metropolitan Frame',
    price: 1289,
    originalPrice: 1489,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80',
      'https://i.ibb.co/271DJ6YD/austin-p-x-ro8-SEHw-Gw-unsplash.jpg'
    ],
    reviews: 192,
    rating: 4.7,
    badge: 'New',
    category: 'frames',
    discount: 13,
    colors: ['Black', 'Tortoise', 'Clear'],
    sizes: ['Small', 'Medium', 'Large']
  },
  {
    id: 3,
    name: 'Artisan Round',
    price: 1459,
    originalPrice: 1699,
    image: 'https://i.ibb.co/9X2LxTb/giorgio-trovato-K62u25-Jk6vo-unsplash.jpg',
    images: [
      'https://i.ibb.co/9X2LxTb/giorgio-trovato-K62u25-Jk6vo-unsplash.jpg',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80'
    ],
    reviews: 312,
    rating: 4.9,
    category: 'sunglasses',
    badge: 'Student Fav',
    discount: 14,
    colors: ['Brown', 'Green', 'Blue'],
    sizes: ['Small', 'Medium']
  },
  {
    id: 4,
    name: 'Executive Titan',
    price: 1599,
    originalPrice: 1899,
    image: 'https://i.ibb.co/mF8tGFhf/lucas-george-wendt-3xt-Ce-Uhq-ZWE-unsplash.jpg',
    images: [
      'https://i.ibb.co/mF8tGFhf/lucas-george-wendt-3xt-Ce-Uhq-ZWE-unsplash.jpg',
      'https://i.ibb.co/9X2LxTb/giorgio-trovato-K62u25-Jk6vo-unsplash.jpg'
    ],
    reviews: 176,
    rating: 4.6,
    badge: 'Limited',
    category: 'frames',
    discount: 16,
    colors: ['Gunmetal', 'Silver', 'Black'],
    sizes: ['Medium', 'Large']
  }
];

export default function BestSellers() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('bestsellers-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

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

  return (
    <section 
      id="bestsellers-section"
      className="relative py-20 bg-white overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#d4af37] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#d4af37] rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-sm text-[#d4af37] font-medium shadow-sm mb-6">
            <span className="w-2 h-2 bg-[#d4af37] rounded-full mr-2 animate-pulse"></span>
            Curated Favorites
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Most <span className="text-[#d4af37]">Loved</span> Collection
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our most coveted designs, chosen by discerning customers who appreciate exceptional craftsmanship
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item, idx) => (
            <motion.div
              key={idx}
              className="group relative bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
              style={{ 
                transitionDelay: `${idx * 150}ms`,
                animation: isVisible ? `slideUp 0.8s ease-out ${idx * 0.1}s both` : 'none'
              }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleProductClick(item.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Badge */}
              {item.badge && (
                <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                  item.badge === 'New' ? 'bg-green-500 text-white' :
                  item.badge === 'Limited' ? 'bg-red-500 text-white' :
                  item.badge === 'Student Fav' ? 'bg-blue-500 text-white' :
                  'bg-[#d4af37] text-black'
                }`}>
                  {item.badge}
                </div>
              )}

              {/* Discount Badge */}
              {item.discount && (
                <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  -{item.discount}%
                </div>
              )}

              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={hoveredIndex === idx && item.images[1] ? item.images[1] : item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                
                {/* Overlay on hover */}
                <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                  hoveredIndex === idx ? 'opacity-100' : 'opacity-0'
                }`} />
                
                {/* Quick action buttons */}
                <div className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300 ${
                  hoveredIndex === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <button 
                    onClick={(e) => handleWishlistToggle(e, item)}
                    className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      isInWishlist(item.id) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(item.id) ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(item.id);
                    }}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  
                  <button 
                    onClick={(e) => handleAddToCart(e, item)}
                    className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center text-black hover:bg-[#e6c14d] transition-all duration-300 hover:scale-110"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#d4af37] transition-colors duration-300">
                    {item.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">₹{item.price}</div>
                    {item.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">₹{item.originalPrice}</div>
                    )}
                  </div>
                </div>

                {/* Reviews */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="flex text-[#d4af37]">
                    {'★'.repeat(Math.floor(item.rating))}
                    {'☆'.repeat(5 - Math.floor(item.rating))}
                  </div>
                  <span>({item.reviews} reviews)</span>
                </div>

                {/* Category tag */}
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600 capitalize">
                    {item.category}
                  </span>
                  {item.category === 'frames' && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                      Prescription Ready
                    </span>
                  )}
                </div>

                {/* CTA Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(item.id);
                  }}
                  className="w-full bg-[#d4af37] hover:bg-[#d4af37]/90 text-black py-3 px-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  View Details
                </button>
              </div>

              {/* Glowing border effect */}
              <div className={`absolute inset-0 rounded-2xl bg-[#d4af37] opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't Find Your Perfect Match?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Explore our complete collection with <span className="text-[#d4af37] font-semibold">student discounts</span> and virtual try-on features
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/shop')}
                className="bg-[#d4af37] hover:bg-[#d4af37]/90 text-black px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View All Collections
              </button>
              <button 
                onClick={() => document.getElementById('try-on')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 px-8 py-3 rounded-full font-semibold transition-all duration-300"
              >
                AR Try On
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}