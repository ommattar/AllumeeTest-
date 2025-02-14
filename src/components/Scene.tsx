import React from "react";
import { Scene as SceneType } from "../types";

interface SceneProps {
  scene: SceneType;
  minus?: boolean;
  index: number;
  updateScene: (
    index: number,
    field: keyof SceneType,
    value: string | number
  ) => void;
  addScene: (index: number) => void;
  removeScene: (index: number) => void;
}

export const Scene: React.FC<SceneProps> = ({
  scene,
  index,
  updateScene,
  addScene,
  removeScene,
  minus = false,
}) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "8px",
        marginBottom: "8px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <label
          style={{
            marginRight: "8px",
            fontWeight: "bold",
          }}
        >
          Scene {index + 1}:
        </label>
        <input
          type="text"
          value={scene.name}
          onChange={(e) => updateScene(index, "name", e.target.value)}
          placeholder="Scene Name"
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            marginRight: "8px",
          }}
        />
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
        >
          <input
            type="number"
            value={scene.duration}
            onChange={(e) =>
              updateScene(index, "duration", Number(e.target.value))
            }
            placeholder="Duration (seconds)"
            style={{ border: "1px solid #ccc", padding: "8px" }}
          />
          <button
            onClick={() => addScene(index)}
            style={{
              borderRadius: "4px",
              backgroundColor: "green",
              border: "none",
              color: "white",
              padding: "8px",
              marginLeft: "8px",
            }}
          >
            +
          </button>
          {minus && (
            <button
              onClick={() => removeScene(index)}
              style={{
                borderRadius: "4px",
                border: "none",
                backgroundColor: "red",
                color: "white",
                padding: "8px",
                marginLeft: "8px",
              }}
            >
              -
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
