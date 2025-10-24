import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Hoodies = () => {
  const { addToCart } = useCart();

  const hoodies = [
    {
      id: 27,
      name: 'Polerón Gaming Personalizado',
      image: '/assets/poleron.webp',
      price: 49990,
      link: '/hoodies/hoodie1'
    }
  ];

  const handleAddToCart = (hoodie) => {
    addToCart(hoodie);
  };

  return (
    <div>
      <section className="home-hero"></section>
      <section className="product-grid">
        {hoodies.map((hoodie) => (
          <div key={hoodie.id} className="product-card">
            <Link to={`/product/${hoodie.link.split('/').pop()}`}>
              <div className="product-title">{hoodie.name}</div>
              <img src={hoodie.image} alt={hoodie.name} />
            </Link>
            <div className="product-price">
              ${hoodie.price.toLocaleString('es-CL')} CLP
            </div>
            <button 
              className="submit-btn"
              onClick={() => handleAddToCart(hoodie)}
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

export default Hoodies;
