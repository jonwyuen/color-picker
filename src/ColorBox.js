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
          className={`copy-overlay ${copied && "show"}`}
        />
        <div className={`copy-message ${copied && "show"}`}>
          <h1>copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
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
