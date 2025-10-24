import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header>
      <Link to="/">
        <img src="/assets/logo-em.png" alt="Logo" />
      </Link>
      <nav>
        <Link to="/">HOME</Link>
        <Link to="/search">CATEGORÍAS</Link>
        <Link to="/offers">OFERTAS</Link>
        <Link to="/blog">BLOG</Link>
        <Link to="/contact">CONTACTO</Link>
        <Link to="/login">LOGIN</Link>
      </nav>
      <div className="user">
        <Link to="/cart" className="btn-carrito" data-count={cartCount}>
          Carrito de compras🛒
        </Link>
        <Link to="/profile" data-count="3">
          👤Perfil
        </Link>
      </div>
    </header>
  );
};

export default Header;
