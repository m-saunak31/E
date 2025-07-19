import React, { useState, useEffect } from 'react';
import Header from '../ui/Header';
import CartModal from '../ui/CartModal';
import AuthModal from '../ui/AuthModal';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState(new Set());

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'orders', name: 'Orders & Shipping' },
    { id: 'products', name: 'Products & Sizing' },
    { id: 'returns', name: 'Returns & Exchanges' },
    { id: 'prescription', name: 'Prescription' },
    { id: 'account', name: 'Account & Payment' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'orders',
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 5-7 business days, Express shipping takes 2-3 business days, and Same-day delivery is available in select metro cities. All orders above ₹999 qualify for free standard shipping.'
    },
    {
      id: 2,
      category: 'orders',
      question: 'Can I track my order?',
      answer: 'Yes! Once your order ships, you\'ll receive a tracking number via email and SMS. You can track your order in real-time through our website or the courier partner\'s tracking system.'
    },
    {
      id: 3,
      category: 'products',
      question: 'How do I know which size to choose?',
      answer: 'Use our comprehensive size guide which includes frame measurements and face shape recommendations. You can also use our AR try-on feature to see how frames look on you before purchasing.'
    },
    {
      id: 4,
      category: 'products',
      question: 'What is AR try-on and how does it work?',
      answer: 'Our AR (Augmented Reality) try-on technology uses your device\'s camera to virtually place frames on your face in real-time. Simply allow camera access, select a frame, and see how it looks on you instantly.'
    },
    {
      id: 5,
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day hassle-free return policy. Items must be in original condition with all accessories. We provide free return shipping and process refunds within 5-7 business days of receiving the returned item.'
    },
    {
      id: 6,
      category: 'returns',
      question: 'Can I exchange my glasses for a different style?',
      answer: 'Yes! You can exchange your glasses for a different style within 30 days. The exchange process is the same as returns - we\'ll send you a replacement once we receive your original item.'
    },
    {
      id: 7,
      category: 'prescription',
      question: 'Do you make prescription glasses?',
      answer: 'Absolutely! We offer prescription lenses for most of our frames. Simply upload your prescription during checkout or visit one of our partner eye care centers for a free eye test.'
    },
    {
      id: 8,
      category: 'prescription',
      question: 'How do I upload my prescription?',
      answer: 'During checkout, you\'ll have the option to upload a photo of your prescription or enter the details manually. Our team will verify the prescription before processing your order.'
    },
    {
      id: 9,
      category: 'account',
      question: 'How do I get the student discount?',
      answer: 'Students get 20% off all frames! Simply verify your student status during checkout using your student email or ID. The discount will be applied automatically once verified.'
    },
    {
      id: 10,
      category: 'account',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets. We also offer EMI options for orders above ₹2000 through select banks and payment partners.'
    },
    {
      id: 11,
      category: 'products',
      question: 'Are your glasses suitable for kids?',
      answer: 'Yes! We have a dedicated kids collection with fun, colorful, and durable frames designed specifically for children aged 2-12 years. All kids frames include UV protection and are made with flexible, safe materials.'
    },
    {
      id: 12,
      category: 'orders',
      question: 'Do you offer bulk discounts?',
      answer: 'Yes! We offer volume discounts for orders of 10+ units. Discounts range from 15% (10-49 units) to 35% (100+ units). Contact our bulk orders team for a custom quote.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <div className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full text-sm text-[#d4af37] font-medium shadow-sm mb-6">
            <HelpCircle className="w-4 h-4 mr-2" />
            Help Center
          </div>
          <h1 className="text-5xl lg:text-6xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
            Frequently Asked <span className="text-[#d4af37]">Questions</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
            Find answers to common questions about our products, services, and policies.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Search and Filter */}
        <div className={`mb-12 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#d4af37] text-black'
                    : 'bg-gray-900/50 text-gray-300 hover:text-white border border-gray-800 hover:border-gray-700'
                }`}
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className={`space-y-4 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-light text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                No questions found
              </h3>
              <p className="text-gray-400 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                Try adjusting your search or category filter
              </p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors duration-300"
                >
                  <h3 className="text-lg font-light text-white pr-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openItems.has(faq.id) ? (
                      <ChevronUp className="w-5 h-5 text-[#d4af37]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openItems.has(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 border-t border-gray-800">
                        <p className="text-gray-300 leading-relaxed pt-4 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        {/* Contact Support */}
        <div className={`mt-16 text-center transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
            <MessageCircle className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
            <h3 className="text-2xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
              Still Need Help?
            </h3>
            <p className="text-gray-400 mb-6 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/contact'}
                className="bg-[#d4af37] hover:bg-[#e6c14d] text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
              >
                Contact Support
              </button>
              <button
                onClick={() => window.location.href = 'mailto:support@eyelura.com'}
                className="border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black px-8 py-3 rounded-lg font-medium transition-all duration-300"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
              >
                Email Us
              </button>
            </div>
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