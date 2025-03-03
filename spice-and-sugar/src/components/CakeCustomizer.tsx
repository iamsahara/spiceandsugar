"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const CakeCustomizer = () => {
  const canvasRef = useRef<any>(null);
  const [fabric, setFabric] = useState<any>(null);
  const [canvas, setCanvas] = useState<any>(null);

  useEffect(() => {
    import("fabric").then((fabricModule) => {
      // ✅ Ensure correct import
      const loadedFabric = fabricModule.default || fabricModule;
      if (loadedFabric) {
        console.log("✅ Fabric.js successfully loaded", loadedFabric);
        setFabric(loadedFabric);
      } else {
        console.error("❌ Failed to load Fabric.js");
      }
    }).catch((error) => {
      console.error("❌ Error loading Fabric.js:", error);
    });
  }, []);

  useEffect(() => {
    if (!fabric) {
      console.log("❌ Fabric.js not loaded yet");
      return;
    }

    console.log("✅ Fabric.js is ready, initializing canvas...");

    const newCanvas = new fabric.Canvas("cakeCanvas", {
      backgroundColor: "#f8f8f8",
      width: 500,
      height: 400,
    });

    canvasRef.current = newCanvas;
    setCanvas(newCanvas);

    console.log("✅ Canvas initialized", newCanvas);

    return () => {
      newCanvas.dispose();
      console.log("🗑 Canvas disposed");
    };
  }, [fabric]); // Runs only when Fabric.js is loaded

  // Function to add a rectangle (square cake)
  const addRectangle = () => {
    if (!canvas || !fabric) {
      console.log("❌ Canvas not initialized");
      return;
    }

    console.log("🟨 Adding a rectangle...");
    const rect = new fabric.Rect({
      width: 200,
      height: 200,
      fill: "#FFD700",
      left: 150,
      top: 100,
      selectable: true,
    });

    canvas.add(rect);
    console.log("✅ Rectangle added", rect);
  };

  // Function to add a circle (round cake)
  const addCircle = () => {
    if (!canvas || !fabric) {
      console.log("❌ Canvas not initialized");
      return;
    }

    console.log("🟣 Adding a circle...");
    const circle = new fabric.Circle({
      radius: 100,
      fill: "#FF69B4",
      left: 150,
      top: 100,
      selectable: true,
    });

    canvas.add(circle);
    console.log("✅ Circle added", circle);
  };

  return (
    <div>
      <h2>Customize Your Cake</h2>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={addRectangle} style={{ marginRight: "10px" }}>
          Add Square Cake 🎂
        </button>
        <button onClick={addCircle}>Add Round Cake 🍰</button>
      </div>
      <canvas id="cakeCanvas" />
    </div>
  );
};

// ✅ Ensure the component only renders on the client (no SSR issues)
export default dynamic(() => Promise.resolve(CakeCustomizer), { ssr: false });