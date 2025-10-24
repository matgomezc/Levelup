import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    categorias: [],
    pago: ''
  });
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = JSON.parse(localStorage.getItem('perfilUsuario'));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'select-multiple') {
      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
      setFormData(prev => ({
        ...prev,
        [name]: selectedOptions
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save data to localStorage
    localStorage.setItem('perfilUsuario', JSON.stringify(formData));
    
    // Show success message
    setShowMessage(true);
    
    // Hide message after 3 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div className="profile-container">
      <div className="profile-form">
        <form id="formPerfil" onSubmit={handleSubmit}>
          <h2 style={{ color: '#ffffff', marginBottom: '1rem' }}>Perfil de Usuario</h2>
          
          {showMessage && (
            <div className="success-message">
              ¡Perfil actualizado correctamente!
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="direccion">Dirección</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="categorias">Categorías de Interés</label>
            <select
              id="categorias"
              name="categorias"
              multiple
              value={formData.categorias}
              onChange={handleChange}
              style={{ height: '100px' }}
            >
              <option value="consolas">Consolas</option>
              <option value="accesorios">Accesorios</option>
              <option value="pc-gamers">PC Gamers</option>
              <option value="sillas">Sillas</option>
              <option value="mouses">Mouses</option>
              <option value="mousepads">Mousepads</option>
              <option value="poleras">Poleras</option>
              <option value="polerones">Polerones</option>
              <option value="juegos-mesa">Juegos de Mesa</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="pago">Método de Pago Preferido</label>
            <select
              id="pago"
              name="pago"
              value={formData.pago}
              onChange={handleChange}
            >
              <option value="">Seleccionar método</option>
              <option value="tarjeta-credito">Tarjeta de Crédito</option>
              <option value="tarjeta-debito">Tarjeta de Débito</option>
              <option value="transferencia">Transferencia Bancaria</option>
              <option value="efectivo">Efectivo</option>
            </select>
          </div>
          
          <button type="submit" className="submit-btn">Guardar Perfil</button>
        </form>
      </div>
      
      <div className="profile-view">
        <h3>Vista Previa del Perfil</h3>
        <p><strong>Nombre:</strong> {formData.nombre || '-'}</p>
        <p><strong>Email:</strong> {formData.email || '-'}</p>
        <p><strong>Teléfono:</strong> {formData.telefono || '-'}</p>
        <p><strong>Dirección:</strong> {formData.direccion || '-'}</p>
        <p><strong>Categorías:</strong> {formData.categorias.join(', ') || '-'}</p>
        <p><strong>Método de Pago:</strong> {formData.pago || '-'}</p>
      </div>
    </div>
  );
};

export default Profile;
