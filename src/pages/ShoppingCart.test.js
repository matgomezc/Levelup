// Test básico del carrito de compras
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import ShoppingCart from './ShoppingCart';

const MockShoppingCart = () => (
  <BrowserRouter>
    <CartProvider>
      <ShoppingCart />
    </CartProvider>
  </BrowserRouter>
);

describe('ShoppingCart', () => {
  
  test('debería mostrar mensaje de carrito vacío', () => {
    render(<MockShoppingCart />);
    
    expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument();
  });

  test('debería renderizar el componente', () => {
    render(<MockShoppingCart />);
    
    const cartContainer = screen.getByText('Tu carrito está vacío').closest('div');
    expect(cartContainer).toBeInTheDocument();
  });
});