import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import Homepage from './components/homepage';
import Shop from './components/pages/Shop';
import Kids from './components/pages/Kids';
import KidsShop from './components/pages/KidsShop';
import ProductDetail from './components/pages/ProductDetail';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Wishlist from './components/pages/Wishlist';
import StudentDiscount from './components/pages/StudentDiscount';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import TermsOfService from './components/pages/TermsOfService';
import Accessibility from './components/pages/Accessibility';
import FirstTimeBuyer from './components/pages/FirstTimeBuyer';
import PrescriptionDeals from './components/pages/PrescriptionDeals';
import BulkOrders from './components/pages/BulkOrders';
import SizeGuide from './components/pages/SizeGuide';
import ShippingReturns from './components/pages/ShippingReturns';
import FAQ from './components/pages/FAQ';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/kids" element={<Kids />} />
                <Route path="/shop/kids" element={<KidsShop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/student-discount" element={<StudentDiscount />} />
                <Route path="/first-time-buyer" element={<FirstTimeBuyer />} />
                <Route path="/prescription-deals" element={<PrescriptionDeals />} />
                <Route path="/bulk-orders" element={<BulkOrders />} />
                <Route path="/size-guide" element={<SizeGuide />} />
                <Route path="/shipping-returns" element={<ShippingReturns />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/accessibility" element={<Accessibility />} />
              </Routes>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;