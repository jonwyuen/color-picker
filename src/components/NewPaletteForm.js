import React, { useState, useCallback, useContext } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import DraggableColorList from "./DraggableColorList";
import seedColors from "../seedColors";
import useToggleState from "../hooks/useToggleState";
import { PalettesContext, DispatchContext } from "../context/PalettesContext";
import { HistoryContext } from "../context/HistoryContext";
import { ADD_PALETTE } from "../constants";
import useStyles from "../styles/NewPaletteFormStyles";

const NewPaletteForm = ({ maxColors = 20 }) => {
  const classes = useStyles();
  const history = useContext(HistoryContext);
  const [drawerOpen, toggleDrawer] = useToggleState(true);
  const [colors, setColors] = useState(seedColors[0].colors);
  const palettes = useContext(PalettesContext);
  const dispatch = useContext(DispatchContext);
  const addNewColor = newColor => setColors([...colors, newColor]);
  const clearColors = () => setColors([]);
  const paletteIsFull = colors.length >= maxColors;
  const checkDuplicateColor = (colors, colorToCheck) =>
    colors.some(color => color.name === colorToCheck.name);

  const addRandomColor = () => {
    const allColors = palettes.map(p => p.colors).flat();
    let randomNum;
    let randomColor;
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      randomNum = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[randomNum];
      isDuplicateColor = checkDuplicateColor(colors, randomColor);
    }
    setColors([...colors, randomColor]);
  };

  const handleSavePalette = newPalette => {
    dispatch({ type: ADD_PALETTE, newPalette: { ...newPalette, colors } });
    history.push("/");
  };

  const removeColor = colorName =>
    setColors(colors.filter(color => color.name !== colorName));

  const moveColorBox = useCallback(
    (dragIndex, hoverIndex) => {
      const dragBox = colors[dragIndex];
      setColors(
        update(colors, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragBox]
          ]
        })
      );
    },
    [colors, setColors]
  );
  console.log("NPF");
  return (
    <div className={classes.root}>
      <PaletteFormNav
        handleSavePalette={handleSavePalette}
        handleDrawerOpen={toggleDrawer}
        drawerOpen={drawerOpen}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={clearColors}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={paletteIsFull}
              onClick={addRandomColor}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            addNewColor={addNewColor}
            paletteIsFull={paletteIsFull}
            colors={colors}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerOpen
        })}
      >
        <div className={classes.drawerHeader} />
        <DndProvider backend={HTML5Backend}>
          <DraggableColorList
            colors={colors}
            setColors={setColors}
            removeColor={removeColor}
            moveColorBox={moveColorBox}
          />
        </DndProvider>
      </main>
    </div>
  );
};

export default NewPaletteForm;
