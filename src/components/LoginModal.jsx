import React, { useState } from 'react';
import { X, Mail, Lock, User, Leaf, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (isLoginTab) {
      // Login flow
      const res = login(formData.email, formData.password);
      if (res.success) {
        setSuccessMsg('Successfully logged in! 🌱');
        setTimeout(() => {
          onClose();
          setSuccessMsg('');
          setFormData({ name: '', email: '', password: '' });
        }, 1200);
      } else {
        setErrorMsg(res.message);
      }
    } else {
      // Register flow
      if (!formData.name) {
        setErrorMsg('Name is required.');
        return;
      }
      const res = register(formData.name, formData.email, formData.password);
      if (res.success) {
        setSuccessMsg('Account registered successfully! Welcome! 🎉');
        setTimeout(() => {
          onClose();
          setSuccessMsg('');
          setFormData({ name: '', email: '', password: '' });
        }, 1500);
      } else {
        setErrorMsg(res.message);
      }
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(4px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'fadeIn 0.2s ease'
    }}>
      {/* Modal Card */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '400px',
        padding: '2.5rem 2rem',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative',
        animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        textAlign: 'center'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            display: 'flex',
            padding: '4px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.03)'
          }}
        >
          <X size={18} />
        </button>

        {/* Logo Icon */}
        <div style={{
          display: 'inline-flex',
          background: 'linear-gradient(135deg, var(--accent), var(--primary))',
          padding: '12px',
          borderRadius: '16px',
          marginBottom: '1rem',
          boxShadow: 'var(--shadow-glow)'
        }}>
          <Leaf size={28} color="#fff" />
        </div>

        <h3 style={{
          fontSize: '1.5rem',
          fontFamily: 'var(--font-serif)',
          color: 'var(--primary-dark)',
          marginBottom: '1.5rem'
        }}>
          {isLoginTab ? 'Welcome Back' : 'Create Account'}
        </h3>

        {/* Tab Headers */}
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
              boxShadow: isLoginTab ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s'
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
              boxShadow: !isLoginTab ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            Register
          </button>
        </div>

        {/* Success/Error Alerts */}
        {errorMsg && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#ef4444',
            padding: '10px',
            borderRadius: '10px',
            fontSize: '0.8rem',
            marginBottom: '1rem',
            textAlign: 'left',
            border: '1px solid #fca5a5'
          }}>
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div style={{
            backgroundColor: '#dcfce7',
            color: '#15803d',
            padding: '10px',
            borderRadius: '10px',
            fontSize: '0.8rem',
            marginBottom: '1rem',
            textAlign: 'left',
            border: '1px solid #86efac'
          }}>
            {successMsg}
          </div>
        )}

        {/* Input Forms */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {!isLoginTab && (
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  outline: 'none',
                  fontSize: '0.9rem',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-main)'
                }}
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
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px 12px 10px 36px',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                outline: 'none',
                fontSize: '0.9rem',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-main)'
              }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px 12px 10px 36px',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                outline: 'none',
                fontSize: '0.9rem',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-main)'
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              padding: '12px',
              borderRadius: '12px',
              marginTop: '8px',
              fontWeight: '600'
            }}
          >
            {isLoginTab ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {isLoginTab && (
          <p style={{ fontSize: '0.75rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
            Demo User: <code style={{ backgroundColor: 'rgba(0,0,0,0.04)', padding: '2px 4px', borderRadius: '4px' }}>john@example.com</code> / <code style={{ backgroundColor: 'rgba(0,0,0,0.04)', padding: '2px 4px', borderRadius: '4px' }}>password123</code>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
