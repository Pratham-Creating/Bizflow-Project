import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/prediction.css";

const SalesPrediction = () => {
    const [leastSellingItems, setLeastSellingItems] = useState([]);
    const [topSellingItems, setTopSellingItems] = useState([]);
    const [salesTrends, setSalesTrends] = useState([]);
    const [lowStockItems, setLowStockItems] = useState([]);
    const [error, setError] = useState(''); // Add error state
    const [loading, setLoading] = useState(true); // Add loading state

    // Fetch least selling items
    const fetchLeastSellingItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/least-selling-items');
            setLeastSellingItems(response.data);
        } catch (error) {
            console.error('Error fetching least selling items:', error);
            setError('Error fetching least selling items');
        }
    };

    // Fetch top selling items
    const fetchTopSellingItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/top-selling-items');
            setTopSellingItems(response.data);
        } catch (error) {
            console.error('Error fetching top selling items:', error);
            setError('Error fetching top selling items');
        }
    };

    // Fetch sales trends
    const fetchSalesTrends = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/sales-trends');
            setSalesTrends(response.data);
        } catch (error) {
            console.error('Error fetching sales trends:', error);
            setError('Error fetching sales trends');
        }
    };

    // Fetch low stock items
    const fetchLowStockItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/low-stock-items');
            setLowStockItems(response.data);
        } catch (error) {
            console.error('Error fetching low stock items:', error);
            setError('Error fetching low stock items');
        }
    };

    useEffect(() => {
        fetchLeastSellingItems();
        fetchTopSellingItems();
        fetchSalesTrends();
        fetchLowStockItems();
        
        // Set loading state to false once all data has been fetched
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }, []);

    return (
        <div className="sales-prediction-container">
            <h2>Sales Predictions</h2>
            {error && <p>{error}</p>} {/* Display error message */}

            {loading ? (
                <p>Loading...</p> // Show loading message or spinner
            ) : (
                <>
                    <section>
                        <h3>Items with the Least Sales</h3>
                        {leastSellingItems.length === 0 ? (
                            <p>No data available.</p>
                        ) : (
                            <ul>
                                {leastSellingItems.map((item, index) => (
                                    <li key={index}>
                                        {item.item_name} - Sold: {item.total_quantity} units
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    <section>
                        <h3>Top Selling Items</h3>
                        {topSellingItems.length === 0 ? (
                            <p>No data available.</p>
                        ) : (
                            <ul>
                                {topSellingItems.map((item, index) => (
                                    <li key={index}>
                                        {item.item_name} - Sold: {item.total_quantity} units
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    <section>
                        <h3>Sales Trends</h3>
                        {salesTrends.length === 0 ? (
                            <p>No data available.</p>
                        ) : (
                            <ul>
                                {salesTrends.map((trend, index) => (
                                    <li key={index}>
                                        Month {trend.month} - Total Sales: ₹{trend.total_sales.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    <section>
                        <h3>Low Stock Items</h3>
                        {lowStockItems.length === 0 ? (
                            <p>No data available.</p>
                        ) : (
                            <ul>
                                {lowStockItems.map((item, index) => (
                                    <li key={index}>
                                        {item.name} - Remaining Stock: {item.quantity} units
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </>
            )}
        </div>
    );
};

export default SalesPrediction;
