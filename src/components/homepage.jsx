import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './ui/Header';
import Footer from './ui/Footer';
import Hero from './ui/Hero';
import Collections from './ui/Collections';
import TryOn from './ui/TryOn';
import BestSellers from './ui/BestSellers';
import CartModal from './ui/CartModal';
import AuthModal from './ui/AuthModal';
import { useInView } from 'react-intersection-observer';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

function AnimatedSection({ children }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

function Homepage() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      <AnimatedSection>
        <Hero />
      </AnimatedSection>
      
      <AnimatedSection>
        <Collections />
      </AnimatedSection>
      
      <AnimatedSection>
        <TryOn />
      </AnimatedSection>
      
      <AnimatedSection>
        <BestSellers />
      </AnimatedSection>
      
      <Footer />
      
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
      />
      
      <AuthModal />
    </>
  );
}

export default Homepage;