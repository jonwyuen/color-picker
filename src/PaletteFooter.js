import React from "react";
import useStyles from "./styles/PaletteFooterStyles";

const PaletteFooter = ({ paletteName, emoji }) => {
  const classes = useStyles();
  return (
    <div className={classes.PaletteFooter}>
      {paletteName}
      <span className={classes.emoji}>{emoji}</span>
    </div>
  );
};

export default PaletteFooter;
