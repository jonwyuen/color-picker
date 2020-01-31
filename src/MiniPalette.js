import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./styles/MiniPaletteStyles";

const MiniPalette = ({
  paletteName,
  goToPalette,
  emoji,
  colors,
  id,
  deletePalette
}) => {
  const classes = useStyles();
  const handleDeletePalette = e => {
    e.stopPropagation();
    deletePalette(id);
  };
  const miniColorBoxes = colors.map(color => (
    <div
      className={classes.miniColor}
      key={color.name}
      style={{ backgroundColor: color.color }}
    ></div>
  ));
  return (
    <div className={classes.root} onClick={goToPalette}>
      <DeleteIcon
        className={classes.deleteIcon}
        style={{ transition: "all 0.3s ease-in-out" }}
        onClick={handleDeletePalette}
      />
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
};

export default MiniPalette;
