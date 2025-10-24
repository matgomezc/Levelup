import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Las Mejores Consolas Gaming 2024: Guía Completa',
      excerpt: 'Descubre las consolas más potentes del mercado y cuál es la mejor opción para ti.',
      image: '/assets/consola.webp',
      date: '2024-01-15',
      author: 'Carlos Gaming',
      category: 'Consolas',
      readTime: '5 min',
      featured: true
    },
    {
      id: 2,
      title: 'Cómo Configurar tu Setup Gaming Perfecto',
      excerpt: 'Aprende a crear el espacio gaming ideal con nuestros consejos profesionales.',
      image: '/assets/pc.webp',
      date: '2024-01-10',
      author: 'Ana Tech',
      category: 'Setup',
      readTime: '8 min',
      featured: false
    },
    {
      id: 3,
      title: 'Mouse Gaming: ¿Qué Características Buscar?',
      excerpt: 'Todo lo que necesitas saber para elegir el mouse gaming perfecto.',
      image: '/assets/mouse.avif',
      date: '2024-01-08',
      author: 'Roberto Support',
      category: 'Accesorios',
      readTime: '6 min',
      featured: false
    },
    {
      id: 4,
      title: 'Los Mejores Juegos de Mesa para Gamers',
      excerpt: 'Descubre juegos de mesa que todo gamer debería tener en su colección.',
      image: '/assets/juegosmesa.webp',
      date: '2024-01-05',
      author: 'Carlos Gaming',
      category: 'Juegos de Mesa',
      readTime: '7 min',
      featured: false
    },
    {
      id: 5,
      title: 'Sillas Gaming: Comodidad vs Estilo',
      excerpt: 'Analizamos las mejores sillas gaming del mercado y sus características.',
      image: '/assets/silla2.webp',
      date: '2024-01-03',
      author: 'Ana Tech',
      category: 'Accesorios',
      readTime: '4 min',
      featured: false
    },
    {
      id: 6,
      title: 'PC Gaming: Componentes Esenciales',
      excerpt: 'Guía completa para armar tu PC gaming desde cero.',
      image: '/assets/pc1.webp',
      date: '2024-01-01',
      author: 'Roberto Support',
      category: 'PC Gaming',
      readTime: '10 min',
      featured: false
    }
  ];

  const categories = ['Todos', 'Consolas', 'Setup', 'Accesorios', 'Juegos de Mesa', 'PC Gaming'];

  return (
    <div className="blog-container">
      <div className="blog-hero">
        <h1>Blog Gaming</h1>
        <p>Mantente al día con las últimas tendencias, reviews y consejos del mundo gaming</p>
      </div>

      <div className="blog-content">
        {/* Post destacado */}
        <section className="featured-post">
          <h2>Artículo Destacado</h2>
          {blogPosts.filter(post => post.featured).map(post => (
            <div key={post.id} className="featured-article">
              <div className="featured-image">
                <img src={post.image} alt={post.title} />
                <div className="featured-badge">Destacado</div>
              </div>
              <div className="featured-content">
                <div className="post-meta">
                  <span className="post-category">{post.category}</span>
                  <span className="post-date">{new Date(post.date).toLocaleDateString('es-CL')}</span>
                  <span className="post-read-time">{post.readTime} de lectura</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="post-author">
                  <span>Por {post.author}</span>
                </div>
                <Link to={`/blog/${post.id}`} className="read-more-btn">
                  Leer más
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Filtros de categorías */}
        <section className="blog-filters">
          <h3>Categorías</h3>
          <div className="category-filters">
            {categories.map(category => (
              <button key={category} className="category-filter">
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Lista de artículos */}
        <section className="blog-posts">
          <h2>Últimos Artículos</h2>
          <div className="posts-grid">
            {blogPosts.filter(post => !post.featured).map(post => (
              <article key={post.id} className="blog-post">
                <div className="post-image">
                  <img src={post.image} alt={post.title} />
                  <div className="post-category-badge">{post.category}</div>
                </div>
                <div className="post-content">
                  <div className="post-meta">
                    <span className="post-date">{new Date(post.date).toLocaleDateString('es-CL')}</span>
                    <span className="post-read-time">{post.readTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="post-author">
                    <span>Por {post.author}</span>
                  </div>
                  <Link to={`/blog/${post.id}`} className="read-more-btn">
                    Leer más
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="newsletter-section">
          <div className="newsletter-content">
            <h3>¡No te pierdas nada!</h3>
            <p>Suscríbete a nuestro newsletter y recibe las últimas noticias gaming directamente en tu email.</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Tu email aquí..." 
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Suscribirse
              </button>
            </form>
          </div>
        </section>

        {/* Redes sociales */}
        <section className="social-section">
          <h3>Síguenos en Redes Sociales</h3>
          <div className="social-links">
            <a href="#" className="social-link facebook">📘 Facebook</a>
            <a href="#" className="social-link twitter">🐦 Twitter</a>
            <a href="#" className="social-link instagram">📷 Instagram</a>
            <a href="#" className="social-link youtube">📺 YouTube</a>
            <a href="#" className="social-link discord">🎮 Discord</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;
