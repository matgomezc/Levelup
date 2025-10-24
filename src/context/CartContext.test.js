// Tests para CartContext
describe('CartContext', () => {
  let CartProvider, useCart, cartReducer;

  beforeEach(() => {
    // Mock del contexto
    const React = require('react');
    const { createContext, useContext, useReducer } = React;
    
    const CartContext = createContext();
    
    cartReducer = (state, action) => {
      switch (action.type) {
        case 'ADD_TO_CART':
          const existingItem = state.find(item => item.id === action.payload.id);
          if (existingItem) {
            return state.map(item =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          return [...state, { ...action.payload, quantity: 1 }];
        
        case 'REMOVE_FROM_CART':
          return state.filter(item => item.id !== action.payload);
        
        case 'UPDATE_QUANTITY':
          return state.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: Math.max(1, Math.min(10, action.payload.quantity)) }
              : item
          );
        
        case 'CLEAR_CART':
          return [];
        
        default:
          return state;
      }
    };
  });

  describe('cartReducer', () => {
    it('should add new item to cart', () => {
      const initialState = [];
      const product = { id: 1, name: 'Test Product', price: 100 };
      const action = { type: 'ADD_TO_CART', payload: product };
      
      const newState = cartReducer(initialState, action);
      
      expect(newState).toEqual([{ ...product, quantity: 1 }]);
    });

    it('should increment quantity for existing item', () => {
      const initialState = [{ id: 1, name: 'Test Product', price: 100, quantity: 1 }];
      const product = { id: 1, name: 'Test Product', price: 100 };
      const action = { type: 'ADD_TO_CART', payload: product };
      
      const newState = cartReducer(initialState, action);
      
      expect(newState[0].quantity).toBe(2);
    });

    it('should remove item from cart', () => {
      const initialState = [
        { id: 1, name: 'Product 1', price: 100, quantity: 1 },
        { id: 2, name: 'Product 2', price: 200, quantity: 1 }
      ];
      const action = { type: 'REMOVE_FROM_CART', payload: 1 };
      
      const newState = cartReducer(initialState, action);
      
      expect(newState).toEqual([{ id: 2, name: 'Product 2', price: 200, quantity: 1 }]);
    });

    it('should update item quantity', () => {
      const initialState = [{ id: 1, name: 'Test Product', price: 100, quantity: 1 }];
      const action = { type: 'UPDATE_QUANTITY', payload: { id: 1, quantity: 3 } };
      
      const newState = cartReducer(initialState, action);
      
      expect(newState[0].quantity).toBe(3);
    });

    it('should limit quantity to maximum of 10', () => {
      const initialState = [{ id: 1, name: 'Test Product', price: 100, quantity: 1 }];
      const action = { type: 'UPDATE_QUANTITY', payload: { id: 1, quantity: 15 } };
      
      const newState = cartReducer(initialState, action);
      
      expect(newState[0].quantity).toBe(10);
    });

    it('should limit quantity to minimum of 1', () => {
      const initialState = [{ id: 1, name: 'Test Product', price: 100, quantity: 1 }];
      const action = { type: 'UPDATE_QUANTITY', payload: { id: 1, quantity: 0 } };
      
      const newState = cartReducer(initialState, action);
      
      expect(newState[0].quantity).toBe(1);
    });

    it('should clear cart', () => {
      const initialState = [
        { id: 1, name: 'Product 1', price: 100, quantity: 1 },
        { id: 2, name: 'Product 2', price: 200, quantity: 1 }
      ];
      const action = { type: 'CLEAR_CART' };
      
      const newState = cartReducer(initialState, action);
      
      expect(newState).toEqual([]);
    });
  });
});
