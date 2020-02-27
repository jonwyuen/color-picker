import React, { useState, useContext } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { findPalette, generatePalette } from "../colorHelpers";
import { PalettesContext } from "../context/PalettesContext";
import useStyles from "../styles/PaletteStyles";

const Palette = ({ match }) => {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");
  const classes = useStyles();
  const { id } = match.params;
  const palettes = useContext(PalettesContext);
  const palette = generatePalette(findPalette(palettes, id));
  const { colors, paletteName, emoji } = palette;
  const colorBoxes = colors[level].map(color => (
    <ColorBox
      background={color[format]}
      name={color.name}
      key={color.id}
      id={color.id}
      paletteId={id}
      showingFullPalette
    />
  ));
  const changeLevel = newLevel => setLevel(newLevel);
  const changeFormat = val => setFormat(val);
  console.log("Palette");
  return (
    <div className={classes.Palette}>
      <Navbar
        level={level}
        changeLevel={changeLevel}
        changeFormat={changeFormat}
        showingAllColors
      />
      <div className={classes.colors}>{colorBoxes}</div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
};

export default Palette;
