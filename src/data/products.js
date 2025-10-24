// Archivo de datos centralizado para productos
// Simula una base de datos con operaciones CRUD

let products = [
  // CONSOLAS
  {
    id: 1,
    name: 'PS5 Pro 1TB',
    image: '/assets/ps5.webp',
    price: 959990,
    originalPrice: null,
    description: 'PlayStation 5 Pro con 1TB de almacenamiento. La consola más potente de Sony con gráficos 4K y ray tracing.',
    features: ['Gráficos 4K', 'Ray Tracing', 'SSD Ultra Rápido', 'Compatibilidad con PS4'],
    category: 'Consolas',
    stock: 15,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 2,
    name: 'PS5 Digital 1TB',
    image: '/assets/PS5-dig.webp',
    price: 549990,
    originalPrice: 684990,
    description: 'PlayStation 5 Digital Edition. Sin lector de discos, perfecta para juegos digitales.',
    features: ['Solo Digital', 'SSD Ultra Rápido', 'Gráficos 4K', 'Compatibilidad con PS4'],
    category: 'Consolas',
    stock: 8,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 3,
    name: 'Xbox Series X 1TB',
    image: '/assets/xbox.webp',
    price: 406990,
    originalPrice: null,
    description: 'Xbox Series X con 1TB de almacenamiento. La consola más potente de Microsoft.',
    features: ['4K Gaming', '120 FPS', 'Quick Resume', 'Game Pass'],
    category: 'Consolas',
    stock: 12,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 4,
    name: 'Nintendo Switch',
    image: '/assets/nintendo.webp',
    price: 329990,
    originalPrice: null,
    description: 'Nintendo Switch - Consola híbrida que puedes usar en casa y en movimiento.',
    features: ['Modo Portátil', 'Modo TV', 'Joy-Con Incluidos', 'Exclusivos Nintendo'],
    category: 'Consolas',
    stock: 20,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 5,
    name: 'PS4 Pro 1TB',
    image: '/assets/PS4PRO.webp',
    price: 529990,
    originalPrice: null,
    description: 'PlayStation 4 Pro con 1TB de almacenamiento. Consola de alta gama de Sony.',
    features: ['4K Gaming', 'HDR', 'PS VR Compatible', 'Exclusivos PlayStation'],
    category: 'Consolas',
    stock: 5,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 6,
    name: 'PS4 1TB',
    image: '/assets/ps4.png',
    price: 279990,
    originalPrice: null,
    description: 'PlayStation 4 con 1TB de almacenamiento. Consola clásica de Sony.',
    features: ['1080p Gaming', 'Exclusivos PlayStation', 'PlayStation Plus', 'Multimedia'],
    category: 'Consolas',
    stock: 3,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },

  // ACCESORIOS
  {
    id: 7,
    name: 'Audífonos Gaming Pro',
    image: '/assets/audifonos.png',
    price: 89990,
    originalPrice: null,
    description: 'Audífonos gaming con sonido surround 7.1 y micrófono retráctil.',
    features: ['Sonido Surround 7.1', 'Micrófono Retráctil', 'RGB Lighting', 'Comfort Premium'],
    category: 'Accesorios',
    stock: 25,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 8,
    name: 'Mando Xbox Wireless',
    image: '/assets/mandoxbox.png',
    price: 59990,
    originalPrice: null,
    description: 'Control inalámbrico oficial de Xbox con conectividad Bluetooth.',
    features: ['Inalámbrico', 'Bluetooth', 'Vibración HD', 'Batería Recargable'],
    category: 'Accesorios',
    stock: 30,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 9,
    name: 'Monitor Gaming 27"',
    image: '/assets/moni.png',
    price: 299990,
    originalPrice: null,
    description: 'Monitor gaming de 27 pulgadas con 144Hz y resolución 1440p.',
    features: ['144Hz', '1440p', '1ms Response Time', 'G-Sync Compatible'],
    category: 'Accesorios',
    stock: 10,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 10,
    name: 'Teclado Mecánico RGB',
    image: '/assets/teclado.png',
    price: 129990,
    originalPrice: null,
    description: 'Teclado mecánico gaming con switches Cherry MX y iluminación RGB.',
    features: ['Switches Cherry MX', 'RGB Lighting', 'Anti-Ghosting', 'Cable Desmontable'],
    category: 'Accesorios',
    stock: 18,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },

  // PC GAMERS
  {
    id: 11,
    name: 'PC Gamer Pro',
    image: '/assets/pc1.webp',
    price: 1299990,
    originalPrice: null,
    description: 'PC Gamer de alta gama con RTX 4080 y procesador Intel i7.',
    features: ['RTX 4080', 'Intel i7-13700K', '32GB RAM', '1TB SSD NVMe'],
    category: 'PC Gamers',
    stock: 5,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 12,
    name: 'PC Gamer Mid',
    image: '/assets/pc2.webp',
    price: 899990,
    originalPrice: null,
    description: 'PC Gamer de gama media con RTX 4060 y procesador AMD Ryzen 5.',
    features: ['RTX 4060', 'AMD Ryzen 5 7600X', '16GB RAM', '500GB SSD'],
    category: 'PC Gamers',
    stock: 8,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 13,
    name: 'PC Gamer Basic',
    image: '/assets/pc3.jpg',
    price: 599990,
    originalPrice: null,
    description: 'PC Gamer básica con GTX 1660 y procesador Intel i5.',
    features: ['GTX 1660', 'Intel i5-12400F', '8GB RAM', '250GB SSD'],
    category: 'PC Gamers',
    stock: 12,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },

  // SILLAS
  {
    id: 14,
    name: 'Silla Gamer Pro',
    image: '/assets/silla1.jpg',
    price: 199990,
    originalPrice: null,
    description: 'Silla gaming ergonómica con soporte lumbar y reposapiés.',
    features: ['Ergonómica', 'Soporte Lumbar', 'Reposapiés', 'Ajuste de Altura'],
    category: 'Sillas',
    stock: 15,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 15,
    name: 'Silla Gamer Elite',
    image: '/assets/silla2.webp',
    price: 249990,
    originalPrice: null,
    description: 'Silla gaming premium con materiales de alta calidad.',
    features: ['Cuero Sintético', 'RGB Lighting', '4D Ajustable', 'Almohadillas Lumbar'],
    category: 'Sillas',
    stock: 10,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 16,
    name: 'Silla Gamer Racing',
    image: '/assets/silla3.webp',
    price: 179990,
    originalPrice: null,
    description: 'Silla gaming estilo racing con diseño deportivo.',
    features: ['Diseño Racing', 'Asiento Deportivo', 'Ajuste Reclinable', 'Ruedas Silenciosas'],
    category: 'Sillas',
    stock: 20,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 17,
    name: 'Silla Gamer Comfort',
    image: '/assets/silla4.webp',
    price: 159990,
    originalPrice: null,
    description: 'Silla gaming enfocada en la comodidad para largas sesiones.',
    features: ['Máxima Comodidad', 'Espuma de Alta Densidad', 'Reposacabezas', 'Brazos Ajustables'],
    category: 'Sillas',
    stock: 18,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 18,
    name: 'Silla Gamer RGB',
    image: '/assets/silla5.webp',
    price: 219990,
    originalPrice: null,
    description: 'Silla gaming con iluminación RGB y efectos de luz.',
    features: ['RGB Lighting', 'Efectos de Luz', 'Control Remoto', 'Múltiples Colores'],
    category: 'Sillas',
    stock: 7,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },

  // MOUSES
  {
    id: 19,
    name: 'Mouse Gaming Pro',
    image: '/assets/mouse1.png',
    price: 89990,
    originalPrice: null,
    description: 'Mouse gaming de alta precisión con sensor óptico avanzado.',
    features: ['Sensor Óptico 16000 DPI', 'RGB Lighting', 'Botones Programables', 'Cable Braided'],
    category: 'Mouses',
    stock: 25,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 20,
    name: 'Mouse Gaming Wireless',
    image: '/assets/mouse2.webp',
    price: 119990,
    originalPrice: null,
    description: 'Mouse gaming inalámbrico con baja latencia y larga duración de batería.',
    features: ['Inalámbrico', 'Baja Latencia', '70h Batería', 'Carga USB-C'],
    category: 'Mouses',
    stock: 15,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 21,
    name: 'Mouse Gaming RGB',
    image: '/assets/mouse3.png',
    price: 69990,
    originalPrice: null,
    description: 'Mouse gaming con iluminación RGB y diseño ergonómico.',
    features: ['RGB Lighting', 'Diseño Ergonómico', '12000 DPI', '6 Botones'],
    category: 'Mouses',
    stock: 30,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },

  // MOUSEPADS
  {
    id: 22,
    name: 'Mousepad Gaming XL',
    image: '/assets/mousepad1.webp',
    price: 29990,
    originalPrice: null,
    description: 'Mousepad gaming extra grande con superficie optimizada.',
    features: ['Tamaño XL', 'Superficie Optimizada', 'Base Antideslizante', 'Bordes Cosidos'],
    category: 'Mousepads',
    stock: 40,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 23,
    name: 'Mousepad RGB',
    image: '/assets/mousepad2.png',
    price: 49990,
    originalPrice: null,
    description: 'Mousepad gaming con iluminación RGB y superficie de tela.',
    features: ['RGB Lighting', 'Superficie de Tela', 'USB Powered', 'Control de Brillo'],
    category: 'Mousepads',
    stock: 20,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 24,
    name: 'Mousepad Pro',
    image: '/assets/mousepad3.avif',
    price: 39990,
    originalPrice: null,
    description: 'Mousepad gaming profesional con superficie de velocidad.',
    features: ['Superficie de Velocidad', 'Base de Goma', 'Resistente al Agua', 'Fácil Limpieza'],
    category: 'Mousepads',
    stock: 35,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 25,
    name: 'Mousepad Elite',
    image: '/assets/mousepad4.webp',
    price: 59990,
    originalPrice: null,
    description: 'Mousepad gaming de élite con materiales premium.',
    features: ['Materiales Premium', 'Diseño Minimalista', 'Gran Durabilidad', 'Packaging Premium'],
    category: 'Mousepads',
    stock: 15,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },

  // ROPA
  {
    id: 26,
    name: 'Polera Gaming Personalizada',
    image: '/assets/descarga.webp',
    price: 29990,
    originalPrice: null,
    description: 'Polera personalizada con diseños gaming únicos.',
    features: ['Diseño Personalizado', 'Algodón 100%', 'Estampado Duradero', 'Múltiples Tallas'],
    category: 'Ropa',
    stock: 50,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 27,
    name: 'Polerón Gaming Personalizado',
    image: '/assets/poleron.webp',
    price: 49990,
    originalPrice: null,
    description: 'Polerón personalizado con capucha y diseños gaming.',
    features: ['Capucha', 'Diseño Personalizado', 'Algodón Premium', 'Bolsillos'],
    category: 'Ropa',
    stock: 30,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },

  // JUEGOS DE MESA
  {
    id: 28,
    name: 'Ajedrez Clásico',
    image: '/assets/ajedrez.webp',
    price: 39990,
    originalPrice: null,
    description: 'Juego de ajedrez clásico con piezas de madera.',
    features: ['Piezas de Madera', 'Tablero de Madera', 'Guía de Juego', 'Estuche Incluido'],
    category: 'Juegos de Mesa',
    stock: 25,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 29,
    name: 'Adivina Quién',
    image: '/assets/adivinaquien.webp',
    price: 24990,
    originalPrice: null,
    description: 'Juego de mesa Adivina Quién para toda la familia.',
    features: ['Para Toda la Familia', 'Fácil de Aprender', 'Múltiples Jugadores', 'Diversión Garantizada'],
    category: 'Juegos de Mesa',
    stock: 40,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 30,
    name: 'Basta',
    image: '/assets/basta.webp',
    price: 19990,
    originalPrice: null,
    description: 'Juego de mesa Basta para desarrollar vocabulario.',
    features: ['Desarrolla Vocabulario', 'Juego Educativo', 'Múltiples Categorías', 'Para Todas las Edades'],
    category: 'Juegos de Mesa',
    stock: 35,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 31,
    name: 'Carcassonne',
    image: '/assets/carcassonne.png',
    price: 59990,
    originalPrice: null,
    description: 'Juego de mesa Carcassonne con expansiones incluidas.',
    features: ['Estrategia', 'Construcción de Ciudades', 'Expansiones Incluidas', 'Alta Rejugabilidad'],
    category: 'Juegos de Mesa',
    stock: 15,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 32,
    name: 'Catan',
    image: '/assets/catan.webp',
    price: 49990,
    originalPrice: null,
    description: 'Juego de mesa Catan, el clásico de la estrategia.',
    features: ['Estrategia', 'Comercio', 'Construcción', 'Clásico Mundial'],
    category: 'Juegos de Mesa',
    stock: 20,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 33,
    name: 'Jenga',
    image: '/assets/jenga.jpg',
    price: 24990,
    originalPrice: null,
    description: 'Juego de destreza Jenga con bloques de madera.',
    features: ['Destreza', 'Bloques de Madera', 'Tensión Máxima', 'Para Toda la Familia'],
    category: 'Juegos de Mesa',
    stock: 30,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 34,
    name: 'Ludo',
    image: '/assets/ludo.webp',
    price: 19990,
    originalPrice: null,
    description: 'Juego de mesa Ludo clásico para toda la familia.',
    features: ['Clásico', 'Fácil de Jugar', 'Múltiples Jugadores', 'Diversión Familiar'],
    category: 'Juegos de Mesa',
    stock: 45,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 35,
    name: 'Uno',
    image: '/assets/uno.png',
    price: 9990,
    originalPrice: null,
    description: 'Juego de cartas Uno, el clásico de la familia.',
    features: ['Cartas', 'Fácil de Aprender', 'Rápido', 'Para Toda la Familia'],
    category: 'Juegos de Mesa',
    stock: 60,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }
];

// Operaciones CRUD para productos
export const productService = {
  // READ - Obtener todos los productos
  getAllProducts: () => {
    return [...products];
  },

  // READ - Obtener productos por categoría
  getProductsByCategory: (category) => {
    return products.filter(product => 
      product.category === category && product.isActive
    );
  },

  // READ - Obtener producto por ID
  getProductById: (id) => {
    return products.find(product => product.id === parseInt(id));
  },

  // READ - Buscar productos
  searchProducts: (searchTerm) => {
    const term = searchTerm.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  },

  // READ - Obtener productos en oferta
  getProductsOnSale: () => {
    return products.filter(product => 
      product.originalPrice && product.originalPrice > product.price
    );
  },

  // READ - Obtener productos con stock crítico
  getCriticalStockProducts: () => {
    return products.filter(product => product.stock <= 5);
  },

  // CREATE - Crear nuevo producto
  createProduct: (productData) => {
    const newProduct = {
      id: Math.max(...products.map(p => p.id)) + 1,
      ...productData,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    products.push(newProduct);
    return newProduct;
  },

  // UPDATE - Actualizar producto
  updateProduct: (id, updateData) => {
    const index = products.findIndex(product => product.id === parseInt(id));
    if (index !== -1) {
      products[index] = {
        ...products[index],
        ...updateData,
        updatedAt: new Date()
      };
      return products[index];
    }
    return null;
  },

  // DELETE - Eliminar producto (soft delete)
  deleteProduct: (id) => {
    const index = products.findIndex(product => product.id === parseInt(id));
    if (index !== -1) {
      products[index].isActive = false;
      products[index].updatedAt = new Date();
      return true;
    }
    return false;
  },

  // UPDATE - Actualizar stock
  updateStock: (id, newStock) => {
    const product = products.find(p => p.id === parseInt(id));
    if (product) {
      product.stock = newStock;
      product.updatedAt = new Date();
      return product;
    }
    return null;
  }
};

// Datos de categorías
export const categories = [
  { id: 1, name: 'Consolas', description: 'Consolas de videojuegos' },
  { id: 2, name: 'Accesorios', description: 'Accesorios gaming' },
  { id: 3, name: 'PC Gamers', description: 'Computadores gaming' },
  { id: 4, name: 'Sillas', description: 'Sillas gaming' },
  { id: 5, name: 'Mouses', description: 'Mouses gaming' },
  { id: 6, name: 'Mousepads', description: 'Mousepads gaming' },
  { id: 7, name: 'Ropa', description: 'Ropa gaming personalizada' },
  { id: 8, name: 'Juegos de Mesa', description: 'Juegos de mesa' }
];

// Operaciones CRUD para categorías
export const categoryService = {
  getAllCategories: () => [...categories],
  
  getCategoryById: (id) => {
    return categories.find(category => category.id === parseInt(id));
  },
  
  createCategory: (categoryData) => {
    const newCategory = {
      id: Math.max(...categories.map(c => c.id)) + 1,
      ...categoryData
    };
    categories.push(newCategory);
    return newCategory;
  },
  
  updateCategory: (id, updateData) => {
    const index = categories.findIndex(category => category.id === parseInt(id));
    if (index !== -1) {
      categories[index] = { ...categories[index], ...updateData };
      return categories[index];
    }
    return null;
  },
  
  deleteCategory: (id) => {
    const index = categories.findIndex(category => category.id === parseInt(id));
    if (index !== -1) {
      categories.splice(index, 1);
      return true;
    }
    return false;
  }
};

export default products;
