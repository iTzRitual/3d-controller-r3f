import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { useState } from "react";

const root = ReactDOM.createRoot(document.querySelector("#root"));

function UIOverlay() {
  const materialsMap = {
    Body: "Base",
    "Front Panel": "Front",
    Touchpad: "touch",
    "LED Outline": "backlight",
    Buttons: "Buttons",
    Analogs: "Analogs",
    Triggers: "Triggers",
  };

  const colorConfig = {
    Body: [
      "#000000",
      "#a2a0a3",
      "#e1e4ea",
      "#C80000",
      "#00C850",
      "#0046C8",
      "#F40DC2",
      "#F4C60D",
    ],
    "Front Panel": [
      "#a2a0a3",
      "#000000",
      "#e1e4ea",
      "#C80000",
      "#00C850",
      "#0046C8",
      "#F40DC2",
      "#F4C60D",
    ],
    Touchpad: [
      "#a2a8b7",
      "#000000",
      "#e1e4ea",
      "#C80000",
      "#00C850",
      "#0046C8",
      "#F40DC2",
      "#F4C60D",
    ],
    "LED Outline": [
      "#0100e7",
      "#000000",
      "#a2a0a3",
      "#e1e4ea",
      "#C80000",
      "#00C850",
      "#F40DC2",
      "#F4C60D",
    ],
    Buttons: [
      "#1d1a22",
      "#a2a0a3",
      "#e1e4ea",
      "#C80000",
      "#00C850",
      "#0046C8",
      "#F40DC2",
      "#F4C60D",
    ],
    Analogs: [
      "#282828",
      "#a2a0a3",
      "#e1e4ea",
      "#C80000",
      "#00C850",
      "#0046C8",
      "#F40DC2",
      "#F4C60D",
    ],
    Triggers: [
      "#282a30",
      "#a2a0a3",
      "#e1e4ea",
      "#C80000",
      "#00C850",
      "#0046C8",
      "#F40DC2",
      "#F4C60D",
    ],
  };

  const [activeTab, setActiveTab] = useState("Body");

  const [selectedColors, setSelectedColors] = useState(
    Object.fromEntries(
      Object.keys(materialsMap).map((k) => [k, colorConfig[k][0]]),
    ),
  );

  const applyColor = (color) => {
    const matName = materialsMap[activeTab];
    const mat = window.controllerMaterials?.[matName];
    if (!mat) return;

    mat.color.set(color);

    if (matName === "backlight") {
      mat.emissive?.set?.(color);
      mat.emissiveIntensity = 2;
    }

    setSelectedColors((prev) => ({
      ...prev,
      [activeTab]: color,
    }));
  };

  return (
    <div className="ui-overlay">
      <div className="ui-header">
        <img src="logo.svg" alt="" />
      </div>

      <div className="ui-controls">
        <div className="ui-colors">
          <p>
            {activeTab} <span>color</span>
          </p>
          <div className="color-options">
            {colorConfig[activeTab].map((color, i) => (
              <div
                key={i}
                className="color"
                style={{
                  background: color,
                  outline:
                    selectedColors[activeTab] === color
                      ? "2px solid black"
                      : "1px solid black",
                }}
                onClick={() => applyColor(color)}
              />
            ))}
          </div>
        </div>

        <div className="tab-buttons">
          {Object.keys(materialsMap).map((label, i) => (
            <button
              key={i}
              className={activeTab === label ? "active" : ""}
              onClick={() => setActiveTab(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

root.render(
  <>
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{
        width: "70vw",
        height: "90vh",
        marginLeft: "auto",
        position: "absolute",
        bottom: 0,
        right: 0,
        zIndex: 0,
        pointerEvents: "auto",
      }}
    >
      <Experience />
    </Canvas>

    <UIOverlay />
  </>,
);
