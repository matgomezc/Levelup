// Test de localStorage
describe('localStorage', () => {
  
  beforeEach(() => {
    localStorage.clear();
  });

  test('debería guardar datos en localStorage', () => {
    const saveData = (key, data) => {
      localStorage.setItem(key, JSON.stringify(data));
    };
    
    const testData = { name: 'Test User', email: 'test@email.com' };
    saveData('user', testData);
    
    expect(localStorage.getItem('user')).toBe(JSON.stringify(testData));
  });

  test('debería recuperar datos de localStorage', () => {
    const getData = (key) => {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    };
    
    const testData = { name: 'Test User' };
    localStorage.setItem('user', JSON.stringify(testData));
    
    const retrievedData = getData('user');
    expect(retrievedData).toEqual(testData);
  });

  test('debería eliminar datos de localStorage', () => {
    const removeData = (key) => {
      localStorage.removeItem(key);
    };
    
    localStorage.setItem('temp', 'data');
    expect(localStorage.getItem('temp')).toBe('data');
    
    removeData('temp');
    expect(localStorage.getItem('temp')).toBeNull();
  });

  test('debería limpiar localStorage', () => {
    localStorage.setItem('key1', 'data1');
    localStorage.setItem('key2', 'data2');
    
    expect(localStorage.length).toBe(2);
    
    localStorage.clear();
    expect(localStorage.length).toBe(0);
  });

  test('debería manejar datos del carrito', () => {
    const cartItems = [
      { id: 1, name: 'PS5', price: 500000, quantity: 1 },
      { id: 2, name: 'Control', price: 50000, quantity: 2 }
    ];
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    const savedCart = JSON.parse(localStorage.getItem('cartItems'));
    expect(savedCart).toEqual(cartItems);
    expect(savedCart.length).toBe(2);
  });
});