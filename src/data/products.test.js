// Tests para el servicio de productos
describe('ProductService', () => {
  let productService;

  beforeEach(() => {
    // Importar el servicio de productos
    productService = require('./products').productService;
  });

  describe('getAllProducts', () => {
    it('should return all products', () => {
      const products = productService.getAllProducts();
      
      expect(products).toBeDefined();
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });
  });

  describe('getProductById', () => {
    it('should return product by id', () => {
      const product = productService.getProductById(1);
      
      expect(product).toBeDefined();
      expect(product.id).toBe(1);
      expect(product.name).toBeDefined();
    });

    it('should return undefined for non-existent id', () => {
      const product = productService.getProductById(999);
      
      expect(product).toBeUndefined();
    });
  });

  describe('getProductsByCategory', () => {
    it('should return products by category', () => {
      const products = productService.getProductsByCategory('Consolas');
      
      expect(products).toBeDefined();
      expect(Array.isArray(products)).toBe(true);
      products.forEach(product => {
        expect(product.category).toBe('Consolas');
        expect(product.isActive).toBe(true);
      });
    });

    it('should return empty array for non-existent category', () => {
      const products = productService.getProductsByCategory('NonExistent');
      
      expect(products).toEqual([]);
    });
  });

  describe('searchProducts', () => {
    it('should search products by name', () => {
      const products = productService.searchProducts('PS5');
      
      expect(products).toBeDefined();
      expect(Array.isArray(products)).toBe(true);
      products.forEach(product => {
        expect(product.name.toLowerCase()).toContain('ps5');
      });
    });

    it('should search products by description', () => {
      const products = productService.searchProducts('gaming');
      
      expect(products).toBeDefined();
      expect(Array.isArray(products)).toBe(true);
    });

    it('should return empty array for no matches', () => {
      const products = productService.searchProducts('nonexistent');
      
      expect(products).toEqual([]);
    });
  });

  describe('getProductsOnSale', () => {
    it('should return products with original price higher than current price', () => {
      const products = productService.getProductsOnSale();
      
      expect(products).toBeDefined();
      expect(Array.isArray(products)).toBe(true);
      products.forEach(product => {
        expect(product.originalPrice).toBeDefined();
        expect(product.originalPrice).toBeGreaterThan(product.price);
      });
    });
  });

  describe('getCriticalStockProducts', () => {
    it('should return products with stock <= 5', () => {
      const products = productService.getCriticalStockProducts();
      
      expect(products).toBeDefined();
      expect(Array.isArray(products)).toBe(true);
      products.forEach(product => {
        expect(product.stock).toBeLessThanOrEqual(5);
      });
    });
  });

  describe('createProduct', () => {
    it('should create new product', () => {
      const newProduct = {
        name: 'Test Product',
        price: 100,
        category: 'Test',
        stock: 10
      };
      
      const createdProduct = productService.createProduct(newProduct);
      
      expect(createdProduct).toBeDefined();
      expect(createdProduct.id).toBeDefined();
      expect(createdProduct.name).toBe(newProduct.name);
      expect(createdProduct.isActive).toBe(true);
      expect(createdProduct.createdAt).toBeDefined();
    });
  });

  describe('updateProduct', () => {
    it('should update existing product', () => {
      const updateData = { name: 'Updated Product', price: 150 };
      const updatedProduct = productService.updateProduct(1, updateData);
      
      expect(updatedProduct).toBeDefined();
      expect(updatedProduct.name).toBe(updateData.name);
      expect(updatedProduct.price).toBe(updateData.price);
      expect(updatedProduct.updatedAt).toBeDefined();
    });

    it('should return null for non-existent product', () => {
      const updateData = { name: 'Updated Product' };
      const updatedProduct = productService.updateProduct(999, updateData);
      
      expect(updatedProduct).toBeNull();
    });
  });

  describe('deleteProduct', () => {
    it('should soft delete product', () => {
      const result = productService.deleteProduct(1);
      
      expect(result).toBe(true);
      
      const product = productService.getProductById(1);
      expect(product.isActive).toBe(false);
    });

    it('should return false for non-existent product', () => {
      const result = productService.deleteProduct(999);
      
      expect(result).toBe(false);
    });
  });

  describe('updateStock', () => {
    it('should update product stock', () => {
      const newStock = 20;
      const updatedProduct = productService.updateStock(1, newStock);
      
      expect(updatedProduct).toBeDefined();
      expect(updatedProduct.stock).toBe(newStock);
      expect(updatedProduct.updatedAt).toBeDefined();
    });

    it('should return null for non-existent product', () => {
      const updatedProduct = productService.updateStock(999, 10);
      
      expect(updatedProduct).toBeNull();
    });
  });
});
