import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();

  // Datos de productos (en una app real esto vendría de una API)
  const products = {
    // CONSOLAS
    'ps5': {
      id: 1,
      name: 'PS5 Pro 1TB',
      image: '/assets/ps5.webp',
      price: 959990,
      description: 'PlayStation 5 Pro con 1TB de almacenamiento. La consola más potente de Sony con gráficos 4K y ray tracing.',
      features: ['Gráficos 4K', 'Ray Tracing', 'SSD Ultra Rápido', 'Compatibilidad con PS4'],
      category: 'Consolas'
    },
    'ps5-digital': {
      id: 2,
      name: 'PS5 Digital 1TB',
      image: '/assets/PS5-dig.webp',
      price: 549990,
      originalPrice: 684990,
      description: 'PlayStation 5 Digital Edition. Sin lector de discos, perfecta para juegos digitales.',
      features: ['Solo Digital', 'SSD Ultra Rápido', 'Gráficos 4K', 'Compatibilidad con PS4'],
      category: 'Consolas'
    },
    'xbox': {
      id: 3,
      name: 'Xbox Series X 1TB',
      image: '/assets/xbox.webp',
      price: 406990,
      description: 'Xbox Series X con 1TB de almacenamiento. La consola más potente de Microsoft.',
      features: ['4K Gaming', '120 FPS', 'Quick Resume', 'Game Pass'],
      category: 'Consolas'
    },
    'nintendo': {
      id: 4,
      name: 'Nintendo Switch',
      image: '/assets/nintendo.webp',
      price: 329990,
      description: 'Nintendo Switch - Consola híbrida que puedes usar en casa y en movimiento.',
      features: ['Modo Portátil', 'Modo TV', 'Joy-Con Incluidos', 'Exclusivos Nintendo'],
      category: 'Consolas'
    },
    'ps4-pro': {
      id: 5,
      name: 'PS4 Pro 1TB',
      image: '/assets/PS4PRO.webp',
      price: 529990,
      description: 'PlayStation 4 Pro con 1TB de almacenamiento. Consola de alta gama de Sony.',
      features: ['Gráficos 4K', 'HDR', 'Compatibilidad con PS4', 'Biblioteca Extensa'],
      category: 'Consolas'
    },
    'ps4': {
      id: 6,
      name: 'PS4 1TB',
      image: '/assets/ps4.png',
      price: 279990,
      description: 'PlayStation 4 con 1TB de almacenamiento. La consola más popular de Sony.',
      features: ['1080p Gaming', 'HDR', 'Biblioteca Extensa', 'Precio Accesible'],
      category: 'Consolas'
    },

    // ACCESORIOS
    'headphones': {
      id: 7,
      name: 'Audífonos Gaming Pro',
      image: '/assets/audifonos.png',
      price: 89990,
      description: 'Audífonos gaming profesionales con sonido surround 7.1 y micrófono de alta calidad.',
      features: ['Sonido Surround 7.1', 'Micrófono Desmontable', 'Comfort Prolongado', 'RGB Lighting'],
      category: 'Accesorios'
    },
    'xbox-controller': {
      id: 8,
      name: 'Mando Xbox Wireless',
      image: '/assets/mandoxbox.png',
      price: 59990,
      description: 'Mando Xbox Wireless oficial con conectividad Bluetooth y batería recargable.',
      features: ['Conectividad Bluetooth', 'Batería Recargable', 'Vibración Haptic', 'Compatible PC'],
      category: 'Accesorios'
    },
    'monitor': {
      id: 9,
      name: 'Monitor Gaming 27"',
      image: '/assets/moni.png',
      price: 299990,
      description: 'Monitor gaming de 27 pulgadas con 144Hz, 1ms de respuesta y tecnología FreeSync.',
      features: ['144Hz Refresh Rate', '1ms Response Time', 'FreeSync', 'HDR Support'],
      category: 'Accesorios'
    },
    'keyboard': {
      id: 10,
      name: 'Teclado Mecánico RGB',
      image: '/assets/teclado.png',
      price: 129990,
      description: 'Teclado mecánico gaming con switches Cherry MX y retroiluminación RGB personalizable.',
      features: ['Switches Cherry MX', 'RGB Personalizable', 'Anti-Ghosting', 'Cable Desmontable'],
      category: 'Accesorios'
    },

    // PC GAMERS
    'pc1': {
      id: 11,
      name: 'PC Gamer Pro',
      image: '/assets/pc1.webp',
      price: 1299990,
      description: 'PC Gamer de alta gama con RTX 4070, Intel i7 y 32GB RAM. Perfecta para gaming 4K.',
      features: ['RTX 4070', 'Intel i7-13700K', '32GB DDR5', 'SSD 1TB NVMe'],
      category: 'PC Gamers'
    },
    'pc2': {
      id: 12,
      name: 'PC Gamer Mid',
      image: '/assets/pc2.webp',
      price: 899990,
      description: 'PC Gamer de gama media con RTX 4060, Intel i5 y 16GB RAM. Ideal para gaming 1440p.',
      features: ['RTX 4060', 'Intel i5-13400F', '16GB DDR4', 'SSD 512GB'],
      category: 'PC Gamers'
    },
    'pc3': {
      id: 13,
      name: 'PC Gamer Basic',
      image: '/assets/pc3.jpg',
      price: 599990,
      description: 'PC Gamer básica con RTX 3050, Intel i3 y 8GB RAM. Perfecta para gaming 1080p.',
      features: ['RTX 3050', 'Intel i3-12100F', '8GB DDR4', 'SSD 256GB'],
      category: 'PC Gamers'
    },

    // SILLAS
    'silla1': {
      id: 14,
      name: 'Silla Gamer Pro',
      image: '/assets/silla1.jpg',
      price: 299990,
      description: 'Silla gaming profesional con soporte lumbar, reposabrazos ajustables y materiales premium.',
      features: ['Soporte Lumbar', 'Reposabrazos Ajustables', 'Material Premium', 'Altura Ajustable'],
      category: 'Sillas'
    },
    'silla2': {
      id: 15,
      name: 'Silla Gamer RGB',
      image: '/assets/silla2.avif',
      price: 399990,
      description: 'Silla gaming con iluminación RGB, soporte lumbar y máxima comodidad para sesiones largas.',
      features: ['Iluminación RGB', 'Soporte Lumbar', 'Comfort Máximo', 'Altura Ajustable'],
      category: 'Sillas'
    },
    'silla3': {
      id: 16,
      name: 'Silla Gamer Basic',
      image: '/assets/silla3.webp',
      price: 199990,
      description: 'Silla gaming básica con diseño ergonómico y materiales de calidad para gaming casual.',
      features: ['Diseño Ergonómico', 'Materiales de Calidad', 'Altura Ajustable', 'Precio Accesible'],
      category: 'Sillas'
    },
    'silla4': {
      id: 17,
      name: 'Silla Gamer Premium',
      image: '/assets/silla4.webp',
      price: 499990,
      description: 'Silla gaming premium con cuero sintético, soporte lumbar avanzado y máxima comodidad.',
      features: ['Cuero Sintético', 'Soporte Lumbar Avanzado', 'Comfort Premium', 'Diseño Elegante'],
      category: 'Sillas'
    },
    'silla5': {
      id: 18,
      name: 'Silla Gamer Elite',
      image: '/assets/silla5.webp',
      price: 599990,
      description: 'Silla gaming elite con todas las características premium y tecnología de última generación.',
      features: ['Tecnología Elite', 'Máximo Comfort', 'Materiales Premium', 'Diseño Exclusivo'],
      category: 'Sillas'
    },

    // MOUSES
    'mouse1': {
      id: 19,
      name: 'Mouse Gaming Pro',
      image: '/assets/mouse1.png',
      price: 89990,
      description: 'Mouse gaming profesional con sensor óptico de alta precisión y diseño ergonómico.',
      features: ['Sensor Óptico 16000 DPI', 'Diseño Ergonómico', 'RGB Personalizable', 'Cable Braided'],
      category: 'Mouses'
    },
    'mouse2': {
      id: 20,
      name: 'Mouse Gaming RGB',
      image: '/assets/mouse2.webp',
      price: 129990,
      description: 'Mouse gaming con iluminación RGB, sensor láser de alta precisión y múltiples botones.',
      features: ['Iluminación RGB', 'Sensor Láser 20000 DPI', 'Múltiples Botones', 'Software Personalizable'],
      category: 'Mouses'
    },
    'mouse3': {
      id: 21,
      name: 'Mouse Gaming Wireless',
      image: '/assets/mouse3.png',
      price: 159990,
      description: 'Mouse gaming inalámbrico con tecnología de baja latencia y batería de larga duración.',
      features: ['Tecnología Wireless', 'Baja Latencia', 'Batería Larga Duración', 'Carga USB-C'],
      category: 'Mouses'
    },

    // MOUSEPADS
    'mousepad1': {
      id: 22,
      name: 'Mousepad Gaming XL',
      image: '/assets/mousepad1.webp',
      price: 29990,
      description: 'Mousepad gaming extra grande con superficie optimizada para precisión y velocidad.',
      features: ['Tamaño XL', 'Superficie Optimizada', 'Base Antideslizante', 'Material Duradero'],
      category: 'Mousepads'
    },
    'mousepad2': {
      id: 23,
      name: 'Mousepad RGB',
      image: '/assets/mousepad2.png',
      price: 49990,
      description: 'Mousepad gaming con iluminación RGB en los bordes y superficie de alta calidad.',
      features: ['Iluminación RGB', 'Superficie de Alta Calidad', 'USB Powered', 'Control de Brillo'],
      category: 'Mousepads'
    },
    'mousepad3': {
      id: 24,
      name: 'Mousepad Pro',
      image: '/assets/mousepad3.avif',
      price: 39990,
      description: 'Mousepad gaming profesional con superficie híbrida para velocidad y control.',
      features: ['Superficie Híbrida', 'Velocidad y Control', 'Base Antideslizante', 'Diseño Minimalista'],
      category: 'Mousepads'
    },
    'mousepad4': {
      id: 25,
      name: 'Mousepad Elite',
      image: '/assets/mousepad4.webp',
      price: 59990,
      description: 'Mousepad gaming elite con superficie de vidrio templado y máxima precisión.',
      features: ['Superficie de Vidrio', 'Máxima Precisión', 'Fácil Limpieza', 'Diseño Premium'],
      category: 'Mousepads'
    },

    // JUEGOS DE MESA
    'adivinaquien': {
      id: 28,
      name: '¿Adivina Quién?',
      image: '/assets/adivinaquien.webp',
      price: 29990,
      description: 'Clásico juego de mesa donde debes adivinar el personaje de tu oponente haciendo preguntas.',
      features: ['Juego Clásico', 'Para 2 Jugadores', 'Desarrollo de Lógica', 'Diversión Familiar'],
      category: 'Juegos de Mesa'
    },
    'ajedrez': {
      id: 29,
      name: 'Ajedrez Premium',
      image: '/assets/ajedrez.webp',
      price: 19990,
      description: 'Set de ajedrez premium con piezas de madera tallada y tablero de alta calidad.',
      features: ['Piezas de Madera', 'Tablero Premium', 'Juego Estratégico', 'Duradero'],
      category: 'Juegos de Mesa'
    },
    'basta': {
      id: 30,
      name: 'Basta',
      image: '/assets/basta.webp',
      price: 14990,
      description: 'Juego de palabras rápido y divertido donde debes escribir palabras que empiecen con una letra.',
      features: ['Juego de Palabras', 'Rápido y Divertido', 'Para Toda la Familia', 'Desarrollo Vocabulario'],
      category: 'Juegos de Mesa'
    },
    'carcassonne': {
      id: 31,
      name: 'Carcassonne',
      image: '/assets/carcassonne.png',
      price: 39990,
      description: 'Juego de estrategia donde construyes ciudades, caminos y monasterios con fichas de territorio.',
      features: ['Estrategia', 'Construcción de Territorios', 'Para 2-5 Jugadores', 'Rejugabilidad Alta'],
      category: 'Juegos de Mesa'
    },
    'catan': {
      id: 32,
      name: 'Catan',
      image: '/assets/catan.webp',
      price: 49990,
      description: 'El clásico juego de colonización donde construyes asentamientos y comercias recursos.',
      features: ['Juego de Colonización', 'Comercio de Recursos', 'Para 3-4 Jugadores', 'Estrategia'],
      category: 'Juegos de Mesa'
    },
    'jenga': {
      id: 33,
      name: 'Jenga',
      image: '/assets/jenga.jpg',
      price: 24990,
      description: 'Juego de habilidad donde debes retirar bloques sin derribar la torre.',
      features: ['Habilidad Manual', 'Tensión Divertida', 'Para Toda la Familia', 'Concentración'],
      category: 'Juegos de Mesa'
    },
    'ludo': {
      id: 34,
      name: 'Ludo',
      image: '/assets/ludo.webp',
      price: 19990,
      description: 'Juego clásico de mesa donde mueves tus fichas alrededor del tablero.',
      features: ['Juego Clásico', 'Para 2-4 Jugadores', 'Dados', 'Diversión Simple'],
      category: 'Juegos de Mesa'
    },
    'uno': {
      id: 35,
      name: 'Uno',
      image: '/assets/uno.png',
      price: 9990,
      description: 'El famoso juego de cartas donde debes deshacerte de todas tus cartas primero.',
      features: ['Juego de Cartas', 'Rápido y Divertido', 'Para 2-10 Jugadores', 'Fácil de Aprender'],
      category: 'Juegos de Mesa'
    },

    // ROPA
    'tshirt1': {
      id: 26,
      name: 'Polera Gaming Personalizada',
      image: '/assets/descarga.webp',
      price: 29990,
      description: 'Polera gaming personalizada con diseños únicos y materiales de alta calidad.',
      features: ['Diseño Personalizado', 'Material de Calidad', 'Tallas Disponibles', 'Lavado Fácil'],
      category: 'Ropa'
    },
    'hoodie1': {
      id: 27,
      name: 'Polerón Gaming Personalizado',
      image: '/assets/poleron.webp',
      price: 49990,
      description: 'Polerón gaming personalizado con capucha y diseños exclusivos para gamers.',
      features: ['Diseño Exclusivo', 'Capucha Ajustable', 'Bolsillos', 'Material Cómodo'],
      category: 'Ropa'
    }
  };

  const product = products[productId];

  if (!product) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#ffffff' }}>
        <h2>Producto no encontrado</h2>
        <Link to="/consoles" style={{ color: '#1E90FF' }}>
          Volver a Consolas
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} agregado al carrito!`);
  };

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '2rem auto', 
      padding: '0 2rem',
      color: '#ffffff'
    }}>
      <div style={{ 
        display: 'flex', 
        gap: '2rem', 
        backgroundColor: '#1E90FF', 
        padding: '2rem', 
        borderRadius: '10px',
        marginBottom: '2rem'
      }}>
        <div style={{ flex: '1' }}>
          <img 
            src={product.image} 
            alt={product.name}
            style={{ 
              width: '100%', 
              maxWidth: '500px', 
              borderRadius: '10px',
              objectFit: 'contain'
            }}
          />
        </div>
        <div style={{ flex: '1' }}>
          <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>
            {product.name}
          </h1>
          <p style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#39FF14',
            marginBottom: '1rem'
          }}>
            ${product.price.toLocaleString('es-CL')} CLP
            {product.originalPrice && (
              <span style={{ 
                textDecoration: 'line-through', 
                color: '#ff4444', 
                fontSize: '1.2rem',
                marginLeft: '1rem'
              }}>
                ${product.originalPrice.toLocaleString('es-CL')} CLP
              </span>
            )}
          </p>
          <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
            {product.description}
          </p>
          <button 
            onClick={handleAddToCart}
            style={{
              backgroundColor: '#39FF14',
              color: '#000000',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '5px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '1rem',
              width: '100%'
            }}
          >
            Agregar al Carrito
          </button>
          <Link 
            to="/cart"
            style={{
              backgroundColor: '#1E90FF',
              color: '#ffffff',
              textDecoration: 'none',
              padding: '1rem 2rem',
              borderRadius: '5px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              display: 'block',
              textAlign: 'center',
              border: '2px solid #39FF14'
            }}
          >
            Ver Carrito
          </Link>
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#303030', 
        padding: '2rem', 
        borderRadius: '10px',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Características</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {product.features.map((feature, index) => (
            <li key={index} style={{ 
              padding: '0.5rem 0', 
              borderBottom: '1px solid #1E90FF',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ color: '#39FF14', marginRight: '1rem' }}>✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link 
          to="/consoles"
          style={{
            backgroundColor: '#1E90FF',
            color: '#ffffff',
            textDecoration: 'none',
            padding: '1rem 2rem',
            borderRadius: '5px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            display: 'inline-block'
          }}
        >
          ← Volver a Consolas
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
