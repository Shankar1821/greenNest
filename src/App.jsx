import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import LoginModal from './components/LoginModal';
import Home from './pages/Home';
import Garden from './pages/Garden';
import Agriculture from './pages/Agriculture';
import Flowers from './pages/Flowers';
import PondPlants from './pages/PondPlants';
import Account from './pages/Account';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function MainAppLayout() {
  const [activeTab, setActiveTab] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'garden':
        return <Garden setActiveTab={setActiveTab} searchQuery={searchQuery} />;
      case 'nursery':
        return <Agriculture setActiveTab={setActiveTab} searchQuery={searchQuery} />;
      case 'flower':
        return <Flowers setActiveTab={setActiveTab} searchQuery={searchQuery} />;
      case 'pond':
        return <PondPlants onOpenCart={() => setIsCartOpen(true)} searchQuery={searchQuery} />;
      case 'account':
        return <Account />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Dynamic Top Announcement Promo Bar */}
      <div className="promo-bar">
        <span>🌱 Free standard delivery on orders above ₹500. Limited seasonal discounts!</span>
        <button 
          onClick={() => setActiveTab('garden')}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            padding: '2px 10px',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600',
            cursor: 'pointer',
            marginLeft: '8px'
          }}
        >
          Shop Now
        </button>
      </div>

      {/* Main Glassmorphic Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main style={{ flexGrow: 1 }} className="container">
        {renderActivePage()}
      </main>

      {/* Persistent Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Slide-out Shopping Cart */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onNavigate={setActiveTab}
      />

      {/* Center-pop Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainAppLayout />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
