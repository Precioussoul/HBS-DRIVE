import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./hero.scss";

const HeroSection = ({ mode }) => {
  const navigate = useNavigate();

  return (
    <div className="hero-section" id="about">
      <div data-aos="fade-up" className="hero-intro">
        <h1 className={`hero-title ${mode}`}>
          Secured{" "}
          <span className="hero-title-child">
            cloud storage for all your files
          </span>
        </h1>
        <p className="hero-subtitle">
          A comfortable way to have access to your files on any device and from
          anywhere for free.
        </p>

        <Button
          variant="contained"
          disableElevation
          sx={{
            padding: "15px 30px",
            borderRadius: 20,
            marginTop: 5,
            marginLeft: 1.5,
          }}
          onClick={() => navigate("/signup")}
        >
          Try for free
        </Button>
      </div>
      <div data-aos="zoom-in" className="hero-image">
        {mode === "light" ? (
          <img src="/images/hbs-mob-app.png" className="app-img" alt="" />
        ) : (
          <img src="/images/hbs-mob-dark.png" className="app-img" alt="" />
        )}
        <img src="/images/image.png" className={`img abs ${mode} abs-1`} />
        <img src="/images/mp3.png" className={`img abs ${mode} abs-2`} />
        <img src="/images/docs.png" className={`img abs ${mode} abs-4`} />
        <img src="/images/zip.png" className={`img abs ${mode} abs-3`} />
      </div>
    </div>
  );
};

export default HeroSection;
