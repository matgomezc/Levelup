// Test del carrito de compras
import { CartProvider, useCart } from '../src/context/CartContext';
import { renderHook, act } from '@testing-library/react';

// Mock de un producto de prueba
const mockProduct = {
  id: 1,
  name: 'PS5 Pro',
  price: 959990,
  image: '/assets/ps5.webp',
  category: 'consoles'
};

const mockProduct2 = {
  id: 2,
  name: 'Xbox Series X',
  price: 406990,
  image: '/assets/xbox.webp',
  category: 'consoles'
};

describe('Carrito de compras', () => {
  let result;

  beforeEach(() => {
    localStorage.clear();
    const { result: hookResult } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });
    result = hookResult;
  });

  test('debería empezar vacío', () => {
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.getTotalPrice()).toBe(0);
  });

  test('debería agregar un producto', () => {
    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].name).toBe('PS5 Pro');
  });

  test('debería sumar cantidad si el producto ya existe', () => {
    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cartItems[0].quantity).toBe(2);
  });

  test('debería eliminar un producto', () => {
    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cartItems).toHaveLength(1);

    act(() => {
      result.current.removeFromCart(1);
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  test('debería calcular el total', () => {
    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct2);
    });

    const total = mockProduct.price + mockProduct2.price;
    expect(result.current.getTotalPrice()).toBe(total);
  });
});
