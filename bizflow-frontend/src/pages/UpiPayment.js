import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/UpiPayment.css";


function UPIPaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, transactionDetails } = location.state || {};

  const handlePaymentComplete = () => {
    // Navigate back to the main page after payment
    alert("Payment completed successfully!");
    navigate("/");
  };

  return (
    <div className="upi-payment-container">
      <h1>Complete UPI Payment</h1>
      <p>Amount to Pay: ₹{amount}</p>
      <QRCodeCanvas
        value={`upi://pay?pa=your-vpa@upi&pn=YourName&am=${amount}`}
        size={256} // Size of the QR Code
        bgColor={"#ffffff"} // Background color
        fgColor={"#000000"} // Foreground color
        level={"H"} // Error correction level (L, M, Q, H)
      />
      <p>Scan the QR code above to complete your payment.</p>
      <button onClick={handlePaymentComplete} className="complete-button">
        Payment Complete
      </button>
    </div>
  );
}

export default UPIPaymentPage;
