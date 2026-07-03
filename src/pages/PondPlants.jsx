import React, { useState } from 'react';
import { ShoppingBag, SlidersHorizontal, HelpCircle } from 'lucide-react';
import PlantCard from '../components/PlantCard';
import { PLANTS } from '../data/plants';

const PondPlants = ({ onOpenCart, searchQuery }) => {
  const [maxPrice, setMaxPrice] = useState(800);

  // Filter for pond category, global search query, and price
  const pondPlants = PLANTS.filter(
    (plant) =>
      plant.category === 'pond' &&
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      plant.price <= maxPrice
  );

  return (
    <div style={{ padding: '2rem 0' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="section-title">Pond & Aquatic Plants</h1>
        <p className="section-subtitle">
          Beautify your water features, clarify your pond water naturally, and create a sheltering sanctuary for fish with our hand-cultivated aquatic plants.
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
            min="70"
            max="800"
            step="20"
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

      {/* Pond Plant Care Notice Card */}
      <div className="glass-card" style={{
        padding: '1.5rem',
        marginBottom: '2.5rem',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.04), rgba(59, 130, 246, 0.04))',
        border: '1px solid rgba(16, 185, 129, 0.1)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        textAlign: 'left'
      }}>
        <div style={{
          padding: '8px',
          borderRadius: '50%',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          color: '#3b82f6',
          flexShrink: 0
        }}>
          <HelpCircle size={20} />
        </div>
        <div>
          <h4 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', color: '#1e3a8a' }}>Aquatic Gardening Tip</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.5' }}>
            Pond plants are divided into floating types (like Water Lettuce) and deep-water rooters (like Lilies and Lotuses). Floating plants absorb nutrients directly from the water, reducing algae growth, while rooters offer shade and cover for pond fish.
          </p>
        </div>
      </div>

      {/* Plant Grid */}
      {pondPlants.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>No pond plants match your filters.</p>
          <button 
            onClick={() => setMaxPrice(800)}
            style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline', marginTop: '8px' }}
          >
            Reset Price Limit
          </button>
        </div>
      ) : (
        <div className="plant-grid">
          {pondPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      )}

      {/* Next button: View Shopping Cart Drawer */}
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
          Ready to review your selections?
        </h3>
        <p style={{ maxWidth: '500px', fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
          Open your shopping cart drawer to manage quantity, view savings, and finalize your order.
        </p>
        <button
          className="btn btn-primary"
          onClick={onOpenCart}
          style={{
            padding: '12px 28px',
            fontSize: '1rem',
            borderRadius: '30px',
            boxShadow: 'var(--shadow-glow)'
          }}
        >
          <ShoppingBag size={18} />
          <span>Next: View Shopping Cart</span>
        </button>
      </div>
    </div>
  );
};

export default PondPlants;
