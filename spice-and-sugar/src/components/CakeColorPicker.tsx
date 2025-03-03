import React from "react";
import styles from "./CakeColorPicker.module.scss"; // Styling for dropdown

interface CakeColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

// ✅ Define Cake Colors
const cakeColors = [
  { name: "Chocolate 🍫", value: "#5C3317" },
  { name: "Vanilla 🍦", value: "#F3E5AB" },
  { name: "Strawberry 🍓", value: "#FF4D6D" },
  { name: "Red Velvet 🍰", value: "#A52A2A" },
  { name: "Matcha 🍵", value: "#3A5311" },
  { name: "White ⚪", value: "#FFFFFF" },
];

const CakeColorPicker: React.FC<CakeColorPickerProps> = ({ selectedColor, onColorChange }) => {
  return (
    <div className={styles.colorPicker}>
      <label htmlFor="cakeColor" className={styles.label}>
        Select Cake Color:
      </label>
      <select
        id="cakeColor"
        className={styles.dropdown}
        value={selectedColor}
        onChange={(e) => onColorChange(e.target.value)}
      >
        {cakeColors.map((cake) => (
          <option key={cake.value} value={cake.value}>
            {cake.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CakeColorPicker;