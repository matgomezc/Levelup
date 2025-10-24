// Test de navegación
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

const MockApp = () => (
  <MemoryRouter initialEntries={['/']}>
    <App />
  </MemoryRouter>
);

describe('Navegación', () => {
  
  test('debería mostrar la página de inicio', () => {
    render(<MockApp />);
    
    expect(screen.getByText('Juegos de mesa')).toBeInTheDocument();
    expect(screen.getByText('Consolas')).toBeInTheDocument();
  });

  test('debería navegar a página de consolas', () => {
    render(
      <MemoryRouter initialEntries={['/consoles']}>
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByText('PS5 pro 1TB')).toBeInTheDocument();
  });

  test('debería navegar a página de carrito', () => {
    render(
      <MemoryRouter initialEntries={['/cart']}>
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument();
  });

  test('debería mostrar enlaces de navegación', () => {
    render(<MockApp />);
    
    expect(screen.getByRole('link', { name: /consolas/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /carrito/i })).toBeInTheDocument();
  });

  test('debería manejar clics en enlaces', () => {
    render(<MockApp />);
    
    const consolesLink = screen.getByRole('link', { name: /consolas/i });
    fireEvent.click(consolesLink);
    
    expect(consolesLink).toHaveAttribute('href', '/consoles');
  });
});