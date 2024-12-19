import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import "../styles/SupplierPortal.css";

// Utility function to format dates to month-year format
const formatMonthYear = (date) => {
  const options = { year: 'numeric', month: 'long' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const SupplierPortalPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState({
    SUP123: { status: "Active", lastOrder: "2024-12-01" },
    SUP124: { status: "Pending", lastOrder: "2024-11-28" },
    SUP125: { status: "Active", lastOrder: "2024-12-05" },
    SUP126: { status: "Inactive", lastOrder: "2024-12-03" },
  });

  const handleStatusChange = (supplierId, newStatus) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [supplierId]: {
        ...prevStatuses[supplierId],
        status: newStatus,
      },
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
    }, 3000);
  }, []);

  // Group suppliers by the month of their last order
  const groupedByMonth = Object.entries(statuses).reduce((groups, [supplierId, data]) => {
    const monthYear = formatMonthYear(data.lastOrder); // Format date to Month-Year
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push({ supplierId, ...data });
    return groups;
  }, {});

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

            {Object.keys(groupedByMonth).map((monthYear) => (
              <div key={monthYear} className="month-group">
                <h4>{monthYear}</h4>
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
                      {groupedByMonth[monthYear].map(({ supplierId, status, lastOrder }) => (
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
                          <td>{lastOrder}</td>
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
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default SupplierPortalPage;
