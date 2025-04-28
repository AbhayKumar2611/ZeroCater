import React from "react";

const ErrorPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "600px",
      }}
    >
      <h1 style={{ fontSize: "60px", fontWeight: "bold", color: "darkred" }}>
        Error Page
      </h1>
      <h1 style={{ fontSize: "60px", fontWeight: "bold", color: "darkred" }}>
        404 Page Not Found
      </h1>
    </div>
  );
};

export default ErrorPage;
