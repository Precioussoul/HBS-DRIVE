import React from "react";

const SectionTwo = ({ mode }) => {
  return (
    <div className="sectionTwo">
      <div data-aos="fade-right" className="text-showcase">
        <span className="text-showcase-intro">Compatible with all devices</span>
        <h2 className={`text-showcase-title ${mode}`}>
          Secured and Structured new home for your all files
        </h2>
        <p className="text-showcase-desc">
          HbsDrive Clean and Beautify your new home for your files with great
          care, easy access to important files on time with a structured design,
          Compatible with all devices.
        </p>
      </div>
      <div data-aos="fade-left" className="images-showcase secTwo">
        {mode === "dark" ? (
          <img src="images/hbs-desk-dark.png" alt="hbs drive desktop view" />
        ) : (
          <img src="images/hbs-desk-white.png" alt="hbs drive desktop view" />
        )}
      </div>
    </div>
  );
};

export default SectionTwo;
