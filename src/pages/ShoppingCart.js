import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleProceedToPayment = () => {
    navigate('/card-payment');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2 style={{ color: '#ffffff', textAlign: 'center', marginTop: '2rem' }}>
          Tu carrito está vacío
        </h2>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 style={{ color: '#ffffff', marginBottom: '2rem' }}>Carrito de Compras</h2>
      
      <div id="lista-carrito">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <img 
                src={item.image} 
                alt={item.name}
                className="cart-item-image"
              />
              <div>
                <h4>{item.name}</h4>
                <p>${item.price.toLocaleString('es-CL')} c/u</p>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>
            </div>
            <div className="cart-item-actions">
              <p>Subtotal: ${(item.price * item.quantity).toLocaleString('es-CL')}</p>
              <button 
                className="remove-btn"
                onClick={() => handleRemoveItem(item.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Resumen de Compra</h3>
        <p>Total productos: ${getTotalPrice().toLocaleString('es-CL')}</p>
        <div className="total-price">
          Total: ${getTotalPrice().toLocaleString('es-CL')}
        </div>
        <button 
          className="submit-btn" 
          style={{ marginTop: '1rem' }}
          onClick={handleProceedToPayment}
        >
          Proceder al Pago
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
