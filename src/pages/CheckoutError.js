import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutError = () => {
  // Obtener información de la última orden
  const orderData = JSON.parse(localStorage.getItem('lastOrder') || '{}');

  return (
    <div className="checkout-error-container">
      <div className="error-content">
        <div className="error-header">
          <div className="error-icon">❌</div>
          <h2>No se pudo realizar el pago</h2>
          <p>Número de orden: {orderData.orderNumber || '#20240705'}</p>
        </div>

        <div className="retry-section">
          <button 
            className="retry-btn"
            onClick={() => window.history.back()}
          >
            VOLVER A REALIZAR EL PAGO
          </button>
        </div>

        {/* Información del cliente */}
        <div className="customer-info">
          <h3>Información del Cliente</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Nombre:</label>
              <span>{orderData.customerInfo?.nombre || 'pedro'}</span>
            </div>
            <div className="info-item">
              <label>Apellidos:</label>
              <span>{orderData.customerInfo?.apellidos || 'hacker'}</span>
            </div>
            <div className="info-item">
              <label>Correo:</label>
              <span>{orderData.customerInfo?.correo || 'pedro.hacer20@example.com'}</span>
            </div>
          </div>
        </div>

        {/* Dirección de entrega */}
        <div className="delivery-info">
          <h3>Dirección de Entrega</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Calle:</label>
              <span>{orderData.deliveryAddress?.calle || 'Los crisantemos, Edificio Norte'}</span>
            </div>
            <div className="info-item">
              <label>Departamento:</label>
              <span>{orderData.deliveryAddress?.departamento || 'Depto 603'}</span>
            </div>
            <div className="info-item">
              <label>Región:</label>
              <span>{orderData.deliveryAddress?.region || 'Región Metropolitana de Santiago'}</span>
            </div>
            <div className="info-item">
              <label>Comuna:</label>
              <span>{orderData.deliveryAddress?.comuna || 'Cerrillos'}</span>
            </div>
            <div className="info-item">
              <label>Indicaciones:</label>
              <span>{orderData.deliveryAddress?.indicaciones || 'El martes no estaremos en el depto, pero puede dejarselo con el conserje.'}</span>
            </div>
          </div>
        </div>

        {/* Lista de productos */}
        <div className="order-items">
          <h3>Productos en el Carrito</h3>
          <div className="items-table">
            <div className="table-header">
              <div>Imagen</div>
              <div>Nombre</div>
              <div>Precio</div>
              <div>Cantidad</div>
              <div>Subtotal</div>
            </div>
            {orderData.items?.map((item) => (
              <div key={item.id} className="table-row">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-name">{item.name}</div>
                <div className="item-price">${item.price.toLocaleString('es-CL')}</div>
                <div className="item-quantity">{item.quantity}</div>
                <div className="item-subtotal">${(item.price * item.quantity).toLocaleString('es-CL')}</div>
              </div>
            )) || (
              // Datos de ejemplo si no hay información de la orden
              <>
                <div className="table-row">
                  <div className="item-image">
                    <div className="placeholder-image">📦</div>
                  </div>
                  <div className="item-name">Fortnite</div>
                  <div className="item-price">$0</div>
                  <div className="item-quantity">1</div>
                  <div className="item-subtotal">$0</div>
                </div>
                <div className="table-row">
                  <div className="item-image">
                    <div className="placeholder-image">📦</div>
                  </div>
                  <div className="item-name">Minecraft</div>
                  <div className="item-price">$2,695</div>
                  <div className="item-quantity">4</div>
                  <div className="item-subtotal">$10,780</div>
                </div>
                <div className="table-row">
                  <div className="item-image">
                    <div className="placeholder-image">📦</div>
                  </div>
                  <div className="item-name">Red Dead Redemption 2</div>
                  <div className="item-price">$5,999</div>
                  <div className="item-quantity">1</div>
                  <div className="item-subtotal">$5,999</div>
                </div>
                <div className="table-row">
                  <div className="item-image">
                    <div className="placeholder-image">📦</div>
                  </div>
                  <div className="item-name">Among Us</div>
                  <div className="item-price">$499</div>
                  <div className="item-quantity">1</div>
                  <div className="item-subtotal">$499</div>
                </div>
                <div className="table-row">
                  <div className="item-image">
                    <div className="placeholder-image">📦</div>
                  </div>
                  <div className="item-name">The Witcher 3</div>
                  <div className="item-price">$3,999</div>
                  <div className="item-quantity">1</div>
                  <div className="item-subtotal">$3,999</div>
                </div>
                <div className="table-row">
                  <div className="item-image">
                    <div className="placeholder-image">📦</div>
                  </div>
                  <div className="item-name">Hollow Knight</div>
                  <div className="item-price">$1,499</div>
                  <div className="item-quantity">1</div>
                  <div className="item-subtotal">$1,499</div>
                </div>
                <div className="table-row">
                  <div className="item-image">
                    <div className="placeholder-image">📦</div>
                  </div>
                  <div className="item-name">Animal Crossing</div>
                  <div className="item-price">$5,000</div>
                  <div className="item-quantity">1</div>
                  <div className="item-subtotal">$5,000</div>
                </div>
              </>
            )}
          </div>
          <div className="order-total">
            <h3>Total: ${orderData.total?.toLocaleString('es-CL') || '28,775'}</h3>
          </div>
        </div>

        {/* Acciones adicionales */}
        <div className="error-actions">
          <Link to="/cart" className="action-btn cart-btn">
            Volver al Carrito
          </Link>
          <Link to="/" className="action-btn home-btn">
            Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutError;
