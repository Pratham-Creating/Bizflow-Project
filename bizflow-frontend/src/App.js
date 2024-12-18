import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Import your components/pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/inventoryPage';
import TransactionPage from './pages/transactionPage';
import DataVisualPage from './pages/dataVisualPage';
import NotificationPage from './pages/NotificationPage';
import BillCreation from './pages/BillCreation';
import SupplierPortalPage from './pages/SupplierPortalPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/billcreation" element={<BillCreation />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/transactions" element={<TransactionPage/>} />
          <Route path="/data-visual" element={<DataVisualPage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/supplier-portal" element={<SupplierPortalPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
