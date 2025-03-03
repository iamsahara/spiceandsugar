import dynamic from "next/dynamic";
import { useState } from "react";
const CakeCanvas = dynamic(() => import("../components/CakeCanvas"), { ssr: false });

export default function Home() {
  const [selectedCake, setSelectedCake] = useState<"round" | "square">("round");
  const [color, setColor] = useState("#F3E5AB");
  return (
    <div>
      <h1>Spice and Sugar</h1>
      <p>Welcome to our cake customization store!</p>
      <CakeCanvas selectedCake={selectedCake} color={color}/>
    </div>
  );
}