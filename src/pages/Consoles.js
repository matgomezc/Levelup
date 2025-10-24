import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Consoles = () => {
  const { addToCart } = useCart();

  const consoles = [
    {
      id: 1,
      name: 'PS5 pro 1TB',
      image: '/assets/ps5.webp',
      price: 959990,
      link: '/consoles/ps5'
    },
    {
      id: 2,
      name: 'PS5 digital 1TB',
      image: '/assets/PS5-dig.webp',
      price: 549990,
      originalPrice: 684990,
      link: '/consoles/ps5-digital'
    },
    {
      id: 3,
      name: 'CONSOLA XBOX SERIES X 1TB',
      image: '/assets/xbox.webp',
      price: 406990,
      link: '/consoles/xbox'
    },
    {
      id: 4,
      name: 'Nintendo switch',
      image: '/assets/nintendo.webp',
      price: 329990,
      link: '/consoles/nintendo'
    },
    {
      id: 5,
      name: 'PS4 pro 1TB',
      image: '/assets/PS4PRO.webp',
      price: 529990,
      link: '/consoles/ps4-pro'
    },
    {
      id: 6,
      name: 'PS4 1TB',
      image: '/assets/ps4.png',
      price: 279990,
      link: '/consoles/ps4'
    }
  ];

  const handleAddToCart = (console) => {
    addToCart(console);
  };

  return (
    <div>
      <section className="home-hero"></section>
      <section className="product-grid">
        {consoles.map((console) => (
          <div key={console.id} className="product-card">
            <Link to={`/product/${console.link.split('/').pop()}`}>
              <div className="product-title">{console.name}</div>
              <img src={console.image} alt={console.name} />
            </Link>
            <div className="product-price">
              ${console.price.toLocaleString('es-CL')} CLP
              {console.originalPrice && (
                <div style={{ textDecoration: 'line-through', color: '#ff4444', fontSize: '0.9rem' }}>
                  ${console.originalPrice.toLocaleString('es-CL')} CLP
                </div>
              )}
            </div>
            <button 
              className="submit-btn"
              onClick={() => handleAddToCart(console)}
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

export default Consoles;
