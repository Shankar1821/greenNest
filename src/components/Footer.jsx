import React, { useState } from 'react';
import { Leaf, Mail, Phone, MapPin, Send, Heart } from 'lucide-react';

const Footer = ({ setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer style={{
      backgroundColor: 'var(--primary-dark)',
      color: '#e2e8f0',
      padding: '4rem 0 2rem 0',
      marginTop: 'auto',
      borderTop: '1px solid rgba(16, 185, 129, 0.1)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', cursor: 'pointer' }} onClick={() => setActiveTab('home')}>
              <div style={{
                background: '#10b981',
                padding: '6px',
                borderRadius: '8px',
                display: 'flex'
              }}>
                <Leaf size={18} color="#fff" />
              </div>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: '700',
                color: 'white'
              }}>
                GreenNest
              </span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Your curated online sanctuary for nursery, agricultural, and aquatic plants. We deliver handpicked, healthy greenery straight to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'white', fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: '600', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Categories
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li>
                <button onClick={() => setActiveTab('garden')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left' }} className="footer-link">
                  Garden & Indoor Plants
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('nursery')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left' }} className="footer-link">
                  Agricultural Nursery
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pond')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left' }} className="footer-link">
                  Pond & Aquatic Plants
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ color: 'white', fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: '600', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Get In Touch
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.9rem', color: '#94a3b8' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} style={{ color: 'var(--accent)' }} />
                <span>128 Greenhouse Way, Nursery Valley, CA</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} style={{ color: 'var(--accent)' }} />
                <span>+1 (800) 555-PLNT</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} style={{ color: 'var(--accent)' }} />
                <span>support@greennest.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ color: 'white', fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: '600', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Join Our Newsletter
            </h4>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Subscribe for gardening hacks, exclusive discount codes, and new arrival alerts.
            </p>
            {subscribed ? (
              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: '#34d399',
                padding: '10px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                textAlign: 'center',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}>
                Thank you for subscribing! 🌱
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    color: 'white',
                    outline: 'none',
                    fontSize: '0.85rem',
                    flexGrow: 1
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  className="send-btn"
                >
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: '1.5rem' }} />

        {/* Copyright */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '0.8rem',
          color: '#64748b'
        }}>
          <p>© {new Date().getFullYear()} GreenNest Inc. All rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Built with <Heart size={12} color="#ef4444" fill="#ef4444" /> for plant lovers worldwide.
          </p>
        </div>
      </div>

      <style>{`
        .footer-link:hover {
          color: white !important;
          transform: translateX(4px);
        }
        .footer-link {
          transition: all 0.2s ease !important;
        }
        .send-btn:hover {
          background-color: var(--accent-hover) !important;
          transform: scale(1.05);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
