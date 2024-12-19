import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import "../styles/SupplierPortal.css";

const SupplierPortalPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState({
    SUP123: "Active",
    SUP124: "Pending",
    SUP125: "Active",
    SUP126: "Inactive",
  });

  const handleStatusChange = (supplierId, newStatus) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [supplierId]: newStatus,
    }));
  };

  const handleLogout = () => {
    window.alert("You have successfully logged out.");
    navigate("/login");
  };

  useEffect(() => {
    // Simulate a loading process (e.g., data fetching)
    setTimeout(() => {
      setLoading(false); // Stop loading after 3 seconds
    }, 2000);
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
            <Link to="/billcreation" className="sidebar-link">
              <i className="fas fa-exchange-alt"></i> Bill Creation
            </Link>
          </li>
          <li>
            <Link to="/notifications" className="sidebar-link">
              <i className="fas fa-exchange-alt"></i> Notifications
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
                  {Object.entries(statuses).map(([supplierId, status]) => (
                    <tr key={supplierId}>
                      <td>{supplierId}</td>
                      <td>
                        {
                          {
                            SUP123: "ABC Supplies Ltd.",
                            SUP124: "XYZ Wholesale",
                            SUP125: "Global Traders",
                            SUP126: "EcoMart Ltd.",
                          }[supplierId]
                        }
                      </td>
                      <td>
                        {
                          {
                            SUP123: "+1 234 567 890",
                            SUP124: "+1 987 654 321",
                            SUP125: "+1 555 666 777",
                            SUP126: "+1 222 333 444",
                          }[supplierId]
                        }
                      </td>
                      <td>
                        {
                          {
                            SUP123: "2024-12-01",
                            SUP124: "2024-11-28",
                            SUP125: "2024-12-05",
                            SUP126: "2024-12-03",
                          }[supplierId]
                        }
                      </td>
                      <td>
                        <select
                          value={status}
                          onChange={(e) =>
                            handleStatusChange(supplierId, e.target.value)
                          }
                        >
                          <option value="Delivered">Delivered</option>
                          <option value="Delivery Pending">
                            Delivery Pending
                          </option>
                          <option value="In Progress">In Progress</option>
                        </select>
                      </td>
                    </tr>
                  ))}
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
