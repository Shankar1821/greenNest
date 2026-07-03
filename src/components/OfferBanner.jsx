import React, { useState, useEffect, useRef } from 'react';
import { Tag, Truck, Gift, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const OfferBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeoutRef = useRef(null);

  const slides = [
    {
      id: 1,
      icon: <Tag size={40} color="#fbbf24" />,
      tagline: 'SPECIAL LAUNCH OFFER',
      title: 'Flat 20% Off Across All Categories!',
      desc: 'Beautify your space this season. Use code GREEN20 at checkout.',
      bg: 'linear-gradient(135deg, #064e3b, #0f766e)'
    },
    {
      id: 2,
      icon: <Truck size={40} color="#38bdf8" />,
      tagline: 'FREE SHIPPING SUNDAY',
      title: 'Free Ground Delivery on Orders Over $50',
      desc: 'Freshly packed, securely shipped botanical goodness right to your porch.',
      bg: 'linear-gradient(135deg, #1e3a8a, #3b82f6)'
    },
    {
      id: 3,
      icon: <Sparkles size={40} color="#f472b6" />,
      tagline: 'POND PLANT SPECIAL',
      title: 'Dive Into Water Gardening: Buy 2 Get 1 Free!',
      desc: 'Add beautiful Sacred Lotus & Water Lilies to your aquatic garden today.',
      bg: 'linear-gradient(135deg, #4c1d95, #7c3aed)'
    }
  ];

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentSlide((prevSlide) =>
          prevSlide === slides.length - 1 ? 0 : prevSlide + 1
        ),
      5000
    );

    return () => {
      resetTimeout();
    };
  }, [currentSlide]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div style={{
      position: 'relative',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)',
      marginBottom: '3rem'
    }} className="offer-banner-container">
      {/* Slider viewports */}
      <div style={{
        display: 'flex',
        transform: `translateX(-${currentSlide * 100}%)`,
        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        height: '260px',
        width: '100%'
      }}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            style={{
              flexShrink: 0,
              width: '100%',
              height: '100%',
              background: slide.bg,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '2rem 4rem',
              position: 'relative'
            }}
          >
            {/* Background elements */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              left: '10%',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.03)',
              pointerEvents: 'none'
            }} />

            {/* Content info */}
            <div style={{ maxWidth: '65%', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 1, textAlign: 'left' }}>
              <span style={{
                fontSize: '0.8rem',
                fontWeight: '700',
                letterSpacing: '2px',
                color: '#34d399',
                display: 'inline-block'
              }}>
                {slide.tagline}
              </span>
              <h2 style={{
                color: 'white',
                fontFamily: 'var(--font-serif)',
                fontSize: '1.8rem',
                lineHeight: '1.2',
                fontWeight: '700'
              }}>
                {slide.title}
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', fontWeight: '400' }}>
                {slide.desc}
              </p>
            </div>

            {/* Icon showcase wrapper */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)',
              borderRadius: '24px',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              zIndex: 1
            }}>
              {slide.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Manual buttons */}
      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.2)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          zIndex: 2
        }}
        className="slide-arrow"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.2)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          zIndex: 2
        }}
        className="slide-arrow"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators Dots */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 2
      }}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            style={{
              width: currentSlide === idx ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: currentSlide === idx ? 'var(--accent)' : 'rgba(255,255,255,0.4)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          />
        ))}
      </div>

      <style>{`
        .slide-arrow:hover {
          background: var(--accent) !important;
          transform: translateY(-50%) scale(1.05);
        }
        @media (max-width: 768px) {
          .offer-banner-container {
            margin-bottom: 2rem !important;
          }
          .offer-banner-container > div {
            height: 220px !important;
          }
          .offer-banner-container p {
            display: none !important;
          }
          .offer-banner-container h2 {
            font-size: 1.3rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default OfferBanner;
