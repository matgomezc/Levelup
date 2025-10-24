import React, { useState, useEffect } from 'react';
import { productService } from '../data/products';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    // Cargar datos iniciales
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Simular datos del dashboard
    const allProducts = productService.getAllProducts();
    const criticalStock = productService.getCriticalStockProducts();
    
    setProducts(allProducts);
    setStats({
      totalProducts: allProducts.length,
      totalOrders: 1234,
      totalUsers: 890,
      totalRevenue: 15750000
    });

    // Simular órdenes
    setOrders([
      {
        id: 1,
        orderNumber: '#20240115001',
        customer: 'Juan Pérez',
        total: 299990,
        status: 'Completado',
        date: '2024-01-15'
      },
      {
        id: 2,
        orderNumber: '#20240115002',
        customer: 'María González',
        total: 159990,
        status: 'En Proceso',
        date: '2024-01-15'
      },
      {
        id: 3,
        orderNumber: '#20240114001',
        customer: 'Carlos López',
        total: 899990,
        status: 'Pendiente',
        date: '2024-01-14'
      }
    ]);

    // Simular usuarios
    setUsers([
      {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan@email.com',
        orders: 5,
        lastLogin: '2024-01-15'
      },
      {
        id: 2,
        name: 'María González',
        email: 'maria@email.com',
        orders: 3,
        lastLogin: '2024-01-14'
      },
      {
        id: 3,
        name: 'Carlos López',
        email: 'carlos@email.com',
        orders: 8,
        lastLogin: '2024-01-13'
      }
    ]);
  };

  const Dashboard = () => (
    <div className="dashboard-content">
      <h2>Dashboard - Resumen de las actividades diarias</h2>
      
      {/* Métricas principales */}
      <div className="stats-grid">
        <div className="stat-card purchases">
          <div className="stat-icon">🛒</div>
          <div className="stat-info">
            <h3>Compras</h3>
            <div className="stat-number">{stats.totalOrders.toLocaleString()}</div>
            <div className="stat-trend">Probabilidad de aumento 20%</div>
          </div>
        </div>
        
        <div className="stat-card products">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>Productos</h3>
            <div className="stat-number">{stats.totalProducts}</div>
            <div className="stat-trend">Inventario actual {stats.totalProducts + 100}</div>
          </div>
        </div>
        
        <div className="stat-card users">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>Usuarios</h3>
            <div className="stat-number">{stats.totalUsers}</div>
            <div className="stat-trend">Nuevos usuarios este mes 100</div>
          </div>
        </div>
      </div>

      {/* Módulos funcionales */}
      <div className="modules-grid">
        <div className="module-card" onClick={() => setActiveTab('orders')}>
          <div className="module-icon">🛒</div>
          <h3>Órdenes</h3>
          <p>Gestión y seguimiento de todas las órdenes de compra realizadas.</p>
        </div>
        
        <div className="module-card" onClick={() => setActiveTab('products')}>
          <div className="module-icon">📦</div>
          <h3>Productos</h3>
          <p>Administrar inventario y detalles de los productos disponibles.</p>
        </div>
        
        <div className="module-card" onClick={() => setActiveTab('categories')}>
          <div className="module-icon">🏷️</div>
          <h3>Categorías</h3>
          <p>Organizar productos en categorías para facilitar su navegación.</p>
        </div>
        
        <div className="module-card" onClick={() => setActiveTab('users')}>
          <div className="module-icon">👥</div>
          <h3>Usuarios</h3>
          <p>Gestión de cuentas de usuario y sus roles dentro del sistema.</p>
        </div>
        
        <div className="module-card" onClick={() => setActiveTab('reports')}>
          <div className="module-icon">📊</div>
          <h3>Reportes</h3>
          <p>Generación de informes detallados sobre las operaciones del sistema.</p>
        </div>
        
        <div className="module-card" onClick={() => setActiveTab('profile')}>
          <div className="module-icon">👤</div>
          <h3>Perfil</h3>
          <p>Administración de la información personal y configuraciones de cuenta.</p>
        </div>
        
        <div className="module-card" onClick={() => window.open('/', '_blank')}>
          <div className="module-icon">🏪</div>
          <h3>Tienda</h3>
          <p>Visualiza tu tienda en tiempo real, visualiza los reportes de los usuarios.</p>
        </div>
      </div>
    </div>
  );

  const Orders = () => (
    <div className="orders-content">
      <h2>Gestión de Órdenes</h2>
      <div className="orders-table">
        <div className="table-header">
          <div>ID</div>
          <div>Número de Orden</div>
          <div>Cliente</div>
          <div>Total</div>
          <div>Estado</div>
          <div>Fecha</div>
          <div>Acciones</div>
        </div>
        {orders.map(order => (
          <div key={order.id} className="table-row">
            <div>{order.id}</div>
            <div>{order.orderNumber}</div>
            <div>{order.customer}</div>
            <div>${order.total.toLocaleString('es-CL')}</div>
            <div className={`status ${order.status.toLowerCase().replace(' ', '-')}`}>
              {order.status}
            </div>
            <div>{order.date}</div>
            <div>
              <button className="action-btn view">Ver</button>
              <button className="action-btn edit">Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Products = () => (
    <div className="products-content">
      <h2>Gestión de Productos</h2>
      <div className="products-actions">
        <button className="action-btn primary">Nuevo Producto</button>
        <button className="action-btn secondary">Exportar</button>
      </div>
      <div className="products-table">
        <div className="table-header">
          <div>ID</div>
          <div>Nombre</div>
          <div>Categoría</div>
          <div>Precio</div>
          <div>Stock</div>
          <div>Estado</div>
          <div>Acciones</div>
        </div>
        {products.slice(0, 10).map(product => (
          <div key={product.id} className="table-row">
            <div>{product.id}</div>
            <div>{product.name}</div>
            <div>{product.category}</div>
            <div>${product.price.toLocaleString('es-CL')}</div>
            <div className={product.stock <= 5 ? 'low-stock' : ''}>{product.stock}</div>
            <div className={`status ${product.isActive ? 'active' : 'inactive'}`}>
              {product.isActive ? 'Activo' : 'Inactivo'}
            </div>
            <div>
              <button className="action-btn view">Ver</button>
              <button className="action-btn edit">Editar</button>
              <button className="action-btn delete">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Users = () => (
    <div className="users-content">
      <h2>Gestión de Usuarios</h2>
      <div className="users-table">
        <div className="table-header">
          <div>ID</div>
          <div>Nombre</div>
          <div>Email</div>
          <div>Órdenes</div>
          <div>Último Login</div>
          <div>Acciones</div>
        </div>
        {users.map(user => (
          <div key={user.id} className="table-row">
            <div>{user.id}</div>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.orders}</div>
            <div>{user.lastLogin}</div>
            <div>
              <button className="action-btn view">Ver</button>
              <button className="action-btn edit">Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Reports = () => (
    <div className="reports-content">
      <h2>Reportes del Sistema</h2>
      <div className="reports-grid">
        <div className="report-card">
          <h3>Ventas por Mes</h3>
          <div className="report-chart">
            <p>📈 Gráfico de ventas mensuales</p>
          </div>
        </div>
        <div className="report-card">
          <h3>Productos Más Vendidos</h3>
          <div className="report-chart">
            <p>🏆 Top 10 productos</p>
          </div>
        </div>
        <div className="report-card">
          <h3>Usuarios Activos</h3>
          <div className="report-chart">
            <p>👥 Estadísticas de usuarios</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'orders':
        return <Orders />;
      case 'products':
        return <Products />;
      case 'users':
        return <Users />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>MALETA DIDÁCTICA</h2>
          <p>Panel Administrativo</p>
        </div>
        
        <nav className="admin-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            🛒 Órdenes
          </button>
          <button 
            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            📦 Productos
          </button>
          <button 
            className={`nav-item ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            🏷️ Categorías
          </button>
          <button 
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Usuarios
          </button>
          <button 
            className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            📊 Reportes
          </button>
          <button 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            👤 Perfil
          </button>
        </nav>
        
        <div className="admin-footer">
          <button className="logout-btn">
            🚪 Cerrar Sesión
          </button>
        </div>
      </div>
      
      <div className="admin-main">
        <div className="admin-header">
          <h1>Panel Administrativo</h1>
          <div className="admin-actions">
            <button className="notification-btn">🔔</button>
            <button className="profile-btn">👤</button>
          </div>
        </div>
        
        <div className="admin-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Admin;
