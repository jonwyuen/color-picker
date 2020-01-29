import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import useStyles from "./styles/ColorPickerFormStyles";

const ColorPickerForm = ({ paletteIsFull, addNewColor, colors }) => {
  const [currentColor, setCurrentColor] = useState("teal");
  const [newColorName, setNewColorName] = useState("");
  const classes = useStyles();
  const updateCurrentColor = newColor => setCurrentColor(newColor.hex);
  const handleColorNameChange = e => setNewColorName(e.target.value);
  const handleAddNewColor = () => {
    addNewColor({ color: currentColor, name: newColorName });
    setNewColorName("");
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );
    ValidatorForm.addValidationRule("isColorUnique", value =>
      colors.every(({ color }) => color !== currentColor)
    );
  }, [colors, currentColor]);

  return (
    <div>
      <ChromePicker
        color={currentColor}
        onChangeComplete={updateCurrentColor}
        className={classes.picker}
      />
      <ValidatorForm onSubmit={handleAddNewColor}>
        <TextValidator
          name="newColorName"
          value={newColorName}
          variant="filled"
          margin="normal"
          placeholder="Color Name"
          className={classes.colorNameInput}
          onChange={handleColorNameChange}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Please enter a color name",
            "Color name must be unique",
            "Color already used"
          ]}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }}
          disabled={paletteIsFull}
          className={classes.addColor}
          type="submit"
        >
          {paletteIsFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default ColorPickerForm;
