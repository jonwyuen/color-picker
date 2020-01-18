import React from "react";

const PaletteFooter = ({ paletteName, emoji }) => {
  return (
    <div className="Palette-footer">
      {paletteName}
      <span className="emoji">{emoji}</span>
    </div>
  );
};

export default PaletteFooter;
