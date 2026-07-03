import React, { useState } from 'react';
import { ArrowRight, SlidersHorizontal, CheckCircle } from 'lucide-react';
import PlantCard from '../components/PlantCard';
import { PLANTS } from '../data/plants';

const Agriculture = ({ setActiveTab, searchQuery }) => {
  const [maxPrice, setMaxPrice] = useState(250);

  // Filter for nursery/agricultural plants
  const nurseryPlants = PLANTS.filter(
    (plant) =>
      plant.category === 'nursery' &&
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      plant.price <= maxPrice
  );

  return (
    <div style={{ padding: '2rem 0' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="section-title">Agricultural Nursery</h1>
        <p className="section-subtitle">
          Grow your own culinary herbs and fresh organic vegetables. We supply high-quality, disease-resistant plant starters ready to transplant into your garden beds or balcony containers.
        </p>
      </div>

      {/* Control Panel (Price Filter & Active search info) */}
      <div className="glass-card" style={{
        padding: '1.25rem',
        marginBottom: '2.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Price Slider in Rupees */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '240px', flexGrow: 1 }}>
          <SlidersHorizontal size={16} style={{ color: 'var(--text-muted)' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: '500', minWidth: '120px' }}>
            Max Price: <strong style={{ color: 'var(--primary)' }}>₹{maxPrice}</strong>
          </span>
          <input
            type="range"
            min="30"
            max="250"
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

      {/* Benefits checklist banner */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '24px',
        marginBottom: '2.5rem',
        fontSize: '0.9rem',
        fontWeight: '500',
        color: 'var(--primary)'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle size={16} /> 100% Non-GMO Organics
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle size={16} /> Hardened off for outdoor planting
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle size={16} /> Planting guide included with every order
        </span>
      </div>

      {/* Plant Grid */}
      {nurseryPlants.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>No vegetable or herb plants match your filters.</p>
          <button 
            onClick={() => setMaxPrice(250)}
            style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline', marginTop: '8px' }}
          >
            Reset Price Limit
          </button>
        </div>
      ) : (
        <div className="plant-grid">
          {nurseryPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      )}

      {/* Next button: Flowers */}
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
          Looking for Beautiful Blossoms?
        </h3>
        <p style={{ maxWidth: '500px', fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
          Explore our vibrant collection of flowering plants including roses, jasmines, lavenders, and hibiscuses to color your balconies.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => setActiveTab('flower')}
          style={{
            padding: '12px 28px',
            fontSize: '1rem',
            borderRadius: '30px',
            boxShadow: 'var(--shadow-glow)'
          }}
        >
          <span>Next: Flowers</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Agriculture;
