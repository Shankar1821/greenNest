import React, { useState } from 'react';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import PlantCard from '../components/PlantCard';
import { PLANTS } from '../data/plants';

const Flowers = ({ setActiveTab, searchQuery }) => {
  const [maxPrice, setMaxPrice] = useState(600);

  // Filter for flowers category, global search query, and price
  const flowerPlants = PLANTS.filter(
    (plant) =>
      plant.category === 'flower' &&
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      plant.price <= maxPrice
  );

  return (
    <div style={{ padding: '2rem 0' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="section-title">Flowering Plants</h1>
        <p className="section-subtitle">
          Bring vibrant colors and sweet fragrances to your balcony, windowsill, or garden. Explore our healthy potted flower starters and shrubs ready to bloom.
        </p>
      </div>

      {/* Control panel (Price Filter) */}
      <div className="glass-card" style={{
        padding: '1.25rem',
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '240px', flexGrow: 1 }}>
          <SlidersHorizontal size={16} style={{ color: 'var(--text-muted)' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: '500', minWidth: '120px' }}>
            Max Price: <strong style={{ color: 'var(--primary)' }}>₹{maxPrice}</strong>
          </span>
          <input
            type="range"
            min="90"
            max="600"
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            style={{
              flexGrow: 1,
              accentColor: 'var(--accent)',
              cursor: 'pointer'
            }}
          />
        </div>

        {searchQuery && (
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Showing results matching: <strong style={{ color: 'var(--primary)' }}>"{searchQuery}"</strong>
          </span>
        )}
      </div>

      {/* Plants Grid */}
      {flowerPlants.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>No flowering plants match your current filters.</p>
          <button 
            onClick={() => setMaxPrice(600)}
            style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline', marginTop: '8px' }}
          >
            Reset Price Limit
          </button>
        </div>
      ) : (
        <div className="plant-grid">
          {flowerPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      )}

      {/* Sequential navigation button: Next: Pond Plants */}
      <div style={{
        backgroundColor: 'rgba(6, 95, 70, 0.03)',
        border: '1px solid var(--border-color)',
        borderRadius: '24px',
        padding: '2.5rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        marginTop: '2rem'
      }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--primary-dark)' }}>
          Looking for Water Gardens?
        </h3>
        <p style={{ maxWidth: '500px', fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
          Explore our selective aquatic flora. Clarify your garden pond naturally with Sacred Lotus and beautiful Water Lilies.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => setActiveTab('pond')}
          style={{
            padding: '12px 28px',
            fontSize: '1rem',
            borderRadius: '30px',
            boxShadow: 'var(--shadow-glow)'
          }}
        >
          <span>Next: Pond Plants</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Flowers;
