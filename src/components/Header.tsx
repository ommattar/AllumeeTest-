import React from "react";

export const Header: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
        paddingBottom: "8px",
        marginBottom: "16px",
      }}
    >
      <div style={{ flex: "1", fontWeight: "bold" }}>Order</div>
      <div style={{ flex: "3", fontWeight: "bold" }}>Scene Name</div>
      <div style={{ flex: "2", fontWeight: "bold" }}>Duration (sec)</div>
    </div>
  );
};
