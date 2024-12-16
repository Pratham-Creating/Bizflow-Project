// src/pages/NotificationPage.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Notification.css";

const NotificationPage = () => {
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
            <Link to="/notifications" className="sidebar-link">
              <i className="fas fa-bell"></i> Notifications
            </Link>
          </li>
          <li>
            <Link to="/logout" className="sidebar-link">
              <i className="fas fa-sign-out-alt"></i> Logout
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <section className="notification-section">
          <h1>Notifications</h1>
          <ul className="notification-list">
            <li className="notification-item">
              <p><strong>New Transaction:</strong> Your recent transaction was successful.</p>
              <span className="notification-time">5 mins ago</span>
            </li>
            <li className="notification-item">
              <p><strong>Stock Alert:</strong> Product A is running low on stock.</p>
              <span className="notification-time">1 hour ago</span>
            </li>
            <li className="notification-item">
              <p><strong>System Update:</strong> BizFlow has been updated to version 1.1.0.</p>
              <span className="notification-time">Yesterday</span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default NotificationPage;
