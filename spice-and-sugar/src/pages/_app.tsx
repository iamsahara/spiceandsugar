import dynamic from "next/dynamic";
import { useState } from "react";

const CakeCanvas = dynamic(() => import("../components/CakeCanvas"), { ssr: false });

export default function Home() {
  const [selectedCake, setSelectedCake] = useState<"round" | "square">("round"); // ✅ Fixed Type
  const [color, setColor] = useState("#F3E5AB");

  return (
    <div>
      <h1>Spice and Sugar</h1>
      <p>Welcome to our cake customization store!</p>
      
      {/* ✅ Add buttons to change cake shape */}
      <div>
        <button onClick={() => setSelectedCake("round")}>Round</button>
        <button onClick={() => setSelectedCake("square")}>Square</button>
      </div>

      <CakeCanvas selectedCake={selectedCake} color={color} />
    </div>
  );
}