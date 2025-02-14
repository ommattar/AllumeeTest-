import React from "react";

interface ControlPanelProps {
  onSave: () => void;
  onReset: () => void;
  onLoad: () => void;
  onClear: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onSave,
  onReset,
  onLoad,
  onClear,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "16px",
      }}
    >
      <button
        onClick={onSave}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Save
      </button>

      <button
        onClick={onLoad}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Load
      </button>

      <button
        onClick={onReset}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Reset
      </button>
      <button
        onClick={onClear}
        style={{
          backgroundColor: "orange",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Clear Storage
      </button>
    </div>
  );
};
