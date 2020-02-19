import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";
import { generatePalette } from "../colorHelpers";
import { PalettesContext } from "../context/PalettesContext";
import useStyles from "../styles/PaletteStyles";

const SingleColorPalette = ({ match }) => {
  const [format, setFormat] = useState("hex");
  const classes = useStyles();
  const palettes = useContext(PalettesContext);
  const findPalette = id => palettes.find(palette => palette.id === id);
  const { paletteId, colorId } = match.params;
  const palette = generatePalette(findPalette(paletteId));

  const { paletteName, emoji, id } = palette;

  const gatherShades = (palette, colorToFilterBy) => {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorToFilterBy)
      );
    }
    return shades.slice(1);
  };

  const shades = gatherShades(palette, colorId);

  const changeFormat = val => setFormat(val);

  const colorBoxes = shades.map(color => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color[format]}
      showingFullPalette={false}
    />
  ));

  return (
    <div className={classes.Palette}>
      <Navbar changeFormat={changeFormat} showingAllColors={false} />
      <div className={classes.colors}>
        {colorBoxes}
        <div className={classes.goBack}>
          <Link to={`/palette/${id}`}>GO BACK</Link>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
};

export default SingleColorPalette;
