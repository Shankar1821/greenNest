import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = ({ isOpen, onClose, onNavigate }) => {
  const { cartItems, updateQty, removeFromCart, cartTotal, cartSavings, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'success'

  if (!isOpen) return null;

  const handleCheckout = () => {
    setCheckoutStep('success');
  };

  const handleClose = () => {
    setCheckoutStep('cart');
    onClose();
  };

  const handleShopNow = () => {
    onNavigate('garden');
    handleClose();
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
      justifyContent: 'flex-end',
      animation: 'fadeIn 0.2s ease'
    }}>
      {/* Drawer Container */}
      <div style={{
        width: '100%',
        maxWidth: '450px',
        height: '100%',
        backgroundColor: 'var(--bg-card)',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} style={{ color: 'var(--accent)' }} />
            <span>Shopping Cart</span>
          </h2>
          <button
            onClick={handleClose}
            style={{
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
            <X size={20} />
          </button>
        </div>

        {checkoutStep === 'cart' ? (
          <>
            {/* Cart Items List */}
            <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1.5rem' }}>
              {cartItems.length === 0 ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '80%',
                  gap: '16px',
                  color: 'var(--text-muted)'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(6, 95, 70, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <ShoppingBag size={32} style={{ color: 'var(--primary)' }} />
                  </div>
                  <p style={{ fontWeight: '500' }}>Your cart is empty</p>
                  <button className="btn btn-primary" onClick={handleShopNow}>
                    Browse Plants
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        gap: '12px',
                        paddingBottom: '1.25rem',
                        borderBottom: '1px solid rgba(6, 95, 70, 0.05)'
                      }}
                    >
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '72px',
                          height: '72px',
                          borderRadius: '12px',
                          objectFit: 'cover'
                        }}
                      />

                      {/* Info & Adjuster */}
                      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h4 style={{ fontSize: '0.95rem', margin: 0 }}>{item.name}</h4>
                            <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--primary)' }}>
                              ₹{(item.price * item.qty).toFixed(2)}
                            </span>
                          </div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            ₹{item.price.toFixed(2)} each
                          </span>
                        </div>

                        {/* Adjuster / Delete */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid var(--border-color)',
                            borderRadius: '12px',
                            overflow: 'hidden'
                          }}>
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px 8px', display: 'flex' }}
                            >
                              <Minus size={12} />
                            </button>
                            <span style={{ fontSize: '0.85rem', fontWeight: '600', padding: '0 8px' }}>{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px 8px', display: 'flex' }}
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#ef4444',
                              cursor: 'pointer',
                              display: 'flex',
                              padding: '4px'
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cartItems.length > 0 && (
              <div style={{
                padding: '1.5rem',
                borderTop: '1px solid var(--border-color)',
                backgroundColor: 'rgba(6, 95, 70, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {/* Savings info */}
                {cartSavings > 0 && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.9rem',
                    color: 'var(--accent)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontWeight: '600'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Sparkles size={14} /> Total Discount Savings
                    </span>
                    <span>-₹{cartSavings.toFixed(2)}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '500', color: 'var(--text-muted)' }}>Estimated Subtotal</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-dark)' }}>
                    ₹{cartTotal.toFixed(2)}
                  </span>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={handleCheckout}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '24px',
                    marginTop: '8px'
                  }}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </>
        ) : (
          /* Order Success Simulation View */
          <div style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            gap: '1.5rem'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-glow)',
              animation: 'scaleUp 0.3s ease'
            }}>
              <Sparkles size={40} style={{ color: 'var(--accent)' }} />
            </div>

            <div>
              <h3 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)', color: 'var(--primary-dark)', marginBottom: '8px' }}>
                Order Placed!
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                Thank you for shopping at GreenNest! Your plants are being carefully prepared and packaged for transit.
              </p>
            </div>

            <div style={{
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.02)',
              borderRadius: '16px',
              padding: '1rem',
              fontSize: '0.85rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Order ID:</span>
                <span style={{ fontWeight: '600' }}>#GN-{Math.floor(Math.random() * 90000) + 10000}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Delivery Est:</span>
                <span style={{ fontWeight: '600' }}>3-5 Business Days</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '6px', marginTop: '6px' }}>
                <span style={{ fontWeight: '500' }}>Paid amount:</span>
                <span style={{ fontWeight: '700', color: 'var(--primary)' }}>₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                clearCart();
                handleClose();
              }}
              style={{ width: '100%', borderRadius: '24px' }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
