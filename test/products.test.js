// Test de productos
import { productService } from '../src/data/products';

describe('Productos', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debería obtener todos los productos', () => {
    const products = productService.getAllProducts();
    
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  test('debería obtener productos por categoría', () => {
    const consoles = productService.getProductsByCategory('consoles');
    
    expect(Array.isArray(consoles)).toBe(true);
    consoles.forEach(product => {
      expect(product.category).toBe('consoles');
    });
  });

  test('debería buscar productos', () => {
    const searchResults = productService.searchProducts('PS5');
    
    expect(Array.isArray(searchResults)).toBe(true);
    searchResults.forEach(product => {
      expect(product.name.toLowerCase()).toContain('ps5');
    });
  });

  test('debería obtener producto por ID', () => {
    const allProducts = productService.getAllProducts();
    const firstProduct = allProducts[0];
    
    const foundProduct = productService.getProductById(firstProduct.id);
    
    expect(foundProduct).toBeDefined();
    expect(foundProduct.id).toBe(firstProduct.id);
  });

  test('debería retornar null para ID inexistente', () => {
    const nonExistentProduct = productService.getProductById(99999);
    
    expect(nonExistentProduct).toBeNull();
  });
});