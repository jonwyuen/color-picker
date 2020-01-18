import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js";
import "./ColorBox.css";

const ColorBox = ({ background, name, id, paletteId, showLink }) => {
  const [copied, setCopied] = useState(false);
  const isDarkColor = chroma(background).luminance() <= 0.08;
  const isLightColor = chroma(background).luminance() >= 0.7;

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 1500);
  }, [copied]);
  return (
    <CopyToClipboard text={background} onCopy={() => setCopied(true)}>
      <div style={{ background }} className="ColorBox">
        <div
          style={{ background }}
          className={`copy-overlay ${copied && "show"}`}
        />
        <div className={`copy-message ${copied && "show"}`}>
          <h1>copied!</h1>
          <p className={isLightColor && "dark-text"}>{background}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span className={isDarkColor && "light-text"}>{name}</span>
          </div>
          <button className={`copy-button ${isLightColor && "dark-text"}`}>
            Copy
          </button>
        </div>
        {showLink && (
          <Link
            to={`/palette/${paletteId}/${id}`}
            onClick={e => e.stopPropagation()}
          >
            <span className={`see-more ${isLightColor && "dark-text"}`}>
              MORE
            </span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;
