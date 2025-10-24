import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Mice = () => {
  const { addToCart } = useCart();

  const mice = [
    {
      id: 19,
      name: 'Mouse Gaming Pro',
      image: '/assets/mouse1.png',
      price: 89990,
      link: '/mice/mouse1'
    },
    {
      id: 20,
      name: 'Mouse Gaming RGB',
      image: '/assets/mouse2.webp',
      price: 129990,
      link: '/mice/mouse2'
    },
    {
      id: 21,
      name: 'Mouse Gaming Wireless',
      image: '/assets/mouse3.png',
      price: 159990,
      link: '/mice/mouse3'
    }
  ];

  const handleAddToCart = (mouse) => {
    addToCart(mouse);
  };

  return (
    <div>
      <section className="home-hero"></section>
      <section className="product-grid">
        {mice.map((mouse) => (
          <div key={mouse.id} className="product-card">
            <Link to={`/product/${mouse.link.split('/').pop()}`}>
              <div className="product-title">{mouse.name}</div>
              <img src={mouse.image} alt={mouse.name} />
            </Link>
            <div className="product-price">
              ${mouse.price.toLocaleString('es-CL')} CLP
            </div>
            <button 
              className="submit-btn"
              onClick={() => handleAddToCart(mouse)}
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

export default Mice;
