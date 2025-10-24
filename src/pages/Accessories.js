import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Accessories = () => {
  const { addToCart } = useCart();

  const accessories = [
    {
      id: 7,
      name: 'Audífonos Gaming',
      image: '/assets/audifonos.png',
      price: 89990,
      link: '/accessories/headphones'
    },
    {
      id: 8,
      name: 'Mando Xbox',
      image: '/assets/mandoxbox.png',
      price: 59990,
      link: '/accessories/xbox-controller'
    },
    {
      id: 9,
      name: 'Monitor Gaming',
      image: '/assets/moni.png',
      price: 299990,
      link: '/accessories/monitor'
    },
    {
      id: 10,
      name: 'Teclado Mecánico',
      image: '/assets/teclado.png',
      price: 129990,
      link: '/accessories/keyboard'
    }
  ];

  const handleAddToCart = (accessory) => {
    addToCart(accessory);
  };

  return (
    <div>
      <section className="home-hero"></section>
      <section className="product-grid">
        {accessories.map((accessory) => (
          <div key={accessory.id} className="product-card">
            <Link to={`/product/${accessory.link.split('/').pop()}`}>
              <div className="product-title">{accessory.name}</div>
              <img src={accessory.image} alt={accessory.name} />
            </Link>
            <div className="product-price">
              ${accessory.price.toLocaleString('es-CL')} CLP
            </div>
            <button 
              className="submit-btn"
              onClick={() => handleAddToCart(accessory)}
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

export default Accessories;
