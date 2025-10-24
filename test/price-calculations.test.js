// Test de cálculos de precios
describe('Cálculos de precios', () => {
  
  test('debería calcular total del carrito', () => {
    const calculateTotal = (items) => {
      return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };
    
    const items = [
      { price: 10000, quantity: 2 },
      { price: 15000, quantity: 1 }
    ];
    
    expect(calculateTotal(items)).toBe(35000);
  });

  test('debería calcular descuento porcentual', () => {
    const calculateDiscount = (originalPrice, discountedPrice) => {
      return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
    };
    
    expect(calculateDiscount(100000, 80000)).toBe(20);
    expect(calculateDiscount(50000, 40000)).toBe(20);
  });

  test('debería calcular IVA', () => {
    const calculateIVA = (price) => {
      return Math.round(price * 0.19);
    };
    
    expect(calculateIVA(100000)).toBe(19000);
    expect(calculateIVA(50000)).toBe(9500);
  });

  test('debería calcular precio con IVA', () => {
    const calculatePriceWithIVA = (price) => {
      return price + Math.round(price * 0.19);
    };
    
    expect(calculatePriceWithIVA(100000)).toBe(119000);
    expect(calculatePriceWithIVA(50000)).toBe(59500);
  });

  test('debería formatear precios', () => {
    const formatPrice = (price) => {
      return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
      }).format(price);
    };
    
    expect(formatPrice(100000)).toBe('$100.000');
    expect(formatPrice(1500000)).toBe('$1.500.000');
  });
});