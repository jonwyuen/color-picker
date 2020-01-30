import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const PaletteMetaForm = ({ palettes, handleSavePalette, hideForm }) => {
  const [open] = useState(true);
  const [newPaletteName, setNewPaletteName] = useState("");

  const handlePaletteNameChange = e => setNewPaletteName(e.target.value);

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }, [palettes]);

  return (
    <Dialog open={open} onClose={hideForm} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
      <ValidatorForm onSubmit={() => handleSavePalette(newPaletteName)}>
        <DialogContent>
          <DialogContentText>
            Please enter a unique name for your color palette.
          </DialogContentText>
          <Picker />
          <TextValidator
            label="Palette Name"
            name="newPaletteName"
            value={newPaletteName}
            onChange={handlePaletteNameChange}
            fullWidth
            margin="normal"
            validators={["required", "isPaletteNameUnique"]}
            errorMessages={[
              "Please enter a palette name",
              "Palette name must be unique"
            ]}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={hideForm} color="primary">
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save Palette
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
};

export default PaletteMetaForm;
