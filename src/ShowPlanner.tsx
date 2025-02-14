import React, { useState, useEffect } from "react";
import { Scene } from "./components/Scene";
import { Transition } from "./components/Transition";
import { Summary } from "./components/Summary";
import { ControlPanel } from "./components/ControlPanel";
import { Header } from "./components/Header";
import { Scene as SceneType, Transition as TransitionType } from "./types";

export default function ShowPlanner() {
  const initialScenes = [{ id: 1, name: "", duration: 30 }];
  const exampleScenes = [
    { id: 1, name: "Intro", duration: 30 },
    { id: 2, name: "Main", duration: 60 },
    { id: 3, name: "Outro", duration: 30 },
  ];
  const exampleTransitions = [
    { from: 1, to: 2, duration: 10, name: "Intro > Main" },
    { from: 2, to: 3, duration: 10, name: "Main > Outro" },
  ];
  const [scenes, setScenes] = useState<SceneType[]>(initialScenes);
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

  const handleReset = () => {
    setScenes(initialScenes);
    setTransitions([]);
  };

  const handleSave = () => {
    localStorage.setItem("scenes", JSON.stringify(scenes));
    localStorage.setItem("transitions", JSON.stringify(transitions));
  };

  const handleLoad = () => {
    const savedScenes = localStorage.getItem("scenes");
    const savedTransitions = localStorage.getItem("transitions");

    if (savedScenes) {
      setScenes(JSON.parse(savedScenes));

      if (savedTransitions) {
        setTransitions(JSON.parse(savedTransitions));
      }
    } else {
      setScenes(exampleScenes);
      setTransitions(exampleTransitions);
    }
  };

  const handleClear = () => {
    localStorage.removeItem("scenes");
    localStorage.removeItem("transitions");
    handleReset();
  };

  return (
    <div style={{ padding: "24px", maxWidth: "640px", margin: "0 auto" }}>
      <Header />
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
      <ControlPanel
        onLoad={handleLoad}
        onReset={handleReset}
        onSave={handleSave}
        onClear={handleClear}
      />
    </div>
  );
}
