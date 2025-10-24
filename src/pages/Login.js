import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
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
  };

  const validateEmail = (email) => {
    return email.includes('@');
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Error, ingrese un signo arroba (@)!';
    }
    
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Error, la contraseña debe tener al menos 6 caracteres!';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // If validation passes, redirect to home
    navigate('/');
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <h1>Ingresa una cuenta existente</h1>
          <p>No tienes una cuenta? <Link to="/register">Registrar</Link></p>
          
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="juanito@gmail.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Clave123456"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          
          <button type="submit" className="submit-btn">Ingresar</button>
        </form>
      </div>
      <img src="/assets/image.png" alt="Login illustration" />
    </div>
  );
};

export default Login;
