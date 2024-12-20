// src/pages/DashboardPage.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import dashboardpng from "../assets/dashboard.png";
import inventorypng from "../assets/inventory.png";
import transactionpng from "../assets/card-payment.png";
import datapng from "../assets/analysis.png";
import billpng from "../assets/bill.png";
import salespng from "../assets/business-intelligence.png";
import notificationpng from "../assets/notification.png";
import supplierpng from "../assets/supplier.png";

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
              <i className="fas fa-home"></i> Dashboard <img src={dashboardpng} alt="ICON" className="dashboard-img" />
            </Link>
          </li>
  
          <li>
            <Link to="/inventory" className="sidebar-link">
              <i className="fas fa-box"></i> Inventory <img src={inventorypng} alt="ICON" className="dashboard-img" />
            </Link>
          </li>
  
          <li>
            <Link to="/transactions" className="sidebar-link">
              <i className="fas fa-exchange-alt"></i> Transactions <img src={transactionpng} alt="ICON" className="dashboard-img" />
            </Link>
          </li>
  
          <li>
            <Link to="/data-visual" className="sidebar-link">
              <i className="fas fa-chart-line"></i> Data Visualization<img src={datapng} alt="ICON" className="dashboard-img" />
            </Link>
          </li>
  
          <li>
            <Link to="/billcreation" className="sidebar-link">
              <i className="fas fa-home"></i> Bill Creation<img src={billpng} alt="ICON" className="dashboard-img" />
            </Link>
          </li>
          <li>
            <Link to="/sales-prediction" className="sidebar-link">
              <i className="fas fa-home"></i> Sales Prediction<img src={salespng} alt="ICON" className="dashboard-img" />
            </Link>
          </li>
          <li>
            <Link to="/notifications" className="sidebar-link">
              <i className="fas fa-chart-line"></i> Notifications<img src={notificationpng} alt="ICON" className="dashboard-img" />
            </Link>
          </li>
  
          <li>
            <Link to="/supplier-portal" className="sidebar-link">
              <i className="fas fa-truck"></i> Supplier Portal<img src={supplierpng} alt="ICON" className="dashboard-img" />
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
            src="https://app.powerbi.com/reportEmbed?reportId=5ad3e009-b4be-46ec-9434-72cbea2a04f8&autoAuth=true&ctid=09bd1956-edda-4e9a-9543-7c7aa2cf4e81"
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
          <Link to="/supplier-portal" className="quick-link">
            <i className="fas fa-truck"></i>
            <h3>Supplier Portal</h3>
            <p>Manage your orders and invoices.</p>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
