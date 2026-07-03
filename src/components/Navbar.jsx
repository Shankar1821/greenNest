import React, { useState, useEffect } from 'react';
import { Leaf, ShoppingBag, User, LogOut, Sun, Moon, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ activeTab, setActiveTab, onOpenCart, onOpenLogin, searchQuery, setSearchQuery }) => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('greennest_theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('greennest_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'garden', label: 'Garden Plants' },
    { id: 'nursery', label: 'Nursery (Agri)' },
    { id: 'flower', label: 'Flowers' },
    { id: 'pond', label: 'Pond Plants' },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="glass-header">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'var(--header-height)' }}>
        {/* Left Side: Logo & Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <div style={{
              background: 'linear-gradient(135deg, var(--accent), var(--primary))',
              padding: '8px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <Leaf size={24} color="#fff" />
            </div>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.5rem',
              fontWeight: '700',
              background: 'linear-gradient(90deg, var(--primary), var(--accent))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              GreenNest
            </span>
          </div>

          {/* Desktop Search Bar (placed in front of the home button) */}
          <div className="desktop-search-bar" style={{ display: 'none', position: 'relative', width: '220px' }}>
            <Search 
              size={16} 
              style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: 'var(--text-muted)',
                pointerEvents: 'none'
              }} 
            />
            <input
              type="text"
              placeholder="Search plants..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // Switch tab to a catalog view if typing while on Home or Account
                if (activeTab === 'home' || activeTab === 'account') {
                  setActiveTab('garden');
                }
              }}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                outline: 'none',
                fontSize: '0.85rem',
                backgroundColor: 'rgba(6, 95, 70, 0.05)',
                color: 'var(--text-main)',
                transition: 'border-color 0.2s'
              }}
            />
          </div>
        </div>

        {/* Middle: Desktop Nav Links */}
        <nav style={{ display: 'none', gap: '28px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.92rem',
                color: activeTab === link.id ? 'var(--accent)' : 'var(--text-main)',
                position: 'relative',
                padding: '4px 0'
              }}
            >
              {link.label}
              {activeTab === link.id && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'var(--accent)',
                  borderRadius: '1px'
                }} />
              )}
            </button>
          ))}
        </nav>

        {/* Right Side: Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: 'rgba(6, 95, 70, 0.05)'
            }}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Cart Icon */}
          <button 
            onClick={onOpenCart}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: 'rgba(6, 95, 70, 0.05)',
              position: 'relative'
            }}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'var(--accent)',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: '700',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account / Login */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button 
                onClick={() => handleNavClick('account')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                  color: activeTab === 'account' ? 'var(--accent)' : 'var(--text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.9rem'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent), var(--primary-light))',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '0.85rem'
                }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="desktop-username" style={{ display: 'none' }}>{user.name.split(' ')[0]}</span>
              </button>
              <button 
                onClick={logout}
                title="Log Out"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(239, 68, 68, 0.05)'
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button 
              className="btn btn-primary" 
              onClick={onOpenLogin}
              style={{
                padding: '8px 18px',
                fontSize: '0.85rem',
                borderRadius: '20px'
              }}
            >
              <User size={16} />
              <span>Login</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              padding: '6px'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: 'var(--header-height)',
          left: 0,
          width: '100%',
          backgroundColor: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-color)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: 'var(--shadow-lg)',
          animation: 'fadeIn 0.2s ease',
          zIndex: 99
        }}>
          {/* Mobile Search input */}
          <div style={{ position: 'relative', width: '100%', marginBottom: '8px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search plants..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab === 'home' || activeTab === 'account') {
                  setActiveTab('garden');
                }
              }}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                outline: 'none',
                fontSize: '0.85rem',
                backgroundColor: 'rgba(6, 95, 70, 0.05)',
                color: 'var(--text-main)'
              }}
            />
          </div>

          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                padding: '8px 0',
                fontSize: '1rem',
                fontWeight: '600',
                color: activeTab === link.id ? 'var(--accent)' : 'var(--text-main)',
                borderBottom: '1px solid rgba(6, 95, 70, 0.05)'
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      {/* Media query helper styling */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-search-bar {
            display: block !important;
          }
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
          .desktop-username {
            display: inline !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
