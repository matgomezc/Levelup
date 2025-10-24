import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const categories = [
    {
      title: 'Juegos de mesa',
      image: '/assets/juegosmesa.webp',
      link: '/board-games'
    },
    {
      title: 'Accesorios',
      image: '/assets/accesorio.png',
      link: '/accessories'
    },
    {
      title: 'Consolas',
      image: '/assets/consola.webp',
      link: '/consoles'
    },
    {
      title: 'Pc gamers',
      image: '/assets/pc.webp',
      link: '/pc-gamers'
    },
    {
      title: 'Sillas gamers',
      image: '/assets/silla2.webp',
      link: '/chairs'
    },
    {
      title: 'Mouses',
      image: '/assets/mouse.avif',
      link: '/mice'
    },
    {
      title: 'Mousepad',
      image: '/assets/muesepad.png',
      link: '/mousepads'
    },
    {
      title: 'Poleras personalizadas',
      image: '/assets/descarga.webp',
      link: '/t-shirts'
    },
    {
      title: 'Polerones personalizados',
      image: '/assets/poleron.webp',
      link: '/hoodies'
    }
  ];

  return (
    <div>
      <section className="home-hero"></section>
      <section className="home-categories">
        {categories.map((category, index) => (
          <Link key={index} to={category.link} className="card">
            <div className="card-title">{category.title}</div>
            <img src={category.image} alt={category.title} />
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Home;
