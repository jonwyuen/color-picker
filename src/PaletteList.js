import React from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import useStyles from "./styles/PaletteListStyles";

const PaletteList = ({ palettes, history, deletePalette }) => {
  const classes = useStyles();
  const goToPalette = id => history.push(`/palette/${id}`);
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <div className={classes.palettes}>
          {palettes.map(palette => (
            <MiniPalette
              key={palette.id}
              goToPalette={() => goToPalette(palette.id)}
              deletePalette={deletePalette}
              {...palette}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaletteList;
