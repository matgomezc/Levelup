import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const BoardGames = () => {
  const { addToCart } = useCart();

  const boardGames = [
    {
      id: 28,
      name: '¿Adivina Quién?',
      image: '/assets/adivinaquien.webp',
      price: 29990,
      link: '/board-games/adivinaquien'
    },
    {
      id: 29,
      name: 'Ajedrez',
      image: '/assets/ajedrez.webp',
      price: 19990,
      link: '/board-games/ajedrez'
    },
    {
      id: 30,
      name: 'Basta',
      image: '/assets/basta.webp',
      price: 14990,
      link: '/board-games/basta'
    },
    {
      id: 31,
      name: 'Carcassonne',
      image: '/assets/carcassonne.png',
      price: 39990,
      link: '/board-games/carcassonne'
    },
    {
      id: 32,
      name: 'Catan',
      image: '/assets/catan.webp',
      price: 49990,
      link: '/board-games/catan'
    },
    {
      id: 33,
      name: 'Jenga',
      image: '/assets/jenga.jpg',
      price: 24990,
      link: '/board-games/jenga'
    },
    {
      id: 34,
      name: 'Ludo',
      image: '/assets/ludo.webp',
      price: 19990,
      link: '/board-games/ludo'
    },
    {
      id: 35,
      name: 'Uno',
      image: '/assets/uno.png',
      price: 9990,
      link: '/board-games/uno'
    }
  ];

  const handleAddToCart = (game) => {
    addToCart(game);
  };

  return (
    <div>
      <section className="home-hero"></section>
      <section className="product-grid">
        {boardGames.map((game) => (
          <div key={game.id} className="product-card">
            <Link to={`/product/${game.link.split('/').pop()}`}>
              <div className="product-title">{game.name}</div>
              <img src={game.image} alt={game.name} />
            </Link>
            <div className="product-price">
              ${game.price.toLocaleString('es-CL')} CLP
            </div>
            <button 
              className="submit-btn"
              onClick={() => handleAddToCart(game)}
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

export default BoardGames;
