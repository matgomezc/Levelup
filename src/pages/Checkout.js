import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    // Información del cliente
    nombre: '',
    apellidos: '',
    correo: '',
    
    // Dirección de entrega
    calle: '',
    departamento: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Cerrillos',
    indicaciones: ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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

  const validateForm = () => {
    const newErrors = {};
    
    // Validar información del cliente
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    if (!formData.apellidos.trim()) {
      newErrors.apellidos = 'Los apellidos son requeridos';
    }
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es requerido';
    } else if (!formData.correo.includes('@')) {
      newErrors.correo = 'El correo debe contener @';
    }
    
    // Validar dirección
    if (!formData.calle.trim()) {
      newErrors.calle = 'La calle es requerida';
    }
    if (!formData.region) {
      newErrors.region = 'La región es requerida';
    }
    if (!formData.comuna) {
      newErrors.comuna = 'La comuna es requerida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Guardar información del cliente y dirección
    const customerData = {
      customerInfo: {
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        correo: formData.correo
      },
      deliveryAddress: {
        calle: formData.calle,
        departamento: formData.departamento,
        region: formData.region,
        comuna: formData.comuna,
        indicaciones: formData.indicaciones
      }
    };
    
    // Guardar información temporal
    localStorage.setItem('customerData', JSON.stringify(customerData));
    
    // Guardar datos del carrito antes de vaciarlo
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Limpiar carrito
    clearCart();
    
    // Redirigir directamente a página de pago con tarjeta
    navigate('/card-payment');
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <h2 style={{ color: '#ffffff', textAlign: 'center', marginTop: '2rem' }}>
          No hay productos en tu carrito
        </h2>
        <button 
          className="submit-btn" 
          onClick={() => navigate('/')}
          style={{ marginTop: '1rem' }}
        >
          Continuar Comprando
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <h2>Completa la siguiente información</h2>
        
        <form onSubmit={handleSubmit} className="checkout-form">
          {/* Información del cliente */}
          <div className="form-section">
            <h3>Información Personal</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={errors.nombre ? 'error' : ''}
                  placeholder="pedro"
                />
                {errors.nombre && <span className="error-message">{errors.nombre}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="apellidos">Apellidos</label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  className={errors.apellidos ? 'error' : ''}
                  placeholder="hacker"
                />
                {errors.apellidos && <span className="error-message">{errors.apellidos}</span>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="correo">Correo</label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className={errors.correo ? 'error' : ''}
                placeholder="pedro.hacer20@example.com"
              />
              {errors.correo && <span className="error-message">{errors.correo}</span>}
            </div>
          </div>

          {/* Dirección de entrega */}
          <div className="form-section">
            <h3>Dirección de entrega de los productos</h3>
            <div className="form-group">
              <label htmlFor="calle">Calle</label>
              <input
                type="text"
                id="calle"
                name="calle"
                value={formData.calle}
                onChange={handleChange}
                placeholder="Los crisantemos, Edificio Norte"
                className={errors.calle ? 'error' : ''}
              />
              {errors.calle && <span className="error-message">{errors.calle}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="departamento">Departamento (opcional)</label>
              <input
                type="text"
                id="departamento"
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                placeholder="Depto 603"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="region">Región</label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className={errors.region ? 'error' : ''}
                >
                  <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
                  <option value="Región de Valparaíso">Región de Valparaíso</option>
                  <option value="Región del Biobío">Región del Biobío</option>
                  <option value="Región de La Araucanía">Región de La Araucanía</option>
                </select>
                {errors.region && <span className="error-message">{errors.region}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="comuna">Comuna</label>
                <select
                  id="comuna"
                  name="comuna"
                  value={formData.comuna}
                  onChange={handleChange}
                  className={errors.comuna ? 'error' : ''}
                >
                  <option value="Cerrillos">Cerrillos</option>
                  <option value="Cerro Navia">Cerro Navia</option>
                  <option value="Conchalí">Conchalí</option>
                  <option value="El Bosque">El Bosque</option>
                  <option value="Estación Central">Estación Central</option>
                  <option value="Huechuraba">Huechuraba</option>
                  <option value="Independencia">Independencia</option>
                  <option value="La Cisterna">La Cisterna</option>
                  <option value="La Florida">La Florida</option>
                  <option value="La Granja">La Granja</option>
                  <option value="La Pintana">La Pintana</option>
                  <option value="La Reina">La Reina</option>
                  <option value="Las Condes">Las Condes</option>
                  <option value="Lo Barnechea">Lo Barnechea</option>
                  <option value="Lo Espejo">Lo Espejo</option>
                  <option value="Lo Prado">Lo Prado</option>
                  <option value="Macul">Macul</option>
                  <option value="Maipú">Maipú</option>
                  <option value="Ñuñoa">Ñuñoa</option>
                  <option value="Pedro Aguirre Cerda">Pedro Aguirre Cerda</option>
                  <option value="Peñalolén">Peñalolén</option>
                  <option value="Providencia">Providencia</option>
                  <option value="Pudahuel">Pudahuel</option>
                  <option value="Quilicura">Quilicura</option>
                  <option value="Quinta Normal">Quinta Normal</option>
                  <option value="Recoleta">Recoleta</option>
                  <option value="Renca">Renca</option>
                  <option value="San Joaquín">San Joaquín</option>
                  <option value="San Miguel">San Miguel</option>
                  <option value="San Ramón">San Ramón</option>
                  <option value="Santiago">Santiago</option>
                  <option value="Vitacura">Vitacura</option>
                </select>
                {errors.comuna && <span className="error-message">{errors.comuna}</span>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="indicaciones">Indicaciones para la entrega (opcional)</label>
              <textarea
                id="indicaciones"
                name="indicaciones"
                value={formData.indicaciones}
                onChange={handleChange}
                placeholder="El martes no estaremos en el depto, pero puede dejarselo con el conserje."
                rows="3"
              />
            </div>
          </div>

          {/* Resumen del carrito */}
          <div className="form-section">
            <h3>Resumen de Compra</h3>
            <div className="checkout-summary">
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="checkout-item">
                    <div className="checkout-item-image">
                      <div className="placeholder-image">📦</div>
                    </div>
                    <div className="checkout-item-info">
                      <h4>{item.name}</h4>
                      <p>${item.price.toLocaleString('es-CL')} x {item.quantity}</p>
                    </div>
                    <div className="checkout-item-total">
                      ${(item.price * item.quantity).toLocaleString('es-CL')}
                    </div>
                  </div>
                ))}
              </div>
              <div className="checkout-total">
                <h3>Total a pagar: ${getTotalPrice().toLocaleString('es-CL')}</h3>
              </div>
            </div>
          </div>

          {/* Botón de pago */}
          <div className="checkout-actions">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isProcessing}
              style={{ 
                fontSize: '1.2rem', 
                padding: '1rem 2rem',
                backgroundColor: isProcessing ? '#666' : '#4CAF50'
              }}
            >
              {isProcessing ? 'Procesando...' : `Continuar al Pago - $${getTotalPrice().toLocaleString('es-CL')}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
