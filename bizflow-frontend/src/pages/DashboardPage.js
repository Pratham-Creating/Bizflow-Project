
// src/pages/DashboardPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>BizFlow</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/inventory">Inventory</Link></li>
            <li><Link to="/transactions">Transactions</Link></li>
            <li><Link to="/data-visual">Data Visualization</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <div className="welcome">
            <h1>Welcome to Your Dashboard!</h1>
            <p>Your business overview and tools at a glance.</p>
          </div>

          <div className="user-profile">
            <img src="https://via.placeholder.com/80" alt="User Avatar" />
            <div className="profile-info">
              <h3>User Name</h3>
              <p>Business Name</p>
            </div>
          </div>
        </header>

        {/* Quick Links */}
        <section className="dashboard-actions">
          <div className="action-card">
            <h3>Manage Inventory</h3>
            <p>Track your products and manage stock easily.</p>
            <Link to="/inventory" className="btn">Go to Inventory</Link>
          </div>
          <div className="action-card">
            <h3>View Transactions</h3>
            <p>Analyze and track your business transactions.</p>
            <Link to="/transactions" className="btn">Go to Transactions</Link>
          </div>
          <div className="action-card">
            <h3>Financial Data Visualization</h3>
            <p>Manage your business more effectively.</p>
            <Link to="/data-visual" className="btn">Go to Data Visualization</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
