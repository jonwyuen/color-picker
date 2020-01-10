import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./ColorBox.css";

const ColorBox = ({ background, name }) => {
  const [copied, setCopied] = useState(false);
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
          <p>{background}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span>{name}</span>
          </div>
          <button className="copy-button">Copy</button>
        </div>
        <span className="see-more">MORE</span>
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;
