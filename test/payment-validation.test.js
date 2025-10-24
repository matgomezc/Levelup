// Test de validación de pagos
describe('Validación de pagos', () => {
  
  test('debería validar número de tarjeta', () => {
    const validateCardNumber = (cardNumber) => {
      const cleanNumber = cardNumber.replace(/\s/g, '');
      return /^\d{13,19}$/.test(cleanNumber);
    };
    
    expect(validateCardNumber('4532015112830366')).toBe(true);
    expect(validateCardNumber('1234567890123456')).toBe(true);
    expect(validateCardNumber('1234')).toBe(false);
    expect(validateCardNumber('abcd123456789012')).toBe(false);
  });

  test('debería validar CVV', () => {
    const validateCVV = (cvv) => {
      return /^\d{3,4}$/.test(cvv);
    };
    
    expect(validateCVV('123')).toBe(true);
    expect(validateCVV('1234')).toBe(true);
    expect(validateCVV('12')).toBe(false);
    expect(validateCVV('abc')).toBe(false);
  });

  test('debería validar fecha de vencimiento', () => {
    const validateExpiryDate = (expiryDate) => {
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) return false;
      
      const [month, year] = expiryDate.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      const expiryYear = parseInt(year);
      const expiryMonth = parseInt(month);
      
      return expiryYear > currentYear || (expiryYear === currentYear && expiryMonth >= currentMonth);
    };
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const validDate = `12/${currentYear + 1}`;
    
    expect(validateExpiryDate(validDate)).toBe(true);
    expect(validateExpiryDate('13/25')).toBe(false);
    expect(validateExpiryDate('00/25')).toBe(false);
  });

  test('debería validar nombre del titular', () => {
    const validateCardholderName = (name) => {
      return name && name.trim().length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name);
    };
    
    expect(validateCardholderName('Juan Pérez')).toBe(true);
    expect(validateCardholderName('María José')).toBe(true);
    expect(validateCardholderName('')).toBe(false);
    expect(validateCardholderName('J')).toBe(false);
    expect(validateCardholderName('Juan123')).toBe(false);
  });

  test('debería validar email', () => {
    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    
    expect(validateEmail('usuario@email.com')).toBe(true);
    expect(validateEmail('test.user@domain.co.uk')).toBe(true);
    expect(validateEmail('usuario@')).toBe(false);
    expect(validateEmail('@email.com')).toBe(false);
  });

  test('debería validar datos completos de pago', () => {
    const validatePaymentData = (paymentData) => {
      const errors = {};
      
      if (!paymentData.cardNumber || !/^\d{13,19}$/.test(paymentData.cardNumber.replace(/\s/g, ''))) {
        errors.cardNumber = 'Número de tarjeta inválido';
      }
      
      if (!paymentData.cvv || !/^\d{3,4}$/.test(paymentData.cvv)) {
        errors.cvv = 'CVV inválido';
      }
      
      if (!paymentData.cardholderName || paymentData.cardholderName.trim().length < 2) {
        errors.cardholderName = 'Nombre del titular requerido';
      }
      
      if (!paymentData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paymentData.email)) {
        errors.email = 'Email inválido';
      }
      
      return Object.keys(errors).length === 0;
    };
    
    const validData = {
      cardNumber: '4532015112830366',
      cvv: '123',
      cardholderName: 'Juan Pérez',
      email: 'juan@email.com'
    };
    
    const invalidData = {
      cardNumber: '123',
      cvv: '12',
      cardholderName: '',
      email: 'email-invalido'
    };
    
    expect(validatePaymentData(validData)).toBe(true);
    expect(validatePaymentData(invalidData)).toBe(false);
  });
});