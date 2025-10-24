// Test de validación de formularios
describe('Validación de formularios', () => {
  
  test('debería validar email correctamente', () => {
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    
    expect(isValidEmail('usuario@email.com')).toBe(true);
    expect(isValidEmail('usuario@')).toBe(false);
    expect(isValidEmail('@email.com')).toBe(false);
  });

  test('debería validar campos requeridos', () => {
    const isRequired = (value) => {
      return value && value.trim().length > 0;
    };
    
    expect(isRequired('texto válido')).toBe(true);
    expect(isRequired('')).toBe(false);
    expect(isRequired('   ')).toBe(false);
  });

  test('debería validar contraseñas', () => {
    const isValidPassword = (password) => {
      return password && password.length >= 6;
    };
    
    expect(isValidPassword('password123')).toBe(true);
    expect(isValidPassword('123456')).toBe(true);
    expect(isValidPassword('12345')).toBe(false);
  });

  test('debería validar números de teléfono', () => {
    const isValidPhone = (phone) => {
      return /^(\+56|56)?[2-9]\d{8}$/.test(phone.replace(/\s/g, ''));
    };
    
    expect(isValidPhone('912345678')).toBe(true);
    expect(isValidPhone('+56912345678')).toBe(true);
    expect(isValidPhone('12345678')).toBe(false);
  });

  test('debería validar formulario completo', () => {
    const validateForm = (formData) => {
      const errors = {};
      
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Email inválido';
      }
      
      if (!formData.password || formData.password.length < 6) {
        errors.password = 'Contraseña muy corta';
      }
      
      return Object.keys(errors).length === 0;
    };
    
    const validData = {
      email: 'test@email.com',
      password: 'password123'
    };
    
    const invalidData = {
      email: 'email-invalido',
      password: '123'
    };
    
    expect(validateForm(validData)).toBe(true);
    expect(validateForm(invalidData)).toBe(false);
  });
});