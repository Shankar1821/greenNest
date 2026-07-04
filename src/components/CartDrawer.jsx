import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = ({ isOpen, onClose, onNavigate }) => {
  const { cartItems, updateQty, removeFromCart, cartTotal, cartSavings, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'checkout', 'success'

  // Shipping details state
  const [shippingName, setShippingName] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  // Payment details state
  const [paymentMethod, setPaymentMethod] = useState('mobile'); // 'mobile', 'card'
  const [mobileProvider, setMobileProvider] = useState('UPI'); // 'UPI', 'Paytm', 'bKash'
  const [mobileId, setMobileId] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  if (!isOpen) return null;

  const handleProceedToCheckout = () => {
    setCheckoutStep('checkout');
  };

  const handlePlaceOrder = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!shippingName.trim() || !shippingPhone.trim() || !shippingAddress.trim()) {
      alert('Please fill out all shipping details.');
      return;
    }
    if (paymentMethod === 'mobile' && !mobileId.trim()) {
      alert('Please fill out your Mobile Banking/UPI identifier.');
      return;
    }
    if (paymentMethod === 'card' && (!cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim() || !cardName.trim())) {
      alert('Please fill out all Credit/Debit Card fields.');
      return;
    }
    setCheckoutStep('success');
  };

  const handleClose = () => {
    setCheckoutStep('cart');
    setShippingName('');
    setShippingPhone('');
    setShippingAddress('');
    setMobileId('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setCardName('');
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

        {checkoutStep === 'cart' && (
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
                      key={item.cartItemId}
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
                            <div>
                              <h4 style={{ fontSize: '0.95rem', margin: 0 }}>{item.name}</h4>
                              <span style={{
                                fontSize: '0.72rem',
                                color: 'var(--accent)',
                                fontWeight: '600',
                                display: 'inline-block',
                                padding: '2px 6px',
                                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                                borderRadius: '4px',
                                marginTop: '4px'
                              }}>
                                {item.selectedOption || 'Standard'}
                              </span>
                            </div>
                            <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--primary)' }}>
                              ₹{(item.price * item.qty).toFixed(2)}
                            </span>
                          </div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
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
                              onClick={() => updateQty(item.cartItemId, item.qty - 1)}
                              style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px 8px', display: 'flex' }}
                            >
                              <Minus size={12} />
                            </button>
                            <span style={{ fontSize: '0.85rem', fontWeight: '600', padding: '0 8px' }}>{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.cartItemId, item.qty + 1)}
                              style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px 8px', display: 'flex' }}
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
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
                  onClick={handleProceedToCheckout}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '24px',
                    marginTop: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </>
        )}

        {checkoutStep === 'checkout' && (
          <form
            onSubmit={handlePlaceOrder}
            style={{
              flexGrow: 1,
              overflowY: 'auto',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              textAlign: 'left'
            }}
          >
            <h3 style={{ fontSize: '1.2rem', margin: '0 0 4px 0', fontFamily: 'var(--font-serif)', color: 'var(--primary-dark)' }}>
              Shipping Details
            </h3>

            {/* Name Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)' }}>Full Name</label>
              <input
                type="text"
                required
                value={shippingName}
                onChange={(e) => setShippingName(e.target.value)}
                placeholder="Abhishek Gowda"
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'rgba(0,0,0,0.01)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Phone Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)' }}>Phone Number</label>
              <input
                type="tel"
                required
                value={shippingPhone}
                onChange={(e) => setShippingPhone(e.target.value)}
                placeholder="+91 98765 43210"
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'rgba(0,0,0,0.01)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Address Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)' }}>Delivery Address</label>
              <textarea
                required
                rows={3}
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Flat 102, Green Meadows, Outer Ring Road, Bangalore"
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'rgba(0,0,0,0.01)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  resize: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '8px 0' }} />

            <h3 style={{ fontSize: '1.2rem', margin: '0 0 4px 0', fontFamily: 'var(--font-serif)', color: 'var(--primary-dark)' }}>
              Payment Method
            </h3>

            {/* Payment Method Radio Selector */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {/* Mobile Banking Radio Card */}
              <label
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px',
                  borderRadius: '12px',
                  border: paymentMethod === 'mobile' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  backgroundColor: paymentMethod === 'mobile' ? 'rgba(6, 95, 70, 0.03)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="mobile"
                  checked={paymentMethod === 'mobile'}
                  onChange={() => setPaymentMethod('mobile')}
                  style={{ accentColor: 'var(--primary)' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Mobile/UPI</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>UPI, Paytm, PhonePe</span>
                </div>
              </label>

              {/* Card Radio Card */}
              <label
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px',
                  borderRadius: '12px',
                  border: paymentMethod === 'card' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  backgroundColor: paymentMethod === 'card' ? 'rgba(6, 95, 70, 0.03)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  style={{ accentColor: 'var(--primary)' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Card Payment</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Visa, Mastercard</span>
                </div>
              </label>
            </div>

            {/* Dynamic Payment Fields */}
            {paymentMethod === 'mobile' ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  padding: '14px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(6, 95, 70, 0.03)',
                  border: '1px solid var(--border-color)',
                  marginTop: '4px'
                }}
              >
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)' }}>
                  Select Mobile Banking Provider:
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['UPI', 'Paytm', 'bKash'].map((prov) => {
                    const isSelected = mobileProvider === prov;
                    return (
                      <button
                        key={prov}
                        type="button"
                        onClick={() => setMobileProvider(prov)}
                        style={{
                          flex: 1,
                          padding: '6px 12px',
                          borderRadius: '8px',
                          border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                          backgroundColor: isSelected ? 'var(--primary)' : 'white',
                          color: isSelected ? 'white' : 'var(--text-main)',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {prov}
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                    {mobileProvider === 'UPI' ? 'UPI ID (e.g., abhi@okaxis)' : 'Mobile Account Number'}
                  </label>
                  <input
                    type="text"
                    required
                    value={mobileId}
                    onChange={(e) => setMobileId(e.target.value)}
                    placeholder={mobileProvider === 'UPI' ? 'name@upi' : '017XXXXXXXX / 9876543210'}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'white',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  padding: '14px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(6, 95, 70, 0.03)',
                  border: '1px solid var(--border-color)',
                  marginTop: '4px'
                }}
              >
                {/* Card Number */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>Card Number</label>
                  <input
                    type="text"
                    required
                    maxLength="19"
                    value={cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                      const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                      setCardNumber(formatted);
                    }}
                    placeholder="4111 2222 3333 4444"
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'white',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Expiry & CVV Row */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>Expiry Date</label>
                    <input
                      type="text"
                      required
                      maxLength="5"
                      value={cardExpiry}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        if (value.length >= 2) {
                          setCardExpiry(value.slice(0, 2) + '/' + value.slice(2, 4));
                        } else {
                          setCardExpiry(value);
                        }
                      }}
                      placeholder="MM/YY"
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'white',
                        fontSize: '0.85rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>CVV</label>
                    <input
                      type="password"
                      required
                      maxLength="3"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="•••"
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'white',
                        fontSize: '0.85rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Cardholder Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>Cardholder Name</label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Abhishek Gowda"
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'white',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Back to Cart & Submit Row */}
            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '12px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setCheckoutStep('cart')}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '20px',
                  border: '1px solid var(--primary)',
                  color: 'var(--primary)',
                  backgroundColor: 'transparent',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Back to Cart
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  flex: 2,
                  padding: '10px',
                  borderRadius: '20px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Pay & Place Order (₹{cartTotal.toFixed(2)})
              </button>
            </div>
          </form>
        )}

        {checkoutStep === 'success' && (
          /* Order Success Simulation View */
          <div style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            gap: '1.5rem',
            overflowY: 'auto'
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
                Thank you for shopping at GreenNest! Your order details are confirmed and payment has been processed.
              </p>
            </div>

            <div style={{
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.02)',
              borderRadius: '16px',
              padding: '1.25rem',
              fontSize: '0.85rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              textAlign: 'left',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Order ID:</span>
                <span style={{ fontWeight: '600' }}>#GN-{Math.floor(Math.random() * 90000) + 10000}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Deliver to:</span>
                <span style={{ fontWeight: '600' }}>{shippingName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Delivery Est:</span>
                <span style={{ fontWeight: '600' }}>3-5 Business Days</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '8px', marginTop: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payment Method:</span>
                <span style={{ fontWeight: '600' }}>
                  {paymentMethod === 'mobile' ? `Mobile Banking (${mobileProvider})` : 'Credit/Debit Card'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Identifier/Account:</span>
                <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>
                  {paymentMethod === 'mobile' ? mobileId : `•••• •••• •••• ${cardNumber.slice(-4)}`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '8px', marginTop: '4px' }}>
                <span style={{ fontWeight: '600' }}>Total Paid Amount:</span>
                <span style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '1rem' }}>₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                clearCart();
                handleClose();
              }}
              style={{ width: '100%', borderRadius: '24px', padding: '10px' }}
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
