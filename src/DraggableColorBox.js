import React from "react";
import useStyles from "./styles/DraggableColorBoxStyles";

const DraggableColorBox = ({ color, name }) => {
  const classes = useStyles();
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      {name}
    </div>
  );
};

export default DraggableColorBox;
