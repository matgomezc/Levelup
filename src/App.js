import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ShoppingCart from './pages/ShoppingCart';
import Consoles from './pages/Consoles';
import Accessories from './pages/Accessories';
import PCGamers from './pages/PCGamers';
import Chairs from './pages/Chairs';
import Mice from './pages/Mice';
import Mousepads from './pages/Mousepads';
import TShirts from './pages/TShirts';
import Hoodies from './pages/Hoodies';
import BoardGames from './pages/BoardGames';
import ProductDetail from './pages/ProductDetail';
import Search from './pages/Search';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import CardPayment from './pages/CardPayment';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutError from './pages/CheckoutError';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Offers from './pages/Offers';
import Admin from './pages/Admin';

function App() {
  return (
    <SearchProvider>
      <CartProvider>
        <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/consoles" element={<Consoles />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route path="/pc-gamers" element={<PCGamers />} />
              <Route path="/chairs" element={<Chairs />} />
              <Route path="/mice" element={<Mice />} />
              <Route path="/mousepads" element={<Mousepads />} />
              <Route path="/t-shirts" element={<TShirts />} />
              <Route path="/hoodies" element={<Hoodies />} />
              <Route path="/board-games" element={<BoardGames />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/search" element={<Search />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/card-payment" element={<CardPayment />} />
                  <Route path="/checkout-success" element={<CheckoutSuccess />} />
                  <Route path="/checkout-error" element={<CheckoutError />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:postId" element={<BlogDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
        </Router>
      </CartProvider>
    </SearchProvider>
  );
}

export default App;
