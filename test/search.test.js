// Test de búsqueda
describe('Búsqueda de productos', () => {
  
  const mockProducts = [
    { id: 1, name: 'PS5 Pro', price: 500000, category: 'consoles' },
    { id: 2, name: 'Xbox Series X', price: 400000, category: 'consoles' },
    { id: 3, name: 'Audífonos Gaming', price: 80000, category: 'accessories' },
    { id: 4, name: 'Teclado Mecánico', price: 120000, category: 'accessories' }
  ];

  test('debería buscar productos por nombre', () => {
    const searchProducts = (query, products) => {
      if (!query) return products;
      return products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    };
    
    const results = searchProducts('PS5', mockProducts);
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('PS5 Pro');
  });

  test('debería buscar productos por categoría', () => {
    const searchByCategory = (category, products) => {
      return products.filter(product => product.category === category);
    };
    
    const consoles = searchByCategory('consoles', mockProducts);
    expect(consoles).toHaveLength(2);
    expect(consoles.every(product => product.category === 'consoles')).toBe(true);
  });

  test('debería filtrar por precio', () => {
    const filterByPrice = (minPrice, maxPrice, products) => {
      return products.filter(product => {
        if (minPrice && product.price < minPrice) return false;
        if (maxPrice && product.price > maxPrice) return false;
        return true;
      });
    };
    
    const results = filterByPrice(100000, 300000, mockProducts);
    expect(results).toHaveLength(2);
  });

  test('debería manejar búsquedas vacías', () => {
    const searchProducts = (query, products) => {
      if (!query) return products;
      return products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    };
    
    const results = searchProducts('', mockProducts);
    expect(results).toEqual(mockProducts);
  });

  test('debería manejar búsquedas sin resultados', () => {
    const searchProducts = (query, products) => {
      if (!query) return products;
      return products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    };
    
    const results = searchProducts('producto inexistente', mockProducts);
    expect(results).toHaveLength(0);
  });
});