import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const TShirts = () => {
  const { addToCart } = useCart();

  const tshirts = [
    {
      id: 26,
      name: 'Polera Gaming Personalizada',
      image: '/assets/descarga.webp',
      price: 29990,
      link: '/t-shirts/tshirt1'
    }
  ];

  const handleAddToCart = (tshirt) => {
    addToCart(tshirt);
  };

  return (
    <div>
      <section className="home-hero"></section>
      <section className="product-grid">
        {tshirts.map((tshirt) => (
          <div key={tshirt.id} className="product-card">
            <Link to={`/product/${tshirt.link.split('/').pop()}`}>
              <div className="product-title">{tshirt.name}</div>
              <img src={tshirt.image} alt={tshirt.name} />
            </Link>
            <div className="product-price">
              ${tshirt.price.toLocaleString('es-CL')} CLP
            </div>
            <button 
              className="submit-btn"
              onClick={() => handleAddToCart(tshirt)}
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

export default TShirts;
