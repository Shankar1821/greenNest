import React, { useState } from 'react';
import { User, Mail, Shield, ShoppingBag, MapPin, LogOut, Lock, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Account = () => {
  const { user, login, register, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'address', 'security'
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Simulated order history
  const dummyOrders = [
    {
      id: 'GN-82415',
      date: '2026-06-15',
      total: 797.00,
      status: 'Delivered',
      items: 'Monstera Deliciosa (1), Sweet Italian Basil (2)'
    },
    {
      id: 'GN-49102',
      date: '2026-06-28',
      total: 599.00,
      status: 'In Transit',
      items: 'Sacred Pink Lotus (1)'
    }
  ];

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (isLoginTab) {
      const res = login(formData.email, formData.password);
      if (res.success) {
        setSuccessMsg('Successfully logged in! 🌱');
        setFormData({ name: '', email: '', password: '' });
      } else {
        setErrorMsg(res.message);
      }
    } else {
      if (!formData.name) {
        setErrorMsg('Name is required.');
        return;
      }
      const res = register(formData.name, formData.email, formData.password);
      if (res.success) {
        setSuccessMsg('Account created successfully! Welcome! 🎉');
        setFormData({ name: '', email: '', password: '' });
      } else {
        setErrorMsg(res.message);
      }
    }
  };

  if (!user) {
    /* Logged Out View - Auth forms */
    return (
      <div style={{ padding: '4rem 0', maxWidth: '400px', margin: '0 auto' }}>
        <div className="glass-card" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            background: 'linear-gradient(135deg, var(--accent), var(--primary))',
            padding: '12px',
            borderRadius: '16px',
            marginBottom: '1rem',
            color: 'white',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <User size={28} />
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginBottom: '1.5rem' }}>
            {isLoginTab ? 'My Account' : 'Register Account'}
          </h2>

          {/* Form switch tab headers */}
          <div style={{
            display: 'flex',
            backgroundColor: 'rgba(6, 95, 70, 0.05)',
            borderRadius: '12px',
            padding: '4px',
            marginBottom: '1.5rem'
          }}>
            <button
              onClick={() => { setIsLoginTab(true); setErrorMsg(''); }}
              style={{
                flex: 1,
                padding: '8px',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer',
                backgroundColor: isLoginTab ? 'var(--bg-card)' : 'transparent',
                color: isLoginTab ? 'var(--primary-dark)' : 'var(--text-muted)',
                boxShadow: isLoginTab ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsLoginTab(false); setErrorMsg(''); }}
              style={{
                flex: 1,
                padding: '8px',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer',
                backgroundColor: !isLoginTab ? 'var(--bg-card)' : 'transparent',
                color: !isLoginTab ? 'var(--primary-dark)' : 'var(--text-muted)',
                boxShadow: !isLoginTab ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Register
            </button>
          </div>

          {/* Messages */}
          {errorMsg && (
            <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '10px', borderRadius: '10px', fontSize: '0.8rem', marginBottom: '1rem', border: '1px solid #fca5a5', textAlign: 'left' }}>
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '10px', borderRadius: '10px', fontSize: '0.8rem', marginBottom: '1rem', border: '1px solid #86efac', textAlign: 'left' }}>
              {successMsg}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {!isLoginTab && (
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.9rem', backgroundColor: 'var(--bg-card)', color: 'var(--text-main)' }}
                />
              </div>
            )}

            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleFormChange}
                required
                style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.9rem', backgroundColor: 'var(--bg-card)', color: 'var(--text-main)' }}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleFormChange}
                required
                style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.9rem', backgroundColor: 'var(--bg-card)', color: 'var(--text-main)' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '12px', borderRadius: '12px', marginTop: '8px' }}>
              {isLoginTab ? 'Sign In' : 'Register'}
            </button>
          </form>

          {isLoginTab && (
            <p style={{ fontSize: '0.75rem', marginTop: '1.25rem', color: 'var(--text-muted)' }}>
              Demo Account: <code style={{ backgroundColor: 'rgba(0,0,0,0.04)', padding: '2px 4px', borderRadius: '4px' }}>john@example.com</code> / <code style={{ backgroundColor: 'rgba(0,0,0,0.04)', padding: '2px 4px', borderRadius: '4px' }}>password123</code>
            </p>
          )}
        </div>
      </div>
    );
  }

  /* Logged In View - Profile Dashboard */
  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="section-title">My Account</h1>
        <p className="section-subtitle">Manage your shipping details, view order histories, and keep track of your active plant shipments.</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2rem'
      }} className="account-layout">
        {/* Profile Details Card */}
        <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '20px', height: 'fit-content' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent), var(--primary-light))',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '1.5rem',
              boxShadow: 'var(--shadow-glow)'
            }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{user.name}</h3>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>{user.email}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'left' }}>
            <div style={{ backgroundColor: 'rgba(6, 95, 70, 0.03)', padding: '12px', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Member Since</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--primary-dark)' }}>July 2026</strong>
            </div>
            <div style={{ backgroundColor: 'rgba(6, 95, 70, 0.03)', padding: '12px', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Simulated Status</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--accent)' }}>Active VIP Gardener</strong>
            </div>
          </div>

          {/* Sub Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
            <button
              onClick={() => setActiveTab('orders')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                backgroundColor: activeTab === 'orders' ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                color: activeTab === 'orders' ? 'var(--primary-dark)' : 'var(--text-main)',
                textAlign: 'left'
              }}
            >
              <ShoppingBag size={18} />
              <span>Order History</span>
            </button>
            <button
              onClick={() => setActiveTab('address')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                backgroundColor: activeTab === 'address' ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                color: activeTab === 'address' ? 'var(--primary-dark)' : 'var(--text-main)',
                textAlign: 'left'
              }}
            >
              <MapPin size={18} />
              <span>Shipping Addresses</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                backgroundColor: activeTab === 'security' ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                color: activeTab === 'security' ? 'var(--primary-dark)' : 'var(--text-main)',
                textAlign: 'left'
              }}
            >
              <Shield size={18} />
              <span>Privacy & Security</span>
            </button>
          </div>

          <button
            onClick={logout}
            className="btn btn-danger"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '12px', borderRadius: '12px', marginTop: '12px' }}
          >
            <LogOut size={16} />
            <span>Log Out Account</span>
          </button>
        </div>

        {/* Tab content panel */}
        <div className="glass-card" style={{ padding: '2rem', flexGrow: 1 }}>
          {activeTab === 'orders' && (
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingBag size={20} style={{ color: 'var(--accent)' }} />
                <span>Orders History</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {dummyOrders.map((order) => (
                  <div key={order.id} style={{
                    border: '1px solid var(--border-color)',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    backgroundColor: 'rgba(6, 95, 70, 0.01)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                      <div>
                        <strong style={{ fontSize: '0.95rem', color: 'var(--primary-dark)' }}>{order.id}</strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Ordered on: {order.date}</span>
                      </div>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        backgroundColor: order.status === 'Delivered' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        color: order.status === 'Delivered' ? '#10b981' : '#f59e0b',
                        alignSelf: 'center'
                      }}>
                        {order.status}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>Items: </span>{order.items}
                    </p>
                    <div style={{ borderTop: '1px solid rgba(0,0,0,0.03)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Order Total:</span>
                      <strong style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>₹{order.total.toFixed(2)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'address' && (
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={20} style={{ color: 'var(--accent)' }} />
                <span>Shipping Addresses</span>
              </h3>

              <div style={{
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '1.25rem',
                backgroundColor: 'rgba(6, 95, 70, 0.01)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '0.95rem' }}>Default Home Address</strong>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase' }}>Primary</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>John Doe</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>128 Greenhouse Way</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Nursery Valley, CA 90210</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>United States</p>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={20} style={{ color: 'var(--accent)' }} />
                <span>Privacy & Security Settings</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                  <div>
                    <strong style={{ fontSize: '0.9rem', display: 'block' }}>Change Password</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Update your account password key regularly.</span>
                  </div>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '10px' }}>
                    Edit
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '0.9rem', display: 'block' }}>Two-Factor Auth (2FA)</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Provide additional code checks when logging in.</span>
                  </div>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '10px' }}>
                    Enable
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .account-layout {
            grid-template-columns: 280px 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Account;
