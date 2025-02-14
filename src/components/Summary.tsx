import React from "react";

interface SummaryProps {
  totalDuration: number;
  totalScenesDuration: number;
  totalTransitionsDuration: number;
}

export const Summary: React.FC<SummaryProps> = ({
  totalDuration,
  totalScenesDuration,
  totalTransitionsDuration,
}) => {
  return (
    <div
      style={{
        marginTop: "16px",
        padding: "8px",
        borderTop: "1px solid #ccc",
      }}
    >
      <p>
        <strong>Scenography total Duration:</strong> {totalDuration}s
      </p>
      <p>
        <strong>Scenes Duration:</strong> {totalScenesDuration}s
      </p>
      <p>
        <strong>Transitions Duration:</strong> {totalTransitionsDuration}s
      </p>
    </div>
  );
};
