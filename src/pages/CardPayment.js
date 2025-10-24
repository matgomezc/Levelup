import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CardPayment = () => {
  const { getTotalPrice } = useCart();
  const navigate = useNavigate();
  
  // Obtener información de la orden desde localStorage
  const [orderInfo, setOrderInfo] = useState(null);
  
  // Cargar información de la orden al montar el componente
  useEffect(() => {
    const customerData = JSON.parse(localStorage.getItem('customerData') || '{}');
    const cartData = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    if (customerData.customerInfo && cartData.length > 0) {
      setOrderInfo({
        customerInfo: customerData.customerInfo,
        deliveryAddress: customerData.deliveryAddress,
        items: cartData,
        total: cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      });
    } else {
      // Si no hay información, redirigir al inicio
      navigate('/');
    }
  }, [navigate]);
  
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Formatear número de tarjeta
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      setCardData(prev => ({
        ...prev,
        [name]: formatted
      }));
    }
    // Formatear fecha de vencimiento
    else if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(.{2})/, '$1/');
      setCardData(prev => ({
        ...prev,
        [name]: formatted
      }));
    }
    // Solo números para CVV
    else if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '');
      setCardData(prev => ({
        ...prev,
        [name]: formatted
      }));
    }
    else {
      setCardData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateCard = () => {
    const newErrors = {};
    
    if (!cardData.cardNumber.trim()) {
      newErrors.cardNumber = 'Número de tarjeta requerido';
    } else if (cardData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Número de tarjeta inválido';
    }
    
    if (!cardData.expiryDate.trim()) {
      newErrors.expiryDate = 'Fecha de vencimiento requerida';
    } else if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      newErrors.expiryDate = 'Formato inválido (MM/AA)';
    }
    
    if (!cardData.cvv.trim()) {
      newErrors.cvv = 'CVV requerido';
    } else if (cardData.cvv.length < 3) {
      newErrors.cvv = 'CVV inválido';
    }
    
    if (!cardData.cardholderName.trim()) {
      newErrors.cardholderName = 'Nombre del titular requerido';
    }
    
    if (!cardData.email.trim()) {
      newErrors.email = 'Email requerido';
    } else if (!/\S+@\S+\.\S+/.test(cardData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateCard()) {
      return;
    }
    
    setIsProcessing(true);
    
    // Simular procesamiento de pago
    setTimeout(() => {
      // Simular éxito o error de pago (85% éxito, 15% error)
      const isSuccess = Math.random() > 0.15;
      
      if (isSuccess) {
        // Generar número de orden
        const orderNumber = `#${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${String(new Date().getHours()).padStart(2, '0')}${String(new Date().getMinutes()).padStart(2, '0')}`;
        
        // Guardar información de la orden
        const orderData = {
          orderNumber,
          paymentMethod: 'card',
          paymentData: cardData,
          customerInfo: {
            ...orderInfo.customerInfo,
            email: cardData.email
          },
          deliveryAddress: orderInfo.deliveryAddress,
          items: orderInfo.items,
          total: orderInfo.total,
          date: new Date().toISOString()
        };
        
        // Guardar en localStorage
        localStorage.setItem('lastOrder', JSON.stringify(orderData));
        
        // Limpiar datos temporales
        localStorage.removeItem('customerData');
        localStorage.removeItem('cartItems');
        
        // Redirigir a página de éxito
        navigate('/checkout-success');
      } else {
        // Redirigir a página de error
        navigate('/checkout-error');
      }
      
      setIsProcessing(false);
    }, 3000);
  };

  // Mostrar loading mientras se carga la información
  if (!orderInfo) {
    return (
      <div className="card-payment-container">
        <div className="card-payment-content">
          <h2>Cargando información...</h2>
          <p>Por favor espera mientras cargamos tu orden.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-payment-container">
      <div className="card-payment-content">
        <h2>Pago con Tarjeta</h2>
        
        <div className="payment-summary">
          <h3>Resumen de Compra</h3>
          <div className="summary-items">
            {orderInfo.items.map((item) => (
              <div key={item.id} className="summary-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">x{item.quantity}</span>
                </div>
                <div className="item-price">
                  ${(item.price * item.quantity).toLocaleString('es-CL')}
                </div>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <strong>Total a pagar: ${orderInfo.total.toLocaleString('es-CL')}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card-payment-form">
          <div className="form-section">
            <h3>Información de la Tarjeta</h3>
            
            <div className="form-group">
              <label htmlFor="cardNumber">Número de Tarjeta *</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={cardData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className={errors.cardNumber ? 'error' : ''}
                maxLength="19"
              />
              {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cardholderName">Nombre del Titular *</label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                value={cardData.cardholderName}
                onChange={handleInputChange}
                placeholder="Juan Pérez"
                className={errors.cardholderName ? 'error' : ''}
              />
              {errors.cardholderName && <span className="error-message">{errors.cardholderName}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Fecha de Vencimiento *</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={cardData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/AA"
                  className={errors.expiryDate ? 'error' : ''}
                  maxLength="5"
                />
                {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV *</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={cardData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className={errors.cvv ? 'error' : ''}
                  maxLength="4"
                />
                {errors.cvv && <span className="error-message">{errors.cvv}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email para Recibo *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={cardData.email}
                onChange={handleInputChange}
                placeholder="usuario@email.com"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </div>

          <div className="form-section">
            <h3>Información de Seguridad</h3>
            <div className="security-info">
              <div className="security-badges">
                <span className="badge">🔒 SSL Seguro</span>
                <span className="badge">🛡️ Protegido</span>
                <span className="badge">✅ Verificado</span>
              </div>
              <p>Tu información está protegida con encriptación SSL de 256 bits.</p>
            </div>
          </div>

          <div className="payment-actions">
            <button 
              type="button" 
              onClick={() => navigate('/payment')} 
              className="btn-secondary"
            >
              Volver a Métodos de Pago
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isProcessing}
            >
              {isProcessing ? 'Procesando Pago...' : `Pagar $${orderInfo.total.toLocaleString('es-CL')}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardPayment;
