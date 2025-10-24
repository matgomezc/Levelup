import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [specialMessage, setSpecialMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Special message for institutional email
    if (name === 'email' && value.includes('duocuc')) {
      setSpecialMessage('Tienes 20% de descuento por usar tu correo institucional!');
    } else {
      setSpecialMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.firstName.length < 3) {
      newErrors.firstName = 'Error, ingrese al menos 3 caracteres!';
    }
    
    if (formData.lastName.length < 3) {
      newErrors.lastName = 'Error, ingrese al menos 3 caracteres en apellidos!';
    }
    
    if (parseInt(formData.age) < 18) {
      newErrors.age = 'La edad tiene que ser mayor de 18 años.';
    }
    
    if (!formData.email.includes('@')) {
      newErrors.email = 'Error, ingrese un signo arroba (@)!';
    }
    
    if (formData.password.length < 6) {
      newErrors.password = 'Error, La contraseña debe tener al menos 6 caracteres!';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Error, Las contraseñas no coinciden!';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // If validation passes, redirect to login
    navigate('/login');
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <h1>Registrar nueva cuenta</h1>
          
          <div className="form-group">
            <label htmlFor="firstName">Nombres</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? 'error' : ''}
            />
            {errors.firstName && <div className="error-message">{errors.firstName}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">Apellidos</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? 'error' : ''}
            />
            {errors.lastName && <div className="error-message">{errors.lastName}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="age">Edad</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={errors.age ? 'error' : ''}
            />
            {errors.age && <div className="error-message">{errors.age}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
            {specialMessage && <div className="error-message" style={{color: '#39FF14'}}>{specialMessage}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>
          
          <button type="submit" className="submit-btn">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
