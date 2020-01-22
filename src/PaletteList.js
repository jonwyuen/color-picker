import React from "react";
import MiniPalette from "./MiniPalette";
import useStyles from "./styles/PaletteListStyles";

const PaletteList = ({ palettes, history }) => {
  const classes = useStyles();
  const goToPalette = id => history.push(`/palette/${id}`);
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
        </nav>
        <div className={classes.palettes}>
          {palettes.map(palette => (
            <MiniPalette
              key={palette.id}
              goToPalette={() => goToPalette(palette.id)}
              {...palette}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaletteList;
