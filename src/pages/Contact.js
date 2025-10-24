import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'El email debe contener @';
    }
    if (!formData.asunto.trim()) {
      newErrors.asunto = 'El asunto es requerido';
    }
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simular envío del formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="contact-container">
        <div className="contact-success">
          <div className="success-icon">✅</div>
          <h2>¡Mensaje Enviado Exitosamente!</h2>
          <p>Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos pronto.</p>
          <button 
            className="submit-btn"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                nombre: '',
                email: '',
                telefono: '',
                asunto: '',
                mensaje: ''
              });
            }}
          >
            Enviar Otro Mensaje
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <h1>Contacto</h1>
        <p>¿Tienes alguna pregunta? ¡Estamos aquí para ayudarte!</p>
      </div>

      <div className="contact-content">
        {/* Información de contacto */}
        <section className="contact-info-section">
          <h2>Información de Contacto</h2>
          <div className="contact-info-grid">
            <div className="contact-info-item">
              <div className="contact-icon">📧</div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>levelup@gmail.com</p>
                <p>soporte@levelup.cl</p>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-icon">📞</div>
              <div className="contact-details">
                <h3>Teléfono</h3>
                <p>+56953524831</p>
                <p>+56 2 2345 6789</p>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-icon">📍</div>
              <div className="contact-details">
                <h3>Dirección</h3>
                <p>Av. Providencia 1234</p>
                <p>Santiago, Chile</p>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-icon">🕒</div>
              <div className="contact-details">
                <h3>Horarios</h3>
                <p>Lunes a Viernes: 9:00 - 18:00</p>
                <p>Sábados: 10:00 - 14:00</p>
              </div>
            </div>
          </div>
        </section>

        {/* Formulario de contacto */}
        <section className="contact-form-section">
          <h2>Envíanos un Mensaje</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={errors.nombre ? 'error' : ''}
                  placeholder="Tu nombre completo"
                />
                {errors.nombre && <span className="error-message">{errors.nombre}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="tu@email.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+56 9 1234 5678"
                />
              </div>
              <div className="form-group">
                <label htmlFor="asunto">Asunto *</label>
                <select
                  id="asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  className={errors.asunto ? 'error' : ''}
                >
                  <option value="">Seleccionar asunto</option>
                  <option value="consulta-producto">Consulta sobre producto</option>
                  <option value="soporte-tecnico">Soporte técnico</option>
                  <option value="pedido">Consulta sobre pedido</option>
                  <option value="devolucion">Devolución o cambio</option>
                  <option value="sugerencia">Sugerencia</option>
                  <option value="otro">Otro</option>
                </select>
                {errors.asunto && <span className="error-message">{errors.asunto}</span>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje *</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                className={errors.mensaje ? 'error' : ''}
                rows="6"
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
              {errors.mensaje && <span className="error-message">{errors.mensaje}</span>}
            </div>
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        </section>

        {/* Preguntas frecuentes */}
        <section className="faq-section">
          <h2>Preguntas Frecuentes</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>¿Cuánto tiempo tarda el envío?</h3>
              <p>Los envíos dentro de Santiago tardan 1-2 días hábiles. Para regiones, el tiempo es de 3-5 días hábiles.</p>
            </div>
            <div className="faq-item">
              <h3>¿Ofrecen garantía en sus productos?</h3>
              <p>Sí, todos nuestros productos cuentan con garantía del fabricante. Los tiempos varían según el producto.</p>
            </div>
            <div className="faq-item">
              <h3>¿Puedo cambiar o devolver un producto?</h3>
              <p>Ofrecemos 30 días para cambios y devoluciones, siempre que el producto esté en perfecto estado.</p>
            </div>
            <div className="faq-item">
              <h3>¿Tienen tienda física?</h3>
              <p>Actualmente somos una tienda online, pero estamos trabajando en abrir una tienda física en Santiago.</p>
            </div>
          </div>
        </section>

        {/* Redes sociales */}
        <section className="social-contact-section">
          <h2>Síguenos en Redes Sociales</h2>
          <div className="social-links">
            <a href="#" className="social-link facebook">
              <span className="social-icon">📘</span>
              <span>Facebook</span>
            </a>
            <a href="#" className="social-link twitter">
              <span className="social-icon">🐦</span>
              <span>Twitter</span>
            </a>
            <a href="#" className="social-link instagram">
              <span className="social-icon">📷</span>
              <span>Instagram</span>
            </a>
            <a href="#" className="social-link youtube">
              <span className="social-icon">📺</span>
              <span>YouTube</span>
            </a>
            <a href="#" className="social-link discord">
              <span className="social-icon">🎮</span>
              <span>Discord</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
