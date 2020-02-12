import React from "react";
import DraggableColorBox from "./DraggableColorBox";

const DraggableColorList = ({ colors, removeColor, moveColorBox }) => {
  const renderColorBox = (box, index) => {
    return (
      <DraggableColorBox
        index={index}
        key={box.name}
        name={box.name}
        color={box.color}
        removeColor={removeColor}
        moveColorBox={moveColorBox}
      />
    );
  };
  return (
    <div style={{ height: "100%" }}>
      {colors.map((box, i) => renderColorBox(box, i))}
    </div>
  );
};

export default DraggableColorList;
