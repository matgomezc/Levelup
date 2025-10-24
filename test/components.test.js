// Test de componentes
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

const RouterWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Header', () => {
  
  test('debería renderizar el header', () => {
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  test('debería mostrar el logo', () => {
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );
    
    const logo = screen.getByRole('img');
    expect(logo).toBeInTheDocument();
  });

  test('debería mostrar enlaces de navegación', () => {
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );
    
    expect(screen.getByRole('link', { name: /consolas/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /carrito/i })).toBeInTheDocument();
  });

  test('debería mostrar botones de usuario', () => {
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );
    
    expect(screen.getByRole('link', { name: /iniciar sesión/i })).toBeInTheDocument();
  });
});

describe('Footer', () => {
  
  test('debería renderizar el footer', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  test('debería mostrar información de la empresa', () => {
    render(<Footer />);
    
    expect(screen.getByText(/levelup/i)).toBeInTheDocument();
  });

  test('debería mostrar enlaces del footer', () => {
    render(<Footer />);
    
    expect(screen.getByRole('link', { name: /inicio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contacto/i })).toBeInTheDocument();
  });
});