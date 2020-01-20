import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { makeStyles } from "@material-ui/styles";
import chroma from "chroma-js";
import "./ColorBox.css";

const useStyles = makeStyles(props => ({
  ColorBox: {
    width: "20%",
    height: props => (props.showingFullPalette ? "25%" : "50%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover button": {
      opacity: 1
    }
  },
  copyText: {
    color: props =>
      chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white"
  },
  colorName: {
    color: props =>
      chroma(props.background).luminance() <= 0.08 ? "white" : "rgba(0,0,0,0.6)"
  },
  seeMore: {
    background: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    border: "none",
    right: "0px",
    bottom: "0px",
    color: props =>
      chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase"
  },
  copyButton: {
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    textAlign: "center",
    outline: "none",
    background: "rgba(255,255,255,0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    color: props =>
      chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white",
    textTransform: "uppercase",
    border: "none",
    textDecoration: "none",
    opacity: 0
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    padding: "10px",
    left: "0px",
    bottom: "0px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px"
  },
  copyOverlay: {
    opacity: 0,
    zIndex: 0,
    width: "100%",
    height: "100%",
    transition: "transform 0.6s ease-in-out",
    transform: "scale(0.1)"
  },
  showOverlay: {
    opacity: 1,
    transform: "scale(50)",
    zIndex: 10,
    position: "absolute"
  },
  copyMessage: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "4rem",
    transform: "scale(0.1)",
    opacity: 0,
    color: "white",
    "& h1": {
      fontWeight: 400,
      textShadow: "1px 2px black",
      background: " rgba(255, 255, 255, 0.2)",
      width: "100%",
      textAlign: "center",
      marginBottom: 0,
      padding: "1rem",
      textTransform: "uppercase"
    },
    "& p": {
      fontWeight: 100,
      fontSize: "2rem"
    }
  },
  showMessage: {
    opacity: 1,
    transform: "scale(1)",
    zIndex: 25,
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.3s"
  }
}));

const ColorBox = ({ background, name, id, paletteId, showingFullPalette }) => {
  const classes = useStyles({ background, showingFullPalette });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 1500);
  }, [copied]);
  return (
    <CopyToClipboard text={background} onCopy={() => setCopied(true)}>
      <div style={{ background }} className={classes.ColorBox}>
        <div
          style={{ background }}
          className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
        />
        <div
          className={`${classes.copyMessage} ${copied && classes.showMessage}`}
        >
          <h1>copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyButton}>Copy</button>
        </div>
        {showingFullPalette && (
          <Link
            to={`/palette/${paletteId}/${id}`}
            onClick={e => e.stopPropagation()}
          >
            <span className={classes.seeMore}>MORE</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;
