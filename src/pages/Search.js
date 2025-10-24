import React, { useState, useEffect } from 'react';
import { useSearch } from '../context/SearchContext';
import { useCart } from '../context/CartContext';
import SearchAndFilters from '../components/SearchAndFilters';
import { productService } from '../data/products';

const Search = () => {
  const { searchTerm, filters } = useSearch();
  const { addToCart } = useCart();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Cargar productos desde el servicio centralizado
  useEffect(() => {
    const products = productService.getAllProducts();
    setAllProducts(products);
  }, []);

  // Filtrar productos
  useEffect(() => {
    let filtered = [...allProducts];

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Filtrar por precio mínimo
    if (filters.minPrice) {
      filtered = filtered.filter(product => product.price >= parseInt(filters.minPrice));
    }

    // Filtrar por precio máximo
    if (filters.maxPrice) {
      filtered = filtered.filter(product => product.price <= parseInt(filters.maxPrice));
    }

    // Ordenar productos
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [allProducts, searchTerm, filters]);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} agregado al carrito!`);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#ffffff', marginBottom: '2rem' }}>Búsqueda de Productos</h1>
      
      <SearchAndFilters />
      
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ color: '#ffffff', marginBottom: '1rem' }}>
          {filteredProducts.length} productos encontrados
        </h2>
        
        {filteredProducts.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: '#ffffff',
            backgroundColor: '#333',
            borderRadius: '10px'
          }}>
            <h3>No se encontraron productos</h3>
            <p>Intenta ajustar tus filtros de búsqueda</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            {filteredProducts.map((product) => (
              <div key={product.id} style={{
                backgroundColor: '#444',
                borderRadius: '10px',
                padding: '1.5rem',
                border: '1px solid #555'
              }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                  }}
                />
                <h3 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>
                  {product.name}
                </h3>
                <p style={{ color: '#ccc', marginBottom: '0.5rem' }}>
                  {product.category}
                </p>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <span style={{ 
                    color: '#4CAF50', 
                    fontSize: '1.2rem', 
                    fontWeight: 'bold' 
                  }}>
                    ${product.price.toLocaleString('es-CL')}
                  </span>
                  {product.originalPrice && (
                    <span style={{ 
                      color: '#999', 
                      textDecoration: 'line-through',
                      fontSize: '0.9rem'
                    }}>
                      ${product.originalPrice.toLocaleString('es-CL')}
                    </span>
                  )}
                </div>
                <button 
                  onClick={() => handleAddToCart(product)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}
                >
                  Agregar al Carrito
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
