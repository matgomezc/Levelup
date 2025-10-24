import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Payment = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentData, setPaymentData] = useState({
    // Tarjeta de crédito/débito
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    
    // Transferencia bancaria
    bankAccount: '',
    bankName: '',
    
    // PayPal
    paypalEmail: '',
    
    // WebPay
    webpayToken: ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePayment = () => {
    const newErrors = {};
    
    if (!paymentMethod) {
      newErrors.paymentMethod = 'Debe seleccionar un método de pago';
      return newErrors;
    }

    switch (paymentMethod) {
      case 'card':
        if (!paymentData.cardNumber.trim()) newErrors.cardNumber = 'Número de tarjeta requerido';
        if (!paymentData.expiryDate.trim()) newErrors.expiryDate = 'Fecha de vencimiento requerida';
        if (!paymentData.cvv.trim()) newErrors.cvv = 'CVV requerido';
        if (!paymentData.cardholderName.trim()) newErrors.cardholderName = 'Nombre del titular requerido';
        break;
      case 'transfer':
        if (!paymentData.bankAccount.trim()) newErrors.bankAccount = 'Cuenta bancaria requerida';
        if (!paymentData.bankName.trim()) newErrors.bankName = 'Banco requerido';
        break;
      case 'paypal':
        if (!paymentData.paypalEmail.trim()) newErrors.paypalEmail = 'Email de PayPal requerido';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePayment()) {
      return;
    }
    
    // Si es tarjeta, redirigir a página de pago con tarjeta
    if (paymentMethod === 'card') {
      navigate('/card-payment');
      return;
    }
    
    // Para otros métodos, mostrar ventana modal de pago
    setShowPaymentModal(true);
    setPaymentStep(1);
  };

  const handlePaymentProcess = () => {
    setIsProcessing(true);
    setPaymentStep(2);
    
    // Simular procesamiento de pago
    setTimeout(() => {
      setPaymentStep(3);
      
      // Simular éxito o error de pago (80% éxito, 20% error)
      const isSuccess = Math.random() > 0.2;
      
      setTimeout(() => {
        if (isSuccess) {
          // Generar número de orden
          const orderNumber = `#${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${String(new Date().getHours()).padStart(2, '0')}${String(new Date().getMinutes()).padStart(2, '0')}`;
          
          // Obtener información del cliente guardada
          const customerData = JSON.parse(localStorage.getItem('customerData') || '{}');
          
          // Guardar información de la orden
          const orderData = {
            orderNumber,
            paymentMethod,
            paymentData,
            customerInfo: customerData.customerInfo,
            deliveryAddress: customerData.deliveryAddress,
            items: cartItems,
            total: getTotalPrice(),
            date: new Date().toISOString()
          };
          
          // Guardar en localStorage
          localStorage.setItem('lastOrder', JSON.stringify(orderData));
          
          // Limpiar carrito
          clearCart();
          
          // Cerrar modal y redirigir
          setShowPaymentModal(false);
          navigate('/checkout-success');
        } else {
          // Cerrar modal y redirigir a error
          setShowPaymentModal(false);
          navigate('/checkout-error');
        }
        
        setIsProcessing(false);
        setPaymentStep(1);
      }, 2000);
    }, 2000);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setIsProcessing(false);
    setPaymentStep(1);
  };

  const total = getTotalPrice();

  if (cartItems.length === 0) {
    return (
      <div className="payment-container">
        <div className="payment-content">
          <h2>Carrito Vacío</h2>
          <p>No hay productos en tu carrito.</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-content">
        <h2>Métodos de Pago</h2>
        
        <div className="payment-summary">
          <h3>Resumen de Compra</h3>
          <div className="summary-items">
            {cartItems.map((item) => (
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
            <strong>Total a pagar: ${total.toLocaleString('es-CL')}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          {/* Selección de método de pago */}
          <div className="payment-methods">
            <h3>Selecciona tu método de pago</h3>
            <div className="method-options">
              <div className="method-option">
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => handlePaymentMethodChange(e.target.value)}
                />
                <label htmlFor="card" className="method-label">
                  <div className="method-icon">💳</div>
                  <div className="method-info">
                    <h4>Tarjeta de Crédito/Débito</h4>
                    <p>Visa, Mastercard, American Express</p>
                  </div>
                </label>
              </div>

              <div className="method-option">
                <input
                  type="radio"
                  id="webpay"
                  name="paymentMethod"
                  value="webpay"
                  checked={paymentMethod === 'webpay'}
                  onChange={(e) => handlePaymentMethodChange(e.target.value)}
                />
                <label htmlFor="webpay" className="method-label">
                  <div className="method-icon">🏦</div>
                  <div className="method-info">
                    <h4>WebPay Plus</h4>
                    <p>Pago seguro con tu banco</p>
                  </div>
                </label>
              </div>

              <div className="method-option">
                <input
                  type="radio"
                  id="transfer"
                  name="paymentMethod"
                  value="transfer"
                  checked={paymentMethod === 'transfer'}
                  onChange={(e) => handlePaymentMethodChange(e.target.value)}
                />
                <label htmlFor="transfer" className="method-label">
                  <div className="method-icon">🏧</div>
                  <div className="method-info">
                    <h4>Transferencia Bancaria</h4>
                    <p>Transferencia directa a nuestra cuenta</p>
                  </div>
                </label>
              </div>

              <div className="method-option">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => handlePaymentMethodChange(e.target.value)}
                />
                <label htmlFor="paypal" className="method-label">
                  <div className="method-icon">🅿️</div>
                  <div className="method-info">
                    <h4>PayPal</h4>
                    <p>Pago con tu cuenta PayPal</p>
                  </div>
                </label>
              </div>
            </div>
            {errors.paymentMethod && <span className="error-message">{errors.paymentMethod}</span>}
          </div>

          {/* Formularios específicos por método de pago */}
          {paymentMethod === 'card' && (
            <div className="payment-details">
              <h3>Información de la Tarjeta</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cardNumber">Número de Tarjeta</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className={errors.cardNumber ? 'error' : ''}
                    maxLength="19"
                  />
                  {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="cardholderName">Nombre del Titular</label>
                  <input
                    type="text"
                    id="cardholderName"
                    name="cardholderName"
                    value={paymentData.cardholderName}
                    onChange={handleInputChange}
                    placeholder="Juan Pérez"
                    className={errors.cardholderName ? 'error' : ''}
                  />
                  {errors.cardholderName && <span className="error-message">{errors.cardholderName}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Fecha de Vencimiento</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/AA"
                    className={errors.expiryDate ? 'error' : ''}
                    maxLength="5"
                  />
                  {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className={errors.cvv ? 'error' : ''}
                    maxLength="4"
                  />
                  {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'webpay' && (
            <div className="payment-details">
              <h3>WebPay Plus</h3>
              <div className="webpay-info">
                <p>Serás redirigido a WebPay Plus para completar tu pago de forma segura.</p>
                <div className="security-badges">
                  <span className="badge">🔒 SSL Seguro</span>
                  <span className="badge">🛡️ Protegido</span>
                  <span className="badge">✅ Verificado</span>
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'transfer' && (
            <div className="payment-details">
              <h3>Información Bancaria</h3>
              <div className="bank-info">
                <div className="bank-details">
                  <h4>Datos para Transferencia:</h4>
                  <p><strong>Banco:</strong> Banco de Chile</p>
                  <p><strong>Cuenta Corriente:</strong> 12345678901</p>
                  <p><strong>RUT:</strong> 12.345.678-9</p>
                  <p><strong>Beneficiario:</strong> LevelUp Store</p>
                </div>
                <div className="form-group">
                  <label htmlFor="bankAccount">Número de Cuenta (para referencia)</label>
                  <input
                    type="text"
                    id="bankAccount"
                    name="bankAccount"
                    value={paymentData.bankAccount}
                    onChange={handleInputChange}
                    placeholder="1234567890"
                    className={errors.bankAccount ? 'error' : ''}
                  />
                  {errors.bankAccount && <span className="error-message">{errors.bankAccount}</span>}
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'paypal' && (
            <div className="payment-details">
              <h3>PayPal</h3>
              <div className="form-group">
                <label htmlFor="paypalEmail">Email de PayPal</label>
                <input
                  type="email"
                  id="paypalEmail"
                  name="paypalEmail"
                  value={paymentData.paypalEmail}
                  onChange={handleInputChange}
                  placeholder="usuario@paypal.com"
                  className={errors.paypalEmail ? 'error' : ''}
                />
                {errors.paypalEmail && <span className="error-message">{errors.paypalEmail}</span>}
              </div>
              <div className="paypal-info">
                <p>Serás redirigido a PayPal para completar tu pago.</p>
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="payment-actions">
            <button 
              type="button" 
              onClick={() => navigate('/checkout')} 
              className="btn-secondary"
            >
              Volver al Checkout
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isProcessing || !paymentMethod}
            >
              {isProcessing ? 'Procesando Pago...' : `Pagar $${total.toLocaleString('es-CL')}`}
            </button>
          </div>
        </form>

        {/* Ventana Modal de Pago */}
        {showPaymentModal && (
          <div className="payment-modal-overlay">
            <div className="payment-modal">
              <div className="modal-header">
                <h3>Procesando Pago</h3>
                <button 
                  className="close-btn" 
                  onClick={handleCloseModal}
                  disabled={isProcessing}
                >
                  ✕
                </button>
              </div>
              
              <div className="modal-content">
                {paymentStep === 1 && (
                  <div className="payment-step">
                    <div className="step-icon">💳</div>
                    <h4>Confirmar Pago</h4>
                    <p>Método: {paymentMethod === 'card' ? 'Tarjeta de Crédito/Débito' : 
                              paymentMethod === 'webpay' ? 'WebPay Plus' :
                              paymentMethod === 'transfer' ? 'Transferencia Bancaria' : 'PayPal'}</p>
                    <p>Monto: <strong>${total.toLocaleString('es-CL')}</strong></p>
                    <div className="modal-actions">
                      <button 
                        className="btn-secondary" 
                        onClick={handleCloseModal}
                      >
                        Cancelar
                      </button>
                      <button 
                        className="btn-primary" 
                        onClick={handlePaymentProcess}
                      >
                        Confirmar Pago
                      </button>
                    </div>
                  </div>
                )}

                {paymentStep === 2 && (
                  <div className="payment-step">
                    <div className="step-icon processing">⏳</div>
                    <h4>Procesando Pago...</h4>
                    <p>Por favor espera mientras procesamos tu pago</p>
                    <div className="loading-spinner">
                      <div className="spinner"></div>
                    </div>
                    <p className="processing-text">Validando información de pago...</p>
                  </div>
                )}

                {paymentStep === 3 && (
                  <div className="payment-step">
                    <div className="step-icon success">✅</div>
                    <h4>¡Pago Exitoso!</h4>
                    <p>Tu pago ha sido procesado correctamente</p>
                    <p>Redirigiendo a la página de confirmación...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
