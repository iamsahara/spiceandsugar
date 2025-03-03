"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

interface CakeCanvasProps {
  selectedCake: "round" | "square";
  color: string;
}

const CakeCanvas: React.FC<CakeCanvasProps> = ({ selectedCake, color }) => {
  const canvasRef = useRef<any>(null);
  const [fabricInstance, setFabricInstance] = useState<typeof import("fabric") | null>(null);
  const [canvas, setCanvas] = useState<any>(null);

  useEffect(() => {
    import("fabric").then((fabricModule) => {
      setFabricInstance(fabricModule.default || fabricModule);
    }).catch((error) => {
      console.error("❌ Error loading Fabric.js:", error);
    });
  }, []);

  useEffect(() => {
    if (!fabricInstance) return;
    const FabricCanvas = fabricInstance?.Canvas;
    if (!FabricCanvas) {
      console.error("❌ Fabric.js Canvas is undefined.");
      return;
    }
    const newCanvas = new fabricInstance.Canvas("cakeCanvas", {
      backgroundColor: "transparent",
      width: 500,
      height: 400,
    });

    canvasRef.current = newCanvas;
    setCanvas(newCanvas);

    drawCake(newCanvas, selectedCake);

    return () => newCanvas.dispose();
  }, [fabricInstance, selectedCake, color]);

  // ✅ Function to create a 3D rectangle or circle
  const drawCake = (canvas: any, shape: "round" | "square") => {
    if (!fabricInstance || !canvas) return;

    canvas.clear(); // Clear previous shapes

    let cake;
    if (shape === "square") {
      cake = new fabricInstance.Rect({
        width: 200,
        height: 200,
        left: 150,
        top: 150,
        fill: color,
        rx: 20, // Rounded corners
        ry: 20,
        selectable: false,
        shadow: new fabricInstance.Shadow({
          color: "rgba(0, 0, 0, 0.3)",
          blur: 20,
          offsetX: 10,
          offsetY: 10,
        }),
      });
    } else {
      cake = new fabricInstance.Circle({
        radius: 100,
        left: 150,
        top: 120,
        fill: color,
        selectable: false,
        shadow: new fabricInstance.Shadow({
          color: "rgba(0, 0, 0, 0.3)",
          blur: 20,
          offsetX: 10,
          offsetY: 10,
        }),
      });
    }

    canvas.add(cake);
    canvas.renderAll();
  };

  return (
    <div>
      <canvas id="cakeCanvas" />
    </div>
  );
};

export default dynamic(() => Promise.resolve(CakeCanvas), { ssr: false });