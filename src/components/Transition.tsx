import React from "react";
import { Transition as TransitionType } from "../types";

interface TransitionProps {
  transition: TransitionType;
  index: number;
  updateTransition: (index: number, value: number) => void;
}

export const Transition: React.FC<TransitionProps> = ({
  transition,
  index,
  updateTransition,
}) => {
  return (
    <div
      style={{
        border: "0px solid #ccc",
        padding: "8px",
        marginBottom: "8px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ color: "#888", marginRight: "8px" }}>
          TR: {transition.name}
        </span>
        <input
          type="number"
          value={transition.duration}
          onChange={(e) => updateTransition(index, Number(e.target.value))}
          placeholder="Transition Duration (seconds)"
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            marginLeft: "auto",
          }}
        />
      </div>
    </div>
  );
};
