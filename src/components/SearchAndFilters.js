import React, { useState } from 'react';
import { useSearch } from '../context/SearchContext';

const SearchAndFilters = () => {
  const { searchTerm, filters, updateSearchTerm, updateFilters, clearFilters } = useSearch();
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e) => {
    updateSearchTerm(e.target.value);
  };

  const handleFilterChange = (key, value) => {
    updateFilters({ [key]: value });
  };

  const categories = [
    { value: '', label: 'Todas las categorías' },
    { value: 'Consolas', label: 'Consolas' },
    { value: 'Accesorios', label: 'Accesorios' },
    { value: 'PC Gamers', label: 'PC Gamers' },
    { value: 'Sillas', label: 'Sillas' },
    { value: 'Mouses', label: 'Mouses' },
    { value: 'Mousepads', label: 'Mousepads' },
    { value: 'Juegos de Mesa', label: 'Juegos de Mesa' },
    { value: 'Ropa', label: 'Ropa' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Nombre A-Z' },
    { value: 'name-desc', label: 'Nombre Z-A' },
    { value: 'price', label: 'Precio Menor a Mayor' },
    { value: 'price-desc', label: 'Precio Mayor a Menor' }
  ];

  return (
    <div style={{
      backgroundColor: '#1E90FF',
      padding: '1rem',
      borderRadius: '10px',
      margin: '1rem 0',
      color: '#ffffff'
    }}>
      {/* Barra de búsqueda */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            width: '100%',
            padding: '0.8rem',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            backgroundColor: '#ffffff',
            color: '#000000'
          }}
        />
      </div>

      {/* Botones de filtros */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            backgroundColor: '#39FF14',
            color: '#000000',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
        </button>
        
        <button
          onClick={clearFilters}
          style={{
            backgroundColor: '#ff4444',
            color: '#ffffff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Limpiar Filtros
        </button>
      </div>

      {/* Panel de filtros */}
      {showFilters && (
        <div style={{
          backgroundColor: '#303030',
          padding: '1rem',
          borderRadius: '5px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {/* Filtro por categoría */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Categoría:
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: '#ffffff',
                color: '#000000'
              }}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por precio mínimo */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Precio Mínimo:
            </label>
            <input
              type="number"
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: '#ffffff',
                color: '#000000'
              }}
            />
          </div>

          {/* Filtro por precio máximo */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Precio Máximo:
            </label>
            <input
              type="number"
              placeholder="Sin límite"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: '#ffffff',
                color: '#000000'
              }}
            />
          </div>

          {/* Ordenar por */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Ordenar por:
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: '#ffffff',
                color: '#000000'
              }}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Mostrar filtros activos */}
      {(searchTerm || filters.category || filters.minPrice || filters.maxPrice) && (
        <div style={{ marginTop: '1rem', padding: '0.5rem', backgroundColor: '#303030', borderRadius: '5px' }}>
          <strong>Filtros activos:</strong>
          {searchTerm && <span style={{ marginLeft: '0.5rem' }}>Búsqueda: "{searchTerm}"</span>}
          {filters.category && <span style={{ marginLeft: '0.5rem' }}>Categoría: {filters.category}</span>}
          {filters.minPrice && <span style={{ marginLeft: '0.5rem' }}>Precio min: ${filters.minPrice}</span>}
          {filters.maxPrice && <span style={{ marginLeft: '0.5rem' }}>Precio max: ${filters.maxPrice}</span>}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;
