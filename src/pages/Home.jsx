import React from 'react';
import { ArrowRight, Sparkles, Percent, ShieldCheck, HeartHandshake } from 'lucide-react';
import OfferBanner from '../components/OfferBanner';
import PlantCard from '../components/PlantCard';
import { PLANTS } from '../data/plants';
import heroBanner from '../assets/hero_banner.png';

const Home = ({ setActiveTab }) => {
  // Filter for plants with active discounts
  const discountPlants = PLANTS.filter((plant) => plant.price < plant.originalPrice);

  return (
    <div style={{ padding: '2rem 0' }}>
      {/* Premium Hero Banner Display */}
      <div style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        marginBottom: '3rem',
        height: '380px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${heroBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Dark leaf overlay for readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(2, 44, 34, 0.4)',
          zIndex: 1
        }} />

        {/* Hero content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          color: 'white',
          textAlign: 'center',
          maxWidth: '650px',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '3px', color: '#34d399', textTransform: 'uppercase' }}>
            Botanical Oasis Online
          </span>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '3rem',
            color: 'white',
            lineHeight: '1.1',
            margin: 0,
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            Emerald Botanicals
          </h1>
          <p style={{
            color: '#f1f5f9',
            fontSize: '1.05rem',
            margin: '0 0 16px 0',
            lineHeight: '1.5',
            textShadow: '0 1px 4px rgba(0,0,0,0.3)'
          }}>
            Explore our curated collections of exotic house plants, pond water lilies, and healthy vegetable starts. Hand-packaged and shipped fresh to your home.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => setActiveTab('garden')}
              style={{
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
              }}
            >
              Shop Collection
            </button>
            <button 
              className="btn" 
              onClick={() => setActiveTab('nursery')}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)'
              }}
            >
              Visit Nursery
            </button>
          </div>
        </div>
      </div>

      {/* 1. Offers on the upside of Home Page */}
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Exclusive Offers
        </h3>
        <OfferBanner />
      </div>

      {/* Grid of Perks */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        margin: '2rem 0 4rem 0'
      }}>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ padding: '10px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.08)', color: 'var(--accent)' }}>
            <ShieldCheck size={24} />
          </div>
          <h4 style={{ margin: 0, fontSize: '1.05rem' }}>Secure Delivery</h4>
          <p style={{ fontSize: '0.8rem', margin: 0 }}>Carefully boxed roots to guarantee healthy arrivals.</p>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ padding: '10px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.08)', color: 'var(--accent)' }}>
            <Percent size={24} />
          </div>
          <h4 style={{ margin: 0, fontSize: '1.05rem' }}>Daily Discounts</h4>
          <p style={{ fontSize: '0.8rem', margin: 0 }}>Unbeatable offers on popular species and starters.</p>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ padding: '10px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.08)', color: 'var(--accent)' }}>
            <HeartHandshake size={24} />
          </div>
          <h4 style={{ margin: 0, fontSize: '1.05rem' }}>Expert Cultivation</h4>
          <p style={{ fontSize: '0.8rem', margin: 0 }}>Raised by certified horticulturists for ideal growth.</p>
        </div>
      </div>

      {/* 2. Discounts Plants down in the home page */}
      <div style={{ marginBottom: '4rem' }}>
        <h2 className="section-title">Special Discounts</h2>
        <p className="section-subtitle">
          Save big today! Check out these handpicked selections currently on discount. Don't miss out on these seasonal prices.
        </p>

        <div className="plant-grid">
          {discountPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      </div>

      {/* 3. Next Button: Garden Plants */}
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
          Ready to decorate your indoor/outdoor garden?
        </h3>
        <p style={{ maxWidth: '500px', fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
          Discover our rich collection of beautiful garden plants like Monstera, Snake Plants, and Fiddle Figs. Click the next button below to browse.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => setActiveTab('garden')}
          style={{
            padding: '12px 28px',
            fontSize: '1rem',
            borderRadius: '30px',
            boxShadow: 'var(--shadow-glow)'
          }}
        >
          <span>Next: Garden Plants</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Home;
