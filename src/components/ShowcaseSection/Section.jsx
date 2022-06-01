import React from "react";
import "./showcase.scss";

const Section = ({ mode }) => {
  return (
    <div className="sectionOne">
      <div data-aos="fade-down" className="images-showcase">
        {mode === "light" ? (
          <img src="images/hbs-mob.png" alt="hbs drive login" />
        ) : (
          <img src="images/hbs-login-dark.png" alt="hbs drive login" />
        )}
      </div>
      <div data-aos="fade-up" className="text-showcase">
        <span className="text-showcase-intro">Best features</span>
        <h2 className={`text-showcase-title ${mode}`}>
          Backup and don't worry about security
        </h2>
        <p className="text-showcase-desc">
          You can save and backup your files without worrying about security or
          intruder accessing your files. HbsDrive is secured with multiple layer
          of data protection. You are in control of everything here.
        </p>
      </div>
    </div>
  );
};

export default Section;
