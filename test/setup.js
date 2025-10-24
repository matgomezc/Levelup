// Setup básico para tests
import '@testing-library/jest-dom';

// Mock de localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

global.localStorage = localStorageMock;

// Limpiar mocks después de cada test
afterEach(() => {
  jest.clearAllMocks();
  localStorageMock.clear();
});