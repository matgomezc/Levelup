import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Mousepads = () => {
  const { addToCart } = useCart();

  const mousepads = [
    {
      id: 22,
      name: 'Mousepad Gaming XL',
      image: '/assets/mousepad1.webp',
      price: 29990,
      link: '/mousepads/mousepad1'
    },
    {
      id: 23,
      name: 'Mousepad RGB',
      image: '/assets/mousepad2.png',
      price: 49990,
      link: '/mousepads/mousepad2'
    },
    {
      id: 24,
      name: 'Mousepad Pro',
      image: '/assets/mousepad3.avif',
      price: 39990,
      link: '/mousepads/mousepad3'
    },
    {
      id: 25,
      name: 'Mousepad Elite',
      image: '/assets/mousepad4.webp',
      price: 59990,
      link: '/mousepads/mousepad4'
    }
  ];

  const handleAddToCart = (mousepad) => {
    addToCart(mousepad);
  };

  return (
    <div>
      <section className="home-hero"></section>
      <section className="product-grid">
        {mousepads.map((mousepad) => (
          <div key={mousepad.id} className="product-card">
            <Link to={`/product/${mousepad.link.split('/').pop()}`}>
              <div className="product-title">{mousepad.name}</div>
              <img src={mousepad.image} alt={mousepad.name} />
            </Link>
            <div className="product-price">
              ${mousepad.price.toLocaleString('es-CL')} CLP
            </div>
            <button 
              className="submit-btn"
              onClick={() => handleAddToCart(mousepad)}
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

export default Mousepads;
