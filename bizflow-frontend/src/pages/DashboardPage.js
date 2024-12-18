// src/pages/DashboardPage.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.alert("You have successfully logged out.");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="logo">BizFlow</span>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard" className="sidebar-link">
              <i className="fas fa-home"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/inventory" className="sidebar-link">
              <i className="fas fa-box"></i> Inventory
            </Link>
          </li>
          <li>
            <Link to="/transactions" className="sidebar-link">
              <i className="fas fa-exchange-alt"></i> Transactions
            </Link>
          </li>
          <li>
            <Link to="/data-visual" className="sidebar-link">
              <i className="fas fa-chart-line"></i> Data Visualization
            </Link>
          </li>
          <li>
            <Link to="/Notifications" className="sidebar-link">
              <i className="fas fa-chart-line"></i> Notifications
            </Link>
          </li>
          <li>
            {/* Logout Button */}
            <button className="logout-btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Power BI Section */}
        <section className="power-bi-section">
          <iframe
            title="Power BI Report"
            src="https://app.powerbi.com/reportEmbed?reportId=1af53736-fdcd-4f47-a380-30852509ca5a&autoAuth=true&embeddedDemo=true"
            frameBorder="0"
            allowFullScreen
            className="power-bi-frame"
          ></iframe>
        </section>

        {/* Quick Links Section */}
        <section className="quick-links">
          <Link to="/inventory" className="quick-link">
            <i className="fas fa-box"></i>
            <h3>Manage Inventory</h3>
            <p>Track your products and manage stock.</p>
          </Link>
          <Link to="/transactions" className="quick-link">
            <i className="fas fa-exchange-alt"></i>
            <h3>View Transactions</h3>
            <p>Analyze and track your business transactions.</p>
          </Link>
          <Link to="/data-visual" className="quick-link">
            <i className="fas fa-chart-line"></i>
            <h3>Financial Data Visualization</h3>
            <p>Gain insights for smarter decisions.</p>
          </Link>
          <Link to="/notifications" className="quick-link">
            <i className="fas fa-bell"></i>
            <h3>Notifications</h3>
            <p>Stay updated with the latest alerts.</p>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
