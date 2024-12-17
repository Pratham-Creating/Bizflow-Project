import React from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div>
      <div className="hero-section">
        <div className="overlay"></div> {/* Dark overlay */}
        <nav className="navbar">
          <div className="logo">
            <img src="" alt="" />
            BizFlow
          </div>
          <ul className="nav-links">
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <Link to="./login">
            <button className="btn-signup">Log out</button>
          </Link>
        </nav>

        <div className="hero-content">
          <h1>Streamline Your Business</h1>
          <p>
            Manage your operations and finances effortlessly with BizFlow, the
            ultimate business platform for local entrepreneurs.
          </p>
          <Link to="./dashboard">
            <div className="cta-button">
              Dashboard
            </div>
          </Link>
        </div>
      </div>

      <section id="features" className="features-section">
        <h2>Our Key Features</h2>
        <div className="features-container">
          <div className="feature-box">
            <i className="fas fa-chart-line"></i>
            <h3>Expense Tracking</h3>
            <p>
              Monitor your spending and generate insights for better financial
              control.
            </p>
          </div>
          <div className="feature-box">
            <i className="fas fa-boxes"></i>
            <h3>SKU Management</h3>
            <p>Efficiently track your inventory and manage products with ease.</p>
          </div>
          <div className="feature-box">
            <i className="fas fa-bell"></i>
            <h3>Inventory Alerts</h3>
            <p>
              Get real-time alerts when your inventory is low and needs
              restocking.
            </p>
          </div>
          <div className="feature-box">
            <i className="fas fa-wallet"></i>
            <h3>Payment Integration</h3>
            <p>
              Streamline revenue collection with integrated payment gateways.
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <h2>About BizFlow</h2>
        <p>
          BizFlow is designed to empower local businesses by providing a simple
          yet effective platform to manage their operations and finances.
        </p>
      </section>

      <footer>
        <p>&copy; 2024 BizFlow. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
