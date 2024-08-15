import React from "react";

const HomePage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f3f1f5",
        color: "#3A244A",
        textAlign: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          fontSize: "36px",
          fontWeight: "bold",
          padding: "20px 30px",
          backgroundColor: "#ffffff",
          borderRadius: "15px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          border: "3px solid #3A244A",
          transition: "transform 0.3s ease",
        }}
      >
        Welcome to the Home Page
      </h1>
    </div>
  );
};

export default HomePage;
