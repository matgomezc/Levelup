import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  // Obtener información de la última orden
  const orderData = JSON.parse(localStorage.getItem('lastOrder') || '{}');

  const handlePrintReceipt = () => {
    // Simular impresión de boleta
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Boleta de Compra - ${orderData.orderNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; }
            .order-info { margin: 20px 0; }
            .items { margin: 20px 0; }
            .item { display: flex; justify-content: space-between; margin: 10px 0; }
            .total { font-size: 18px; font-weight: bold; border-top: 2px solid #333; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>MALETA DIDÁCTICA</h1>
            <p>Boleta de Compra</p>
          </div>
          <div class="order-info">
            <p><strong>Número de Orden:</strong> ${orderData.orderNumber}</p>
            <p><strong>Fecha:</strong> ${new Date(orderData.date).toLocaleDateString('es-CL')}</p>
            <p><strong>Cliente:</strong> ${orderData.customerInfo?.nombre} ${orderData.customerInfo?.apellidos}</p>
            <p><strong>Email:</strong> ${orderData.customerInfo?.correo}</p>
          </div>
          <div class="items">
            <h3>Productos:</h3>
            ${orderData.items?.map(item => `
              <div class="item">
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toLocaleString('es-CL')}</span>
              </div>
            `).join('')}
          </div>
          <div class="total">
            <p>Total Pagado: $${orderData.total?.toLocaleString('es-CL')}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleEmailReceipt = () => {
    // Simular envío de boleta por email
    alert('Boleta enviada por email a ' + orderData.customerInfo?.correo);
  };

  return (
    <div className="checkout-success-container">
      <div className="success-content">
        {/* Header con confirmación */}
        <div className="success-header">
          <div className="success-icon">✅</div>
          <div className="success-text">
            <h2>Se ha realizado la compra. nro {orderData.orderNumber || '#20240705'}</h2>
            <p className="order-code">Código order: ORDER{orderData.orderNumber?.replace('#', '') || '12345'}</p>
          </div>
        </div>

        {/* Información del cliente */}
        <div className="customer-info">
          <h3>Completa la siguiente información</h3>
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
          <h3>Dirección de entrega de los productos</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Calle:</label>
              <span>{orderData.deliveryAddress?.calle || 'Los crisantemos, Edificio Norte'}</span>
            </div>
            <div className="info-item">
              <label>Departamento (opcional):</label>
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
              <label>Indicaciones para la entrega (opcional):</label>
              <span>{orderData.deliveryAddress?.indicaciones || 'El martes no estaremos en el depto, pero puede dejarselo con el conserje.'}</span>
            </div>
          </div>
        </div>

        {/* Lista de productos */}
        <div className="order-items">
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
                  <div className="placeholder-image">📦</div>
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
                  <div className="item-price">$5,099</div>
                  <div className="item-quantity">1</div>
                  <div className="item-subtotal">$5,099</div>
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
                  <div className="item-price">$5,999</div>
                  <div className="item-quantity">1</div>
                  <div className="item-subtotal">$5,999</div>
                </div>
              </>
            )}
          </div>
          <div className="order-total">
            <h3>Total pagado: $ {orderData.total?.toLocaleString('es-CL') || '28,775'}</h3>
          </div>
        </div>

        {/* Acciones */}
        <div className="success-actions">
          <button 
            className="action-btn print-btn"
            onClick={handlePrintReceipt}
          >
            Imprimir boleta en PDF
          </button>
          <button 
            className="action-btn email-btn"
            onClick={handleEmailReceipt}
          >
            Enviar boleta por email
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
