import React, { useState, useEffect } from "react";
import { Scene } from "./components/Scene";
import { Transition } from "./components/Transition";
import { Summary } from "./components/Summary";
import { Scene as SceneType, Transition as TransitionType } from "./types";

export default function ShowPlanner() {
  const [scenes, setScenes] = useState<SceneType[]>([
    { id: 1, name: "", duration: 30 },
  ]);
  const [transitions, setTransitions] = useState<TransitionType[]>([]);

  const generateTransitionName = (fromId: number, toId: number) => {
    const fromScene = scenes.find((scene) => scene.id === fromId);
    const toScene = scenes.find((scene) => scene.id === toId);
    if (!fromScene || !toScene) return "";
    return `${fromScene.name} > ${toScene.name}`;
  };

  const addScene = (index: number) => {
    const newSceneId = scenes.length + 1;
    const newScene: SceneType = { id: newSceneId, name: "", duration: 30 };
    const newScenes = [...scenes];
    newScenes.splice(index + 1, 0, newScene);
    setScenes(newScenes);
  };

  const removeScene = (index: number) => {
    const newScenes = scenes.filter((_, i) => i !== index);
    setScenes(newScenes);
  };

  const updateScene = (
    index: number,
    field: keyof SceneType,
    value: string | number
  ) => {
    const newScenes = [...scenes];
    newScenes[index] = { ...newScenes[index], [field]: value };
    setScenes(newScenes);
  };

  const updateTransition = (index: number, value: number) => {
    const newTransitions = [...transitions];
    if (newTransitions[index]) {
      newTransitions[index] = { ...newTransitions[index], duration: value };
      setTransitions(newTransitions);
    }
  };

  // ✅ Use useEffect to update transitions when scenes change
  useEffect(() => {
    if (scenes.length < 2) {
      setTransitions([]);
      return;
    }

    const newTransitions = scenes.slice(1).map((scene, i) => ({
      from: scenes[i].id,
      to: scene.id,
      duration: transitions[i] ? transitions[i].duration : 10,
      name: generateTransitionName(scenes[i].id, scene.id),
    }));

    setTransitions(newTransitions);
  }, [scenes]); // Runs whenever `scenes` changes

  const totalScenesDuration = scenes.reduce(
    (sum, scene) => sum + scene.duration,
    0
  );
  const totalTransitionsDuration = transitions.reduce(
    (sum, transition) => sum + transition.duration,
    0
  );
  const totalDuration = totalScenesDuration + totalTransitionsDuration;

  return (
    <div style={{ padding: "24px", maxWidth: "640px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Show Planner</h1>
      <div style={{ marginTop: "16px" }}>
        {scenes.map((scene, index) => (
          <React.Fragment key={scene.id}>
            <Scene
              scene={scene}
              index={index}
              updateScene={updateScene}
              addScene={addScene}
              removeScene={removeScene}
              {...(scenes.length > 1 && { minus: true })}
            />
            {index < transitions.length && (
              <Transition
                transition={transitions[index]}
                index={index}
                updateTransition={updateTransition}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <Summary
        totalDuration={totalDuration}
        totalScenesDuration={totalScenesDuration}
        totalTransitionsDuration={totalTransitionsDuration}
      />
    </div>
  );
}
