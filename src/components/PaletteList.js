import React, { useState, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import MiniPalette from "./MiniPalette";
import useToggleState from "../hooks/useToggleState";
import { PalettesContext, DispatchContext } from "../context/PalettesContext";
import { HistoryContext } from "../context/HistoryContext";
import { DELETE_PALETTE, RESTORE_PALETTES } from "../constants";
import useStyles from "../styles/PaletteListStyles";

const PaletteList = () => {
  const classes = useStyles();
  const history = useContext(HistoryContext);
  const palettes = useContext(PalettesContext);
  const dispatch = useContext(DispatchContext);
  const [dialogOpen, toggleDialog] = useToggleState(false);
  const [deletingId, setDeletingId] = useState("");
  const goToPalette = useCallback(id => history.push(`/palette/${id}`), [
    history
  ]);
  const openDialog = useCallback(
    id => {
      toggleDialog();
      setDeletingId(id);
    },
    [toggleDialog]
  );
  const closeDialog = () => {
    toggleDialog();
    setDeletingId("");
  };
  const handleDeletePalette = () => {
    dispatch({ type: DELETE_PALETTE, id: deletingId });
    closeDialog();
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>Color Picker</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        {palettes.length <= 0 && (
          <div className={classes.restoreBtn}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => dispatch({ type: RESTORE_PALETTES })}
            >
              Restore Default Palettes
            </Button>
          </div>
        )}
        <TransitionGroup className={classes.palettes}>
          {palettes.map(palette => (
            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
              <MiniPalette
                key={palette.id}
                goToPalette={goToPalette}
                openDialog={openDialog}
                {...palette}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <Dialog
        open={dialogOpen}
        aria-labelledby="delete-dialog-title"
        onClose={closeDialog}
      >
        <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
        <List>
          <ListItem button onClick={handleDeletePalette}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete"></ListItemText>
          </ListItem>
          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel"></ListItemText>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};

export default PaletteList;
