import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogDetail = () => {
  const { postId } = useParams();

  // Datos del blog post (en una app real esto vendría de una API)
  const blogPost = {
    id: parseInt(postId),
    title: 'Las Mejores Consolas Gaming 2024: Guía Completa',
    content: `
      <p>El mundo gaming ha evolucionado enormemente en los últimos años, y 2024 promete ser un año excepcional para los amantes de los videojuegos. En esta guía completa, analizaremos las mejores consolas disponibles en el mercado y te ayudaremos a decidir cuál es la opción perfecta para ti.</p>
      
      <h3>PlayStation 5: La Potencia de Sony</h3>
      <p>La PlayStation 5 sigue siendo una de las consolas más codiciadas del mercado. Con su SSD ultra rápido, gráficos 4K y exclusivos increíbles como Spider-Man 2 y God of War Ragnarök, es una excelente opción para los amantes de los juegos exclusivos de Sony.</p>
      
      <h3>Xbox Series X: El Poder de Microsoft</h3>
      <p>Microsoft ha logrado crear una consola verdaderamente impresionante con la Xbox Series X. Su Game Pass ofrece una biblioteca masiva de juegos, y la retrocompatibilidad con juegos de generaciones anteriores es excepcional.</p>
      
      <h3>Nintendo Switch: La Versatilidad en Movimiento</h3>
      <p>La Nintendo Switch sigue siendo única en su tipo, ofreciendo la posibilidad de jugar tanto en casa como en movimiento. Con exclusivos como The Legend of Zelda: Tears of the Kingdom y Super Mario Bros. Wonder, es perfecta para toda la familia.</p>
      
      <h3>Steam Deck: Gaming PC Portátil</h3>
      <p>Valve revolucionó el mercado con Steam Deck, permitiendo jugar tu biblioteca de Steam en cualquier lugar. Es la opción perfecta para quienes ya tienen una gran colección de juegos en PC.</p>
      
      <h3>¿Cuál Elegir?</h3>
      <p>La elección depende de tus preferencias:</p>
      <ul>
        <li><strong>PlayStation 5:</strong> Si amas los exclusivos de Sony y los gráficos de última generación</li>
        <li><strong>Xbox Series X:</strong> Si prefieres el Game Pass y la retrocompatibilidad</li>
        <li><strong>Nintendo Switch:</strong> Si valoras la portabilidad y los juegos familiares</li>
        <li><strong>Steam Deck:</strong> Si ya tienes una biblioteca de Steam y quieres portabilidad</li>
      </ul>
      
      <h3>Conclusión</h3>
      <p>Cada consola tiene sus fortalezas únicas. La mejor opción es aquella que se alinea con tus preferencias de juego, presupuesto y estilo de vida. En MALETA DIDÁCTICA, tenemos todas estas consolas disponibles con los mejores precios del mercado.</p>
    `,
    image: '/assets/consola.webp',
    date: '2024-01-15',
    author: 'Carlos Gaming',
    category: 'Consolas',
    readTime: '5 min',
    tags: ['Consolas', 'Gaming', 'PlayStation', 'Xbox', 'Nintendo']
  };

  const relatedPosts = [
    {
      id: 2,
      title: 'Cómo Configurar tu Setup Gaming Perfecto',
      image: '/assets/pc.webp',
      date: '2024-01-10'
    },
    {
      id: 3,
      title: 'Mouse Gaming: ¿Qué Características Buscar?',
      image: '/assets/mouse.avif',
      date: '2024-01-08'
    },
    {
      id: 6,
      title: 'PC Gaming: Componentes Esenciales',
      image: '/assets/pc1.webp',
      date: '2024-01-01'
    }
  ];

  return (
    <div className="blog-detail-container">
      <div className="blog-detail-content">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Inicio</Link> / 
          <Link to="/blog">Blog</Link> / 
          <span>Artículo</span>
        </nav>

        {/* Header del artículo */}
        <header className="blog-detail-header">
          <div className="post-meta">
            <span className="post-category">{blogPost.category}</span>
            <span className="post-date">{new Date(blogPost.date).toLocaleDateString('es-CL')}</span>
            <span className="post-read-time">{blogPost.readTime} de lectura</span>
          </div>
          <h1>{blogPost.title}</h1>
          <div className="post-author">
            <span>Por {blogPost.author}</span>
          </div>
        </header>

        {/* Imagen destacada */}
        <div className="blog-detail-image">
          <img src={blogPost.image} alt={blogPost.title} />
        </div>

        {/* Contenido del artículo */}
        <article className="blog-detail-body">
          <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
        </article>

        {/* Tags */}
        <div className="blog-tags">
          <h4>Etiquetas:</h4>
          {blogPost.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* Compartir en redes sociales */}
        <div className="social-share">
          <h4>Compartir:</h4>
          <div className="share-buttons">
            <button className="share-btn facebook">📘 Facebook</button>
            <button className="share-btn twitter">🐦 Twitter</button>
            <button className="share-btn whatsapp">📱 WhatsApp</button>
            <button className="share-btn linkedin">💼 LinkedIn</button>
          </div>
        </div>

        {/* Artículos relacionados */}
        <section className="related-posts">
          <h3>Artículos Relacionados</h3>
          <div className="related-posts-grid">
            {relatedPosts.map(post => (
              <article key={post.id} className="related-post">
                <div className="related-post-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="related-post-content">
                  <span className="related-post-date">{new Date(post.date).toLocaleDateString('es-CL')}</span>
                  <h4>{post.title}</h4>
                  <Link to={`/blog/${post.id}`} className="read-more-btn">
                    Leer más
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Comentarios (simulado) */}
        <section className="comments-section">
          <h3>Comentarios (3)</h3>
          <div className="comments-list">
            <div className="comment">
              <div className="comment-author">
                <div className="comment-avatar">👤</div>
                <div className="comment-info">
                  <h4>GamerPro123</h4>
                  <span className="comment-date">Hace 2 días</span>
                </div>
              </div>
              <p>Excelente artículo! Me ayudó mucho a decidir entre PS5 y Xbox Series X. Al final me decidí por PS5 por los exclusivos.</p>
            </div>
            <div className="comment">
              <div className="comment-author">
                <div className="comment-avatar">👤</div>
                <div className="comment-info">
                  <h4>NintendoFan</h4>
                  <span className="comment-date">Hace 1 semana</span>
                </div>
              </div>
              <p>La Switch sigue siendo mi favorita por la portabilidad. Zelda Tears of the Kingdom es increíble!</p>
            </div>
            <div className="comment">
              <div className="comment-author">
                <div className="comment-avatar">👤</div>
                <div className="comment-info">
                  <h4>PCGamer2024</h4>
                  <span className="comment-date">Hace 2 semanas</span>
                </div>
              </div>
              <p>Steam Deck es una revolución! Poder jugar mis juegos de PC en cualquier lugar es increíble.</p>
            </div>
          </div>
          
          {/* Formulario de comentarios */}
          <form className="comment-form">
            <h4>Deja tu comentario</h4>
            <div className="form-group">
              <input type="text" placeholder="Tu nombre" className="comment-input" />
            </div>
            <div className="form-group">
              <textarea placeholder="Tu comentario..." className="comment-textarea" rows="4"></textarea>
            </div>
            <button type="submit" className="submit-comment-btn">
              Publicar Comentario
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default BlogDetail;
