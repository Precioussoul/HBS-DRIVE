import {
  Facebook,
  GitHub,
  Language,
  LinkedIn,
  Twitter,
} from "@mui/icons-material";
import { Box, Divider, Modal, Switch } from "@mui/material";
import React from "react";
import "./Footer.scss";

export default function Footer({ mode, setMode }) {
  return (
    <div id="contact">
      <div className="footer">
        <ul className={`footer-left-list ${mode}`}>
          <li>
            <a href="/">HbsDrive</a>
          </li>
          <li className="support-me">
            <a href="https://habsof.netlify.app/">Creator</a>
          </li>
          <li>
            <a href="mailto:habsoff@gmail.com">Contact Us</a>
          </li>
        </ul>
        <ul className="footer-right-social">
          <li>
            <a href="https://web.facebook.com/profile.php?id=100065549805843">
              <Facebook className={`footer-icon ${mode}`} />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/sofiyullah_dev">
              <Twitter className={`footer-icon ${mode}`} />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/sofiyullah-abdullah/">
              {" "}
              <LinkedIn className={`footer-icon ${mode}`} />
            </a>
          </li>
          <li>
            <a href="https://github.com/Precioussoul">
              {" "}
              <GitHub className={`footer-icon ${mode}`} />
            </a>
          </li>
        </ul>
      </div>
      <Divider />
      <div className="copyright">
        <p className="cpy-year">
          Copyright @ {new Date().getFullYear()}. All right reserved.
        </p>
        <p className="creator">
          Built with 💖💪 by{" "}
          <a
            href="https://www.linkedin.com/in/sofiyullah-abdullah/"
            style={{ fontWeight: "bold" }}
          >
            Sofiyullah Abdullah
          </a>
        </p>
        <ul className="footer-left-list copy">
          <li className="footer-item-icon">
            <Language />
            English
          </li>
          <li className="footer-item-icon">
            <Switch
              onChange={() => setMode(mode === "light" ? "dark" : "light")}
              checked={mode === "dark" ? true : false}
            />
            <p>{mode === "dark" ? "Dark Mode" : "Light Mode"}</p>
          </li>
        </ul>
      </div>

      <Modal>
        <Box>
          <p>Support Creator</p>
        </Box>
      </Modal>
    </div>
  );
}
