import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Chairs = () => {
  const { addToCart } = useCart();

  const chairs = [
    {
      id: 14,
      name: 'Silla Gamer Pro',
      image: '/assets/silla1.jpg',
      price: 299990,
      link: '/chairs/silla1'
    },
    {
      id: 15,
      name: 'Silla Gamer RGB',
      image: '/assets/silla2.avif',
      price: 399990,
      link: '/chairs/silla2'
    },
    {
      id: 16,
      name: 'Silla Gamer Basic',
      image: '/assets/silla3.webp',
      price: 199990,
      link: '/chairs/silla3'
    },
    {
      id: 17,
      name: 'Silla Gamer Premium',
      image: '/assets/silla4.webp',
      price: 499990,
      link: '/chairs/silla4'
    },
    {
      id: 18,
      name: 'Silla Gamer Elite',
      image: '/assets/silla5.webp',
      price: 599990,
      link: '/chairs/silla5'
    }
  ];

  const handleAddToCart = (chair) => {
    addToCart(chair);
  };

  return (
    <div>
      <section className="home-hero"></section>
      <section className="product-grid">
        {chairs.map((chair) => (
          <div key={chair.id} className="product-card">
            <Link to={`/product/${chair.link.split('/').pop()}`}>
              <div className="product-title">{chair.name}</div>
              <img src={chair.image} alt={chair.name} />
            </Link>
            <div className="product-price">
              ${chair.price.toLocaleString('es-CL')} CLP
            </div>
            <button 
              className="submit-btn"
              onClick={() => handleAddToCart(chair)}
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

export default Chairs;
