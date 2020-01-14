import React from "react";
import MiniPalette from "./MiniPalette";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  container: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flexWrap: "wrap"
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white"
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%"
  }
});

const PaletteList = ({ palettes }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
        </nav>
        <div className={classes.palettes}>
          {palettes.map(palette => (
            <MiniPalette {...palette} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaletteList;
