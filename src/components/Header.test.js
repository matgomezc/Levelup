// Test básico del Header
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import Header from './Header';

const MockHeader = () => (
  <BrowserRouter>
    <CartProvider>
      <Header />
    </CartProvider>
  </BrowserRouter>
);

describe('Header', () => {
  
  test('debería renderizar el header', () => {
    render(<MockHeader />);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  test('debería mostrar el logo', () => {
    render(<MockHeader />);
    
    const logo = screen.getByRole('img');
    expect(logo).toBeInTheDocument();
  });

  test('debería mostrar enlaces de navegación', () => {
    render(<MockHeader />);
    
    expect(screen.getByRole('link', { name: /consolas/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /carrito/i })).toBeInTheDocument();
  });
});