import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { productService } from '../data/products';

const Offers = () => {
  const { addToCart } = useCart();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener productos en oferta
    const productsOnSale = productService.getProductsOnSale();
    setOffers(productsOnSale);
    setLoading(false);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} agregado al carrito!`);
  };

  const calculateDiscount = (originalPrice, currentPrice) => {
    const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  if (loading) {
    return (
      <div className="offers-container">
        <h2 style={{ color: '#ffffff', textAlign: 'center', marginTop: '2rem' }}>
          Cargando ofertas...
        </h2>
      </div>
    );
  }

  return (
    <div className="offers-container">
      <div className="offers-hero">
        <h1>🔥 Ofertas Especiales</h1>
        <p>¡Aprovecha estas increíbles ofertas por tiempo limitado!</p>
      </div>

      {offers.length === 0 ? (
        <div className="no-offers">
          <h2>No hay ofertas disponibles en este momento</h2>
          <p>Vuelve pronto para ver nuestras mejores ofertas</p>
          <Link to="/" className="submit-btn">
            Ver Todos los Productos
          </Link>
        </div>
      ) : (
        <>
          {/* Banner de ofertas destacadas */}
          <section className="featured-offers">
            <h2>Ofertas Destacadas</h2>
            <div className="offers-banner">
              <div className="banner-content">
                <h3>🎮 Hasta 50% de Descuento</h3>
                <p>En consolas y accesorios gaming</p>
                <span className="banner-timer">⏰ Oferta válida hasta el 31 de enero</span>
              </div>
            </div>
          </section>

          {/* Lista de ofertas */}
          <section className="offers-list">
            <h2>Todas las Ofertas</h2>
            <div className="offers-grid">
              {offers.map((product) => {
                const discount = calculateDiscount(product.originalPrice, product.price);
                return (
                  <div key={product.id} className="offer-card">
                    <div className="offer-badge">
                      -{discount}%
                    </div>
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-category">{product.category}</p>
                      <div className="price-info">
                        <span className="original-price">
                          ${product.originalPrice.toLocaleString('es-CL')}
                        </span>
                        <span className="current-price">
                          ${product.price.toLocaleString('es-CL')}
                        </span>
                      </div>
                      <p className="savings">
                        Ahorras: ${(product.originalPrice - product.price).toLocaleString('es-CL')}
                      </p>
                      <div className="product-actions">
                        <Link 
                          to={`/product/${product.id}`} 
                          className="view-details-btn"
                        >
                          Ver Detalles
                        </Link>
                        <button 
                          className="add-to-cart-btn"
                          onClick={() => handleAddToCart(product)}
                        >
                          Agregar al Carrito
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Ofertas por categoría */}
          <section className="category-offers">
            <h2>Ofertas por Categoría</h2>
            <div className="category-grid">
              <div className="category-offer">
                <img src="/assets/consola.webp" alt="Consolas" />
                <div className="category-info">
                  <h3>Consolas</h3>
                  <p>Hasta 30% de descuento</p>
                  <Link to="/consoles" className="category-link">
                    Ver Ofertas
                  </Link>
                </div>
              </div>
              <div className="category-offer">
                <img src="/assets/accesorio.png" alt="Accesorios" />
                <div className="category-info">
                  <h3>Accesorios</h3>
                  <p>Hasta 40% de descuento</p>
                  <Link to="/accessories" className="category-link">
                    Ver Ofertas
                  </Link>
                </div>
              </div>
              <div className="category-offer">
                <img src="/assets/silla2.webp" alt="Sillas" />
                <div className="category-info">
                  <h3>Sillas Gaming</h3>
                  <p>Hasta 25% de descuento</p>
                  <Link to="/chairs" className="category-link">
                    Ver Ofertas
                  </Link>
                </div>
              </div>
              <div className="category-offer">
                <img src="/assets/juegosmesa.webp" alt="Juegos de Mesa" />
                <div className="category-info">
                  <h3>Juegos de Mesa</h3>
                  <p>Hasta 35% de descuento</p>
                  <Link to="/board-games" className="category-link">
                    Ver Ofertas
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter de ofertas */}
          <section className="offers-newsletter">
            <div className="newsletter-content">
              <h3>📧 ¡No te pierdas ninguna oferta!</h3>
              <p>Suscríbete a nuestro newsletter y recibe las mejores ofertas directamente en tu email</p>
              <form className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Tu email aquí..." 
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  Suscribirse
                </button>
              </form>
            </div>
          </section>

          {/* Términos y condiciones */}
          <section className="offers-terms">
            <h3>📋 Términos de las Ofertas</h3>
            <div className="terms-content">
              <ul>
                <li>Las ofertas son válidas hasta agotar stock o hasta la fecha indicada</li>
                <li>Los descuentos no son acumulables con otras promociones</li>
                <li>Los precios mostrados incluyen IVA</li>
                <li>Las ofertas pueden variar sin previo aviso</li>
                <li>Válido solo para compras online</li>
              </ul>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Offers;
