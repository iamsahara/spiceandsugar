"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

interface CakeCanvasProps {
  selectedCake: "round" | "square";
  color: string;
}

const cakeImages: Record<string, string> = {
  round: "/roundcake.png",
  square: "/rectanglecake.png",
};

const CakeCanvas: React.FC<CakeCanvasProps> = ({ selectedCake, color }) => {
  const canvasRef = useRef<any>(null);
  const [fabricInstance, setFabricInstance] = useState<any>(null);
  const [canvas, setCanvas] = useState<any>(null);

  useEffect(() => {
    import("fabric").then((fabricModule) => {
      const Fabric = fabricModule.default || fabricModule;
      setFabricInstance(Fabric);
    }).catch((error) => {
      console.error("❌ Error loading Fabric.js:", error);
    });
  }, []);

  useEffect(() => {
    if (!fabricInstance) return;

    const newCanvas = new fabricInstance.Canvas("cakeCanvas", {
      backgroundColor: "transparent",
      width: 500,
      height: 400,
    });

    canvasRef.current = newCanvas;
    setCanvas(newCanvas);

    loadCakeImage(newCanvas, selectedCake);

    return () => {
      newCanvas.dispose();
    };
  }, [fabricInstance, selectedCake]);

  const loadCakeImage = (canvas: any, shape: string) => {
    if (!fabricInstance) return;
    canvas.clear();

    fabricInstance.Image.fromURL(cakeImages[shape], (img: any) => {
      img.scaleToWidth(300);
      img.set({ left: 100, top: 50, selectable: false });

      canvas.add(img);
      applyCakeColor(canvas, img);
    });
  };

  const applyCakeColor = (canvas: any, cakeImg: any) => {
    const colorOverlay = new fabricInstance.Rect({
      left: cakeImg.left,
      top: cakeImg.top,
      width: cakeImg.width,
      height: cakeImg.height,
      fill: color,
      opacity: 0.5,
      selectable: false,
    });

    canvas.add(colorOverlay);
  };

  return (
    <div>
      <canvas id="cakeCanvas" />
    </div>
  );
};

export default dynamic(() => Promise.resolve(CakeCanvas), { ssr: false });