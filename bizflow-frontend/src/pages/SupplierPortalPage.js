import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import "../styles/SupplierPortal.css";

const SupplierPortalPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    window.alert("You have successfully logged out.");
    navigate("/login");
  };

  useEffect(() => {
    // Simulate a loading process (e.g., data fetching)
    setTimeout(() => {
      setLoading(false); // Stop loading after 3 seconds
    }, 3000);
  }, []);

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
            <Link to="/supplier-portal" className="sidebar-link active">
              <i className="fas fa-truck"></i> Supplier Portal
            </Link>
          </li>
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header>
          <h2>Supplier Management Portal</h2>
        </header>

        {/* Loading Indicator */}
        {loading ? (
          <div className="loader">
            <div className="circle"></div>
          </div>
        ) : (
          <section className="supplier-section">
            <h3>Supplier List</h3>
            <div className="supplier-table">
              <table>
                <thead>
                  <tr>
                    <th>Supplier ID</th>
                    <th>Supplier Name</th>
                    <th>Contact</th>
                    <th>Last Order</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SUP123</td>
                    <td>ABC Supplies Ltd.</td>
                    <td>+1 234 567 890</td>
                    <td>2024-12-01</td>
                    <td>Active</td>
                  </tr>
                  <tr>
                    <td>SUP124</td>
                    <td>XYZ Wholesale</td>
                    <td>+1 987 654 321</td>
                    <td>2024-11-28</td>
                    <td>Pending</td>
                  </tr>
                  <tr>
                    <td>SUP125</td>
                    <td>Global Traders</td>
                    <td>+1 555 666 777</td>
                    <td>2024-12-05</td>
                    <td>Active</td>
                  </tr>
                  <tr>
                    <td>SUP126</td>
                    <td>EcoMart Ltd.</td>
                    <td>+1 222 333 444</td>
                    <td>2024-12-03</td>
                    <td>Inactive</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default SupplierPortalPage;
