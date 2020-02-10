import React, { memo } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./styles/MiniPaletteStyles";

const MiniPalette = memo(
  ({ paletteName, goToPalette, emoji, colors, id, openDialog }) => {
    const classes = useStyles();
    const handleDeletePalette = e => {
      e.stopPropagation();
      openDialog(id);
    };
    const handleClick = () => goToPalette(id);
    const miniColorBoxes = colors.map(color => (
      <div
        className={classes.miniColor}
        key={color.name}
        style={{ backgroundColor: color.color }}
      ></div>
    ));
    return (
      <div className={classes.root} onClick={handleClick}>
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
  }
);

export default MiniPalette;
