import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const PCGamers = () => {
  const { addToCart } = useCart();

  const pcs = [
    {
      id: 11,
      name: 'PC Gamer Pro',
      image: '/assets/pc1.webp',
      price: 1299990,
      link: '/pc-gamers/pc1'
    },
    {
      id: 12,
      name: 'PC Gamer Mid',
      image: '/assets/pc2.webp',
      price: 899990,
      link: '/pc-gamers/pc2'
    },
    {
      id: 13,
      name: 'PC Gamer Basic',
      image: '/assets/pc3.jpg',
      price: 599990,
      link: '/pc-gamers/pc3'
    }
  ];

  const handleAddToCart = (pc) => {
    addToCart(pc);
  };

  return (
    <div>
      <section className="home-hero"></section>
      <section className="product-grid">
        {pcs.map((pc) => (
          <div key={pc.id} className="product-card">
            <Link to={`/product/${pc.link.split('/').pop()}`}>
              <div className="product-title">{pc.name}</div>
              <img src={pc.image} alt={pc.name} />
            </Link>
            <div className="product-price">
              ${pc.price.toLocaleString('es-CL')} CLP
            </div>
            <button 
              className="submit-btn"
              onClick={() => handleAddToCart(pc)}
              style={{ marginTop: '0.5rem' }}
            >
              Agregar al Carrito
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default PCGamers;
