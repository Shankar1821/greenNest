import React, { useState } from 'react';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const PlantCard = ({ plant }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Standard');

  const getOptionDetails = (option) => {
    switch (option) {
      case 'Ceramic Pot':
        return { priceOffset: 120 };
      case 'Clay Pot':
        return { priceOffset: 80 };
      case 'Standard':
      default:
        return { priceOffset: 0 };
    }
  };

  const currentOffset = getOptionDetails(selectedOption).priceOffset;
  const currentPrice = plant.price + currentOffset;
  const currentOriginalPrice = plant.originalPrice + currentOffset;

  const handleAdd = () => {
    addToCart({
      ...plant,
      price: currentPrice,
      originalPrice: currentOriginalPrice,
      selectedOption: selectedOption
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discountPercent = Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100);

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Plant Image & Discount Badge */}
      <div style={{ position: 'relative', overflow: 'hidden', paddingBottom: '75%', backgroundColor: '#f0fdf4' }}>
        <img
          src={plant.image}
          alt={plant.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          className="plant-img"
        />
        
        {/* Discount Tag */}
        {discountPercent > 0 && (
          <span 
            className="badge badge-discount"
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              fontWeight: '700',
              zIndex: 2,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {discountPercent}% OFF
          </span>
        )}

        {/* Category Tag */}
        <span
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            backgroundColor: 'rgba(6, 95, 70, 0.85)',
            backdropFilter: 'blur(4px)',
            color: 'white',
            fontSize: '0.7rem',
            padding: '2px 8px',
            borderRadius: '6px',
            fontWeight: '600',
            textTransform: 'capitalize',
            zIndex: 2
          }}
        >
          {plant.category}
        </span>
      </div>

      {/* Card Info Content */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '8px', textAlign: 'left' }}>
        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < Math.floor(plant.rating) ? 'var(--accent-gold)' : 'none'}
              color={i < Math.floor(plant.rating) ? 'var(--accent-gold)' : '#d1d5db'}
            />
          ))}
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '4px' }}>
            ({plant.rating.toFixed(1)})
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.2rem',
          color: 'var(--primary-dark)',
          fontWeight: '700',
          margin: 0
        }}>
          {plant.name}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: '1.4',
          margin: 0
        }}>
          {plant.description}
        </p>

        {/* Pot Style Selection Radio Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', margin: '8px 0 4px 0' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Pot Option:
          </span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['Standard', 'Clay Pot', 'Ceramic Pot'].map((option) => {
              const isSelected = selectedOption === option;
              const details = getOptionDetails(option);
              return (
                <label
                  key={option}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                    backgroundColor: isSelected ? 'rgba(6, 95, 70, 0.06)' : 'rgba(0, 0, 0, 0.02)',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    fontWeight: isSelected ? '600' : '400',
                    color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                    transition: 'all 0.2s ease',
                    userSelect: 'none'
                  }}
                >
                  <input
                    type="radio"
                    name={`option-${plant.id}`}
                    value={option}
                    checked={isSelected}
                    onChange={() => setSelectedOption(option)}
                    style={{
                      accentColor: 'var(--primary)',
                      margin: 0,
                      cursor: 'pointer',
                      width: '12px',
                      height: '12px'
                    }}
                  />
                  <span>
                    {option === 'Standard' ? 'Standard' : option.split(' ')[0]}
                    {details.priceOffset > 0 && ` (+₹${details.priceOffset})`}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Price & Buy controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: '8px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {discountPercent > 0 && (
              <span style={{
                fontSize: '0.8rem',
                textDecoration: 'line-through',
                color: 'var(--text-muted)'
              }}>
                ₹{currentOriginalPrice.toFixed(2)}
              </span>
            )}
            <span style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: 'var(--primary)',
              lineHeight: '1'
            }}>
              ₹{currentPrice.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`btn ${added ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              padding: '8px 14px',
              fontSize: '0.8rem',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: added ? 'none' : '1px solid var(--primary)',
              backgroundColor: added ? 'var(--accent)' : 'transparent',
              color: added ? 'white' : 'var(--primary)'
            }}
          >
            {added ? <Check size={14} /> : <ShoppingCart size={14} />}
            <span>{added ? 'Added!' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>

      <style>{`
        .glass-card:hover .plant-img {
          transform: scale(1.08);
        }
      `}</style>
    </div>
  );
};

export default PlantCard;
