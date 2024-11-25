import React from "react";
import "../styles/dataVisual.css"; // You can create this CSS file for styling

const DataVisualPage = () => {
  return (
    <div className="data-visual-page">
      <h1>Data Visualization</h1>
      <div className="embed-container">
        <iframe
          title="Power BI Report"
          width="1140"
          height="541.25"
          src="https://app.powerbi.com/reportEmbed?reportId=1af53736-fdcd-4f47-a380-30852509ca5a&autoAuth=true&embeddedDemo=true"
          frameBorder="0"
          allowFullScreen="true"
        ></iframe>
      </div>
    </div>
  );
};

export default DataVisualPage;
