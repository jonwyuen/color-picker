import React, { useState } from "react";
import { Link } from "react-router-dom";
import PaletteMetaForm from "./PaletteMetaForm";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import useStyles from "./styles/PaletteFormNavStyles";

const PaletteFormNav = ({
  palettes,
  handleSavePalette,
  handleDrawerOpen,
  open
}) => {
  const classes = useStyles();
  const [formShowing, setFormShowing] = useState(false);

  const showForm = () => setFormShowing(true);
  const hideForm = () => setFormShowing(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, { [classes.hide]: open })}
          >
            <ChevronRightIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create a Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Link to="/">
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Go Back
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={showForm}
          >
            Save
          </Button>
        </div>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          palettes={palettes}
          handleSavePalette={handleSavePalette}
          hideForm={hideForm}
        />
      )}
    </div>
  );
};

export default PaletteFormNav;
