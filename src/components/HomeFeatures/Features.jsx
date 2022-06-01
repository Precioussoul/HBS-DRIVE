import React from "react";
import Feature from "./Feature";
import "./feature.scss";

const Features = ({ mode }) => {
  return (
    <div id="features">
      <div data-aos="fade-down" className="features-header">
        <p className="features-header-intro">Fit for you</p>
        <h3 className="features-header-greeting">
          <span className={mode}>Welcome to HbsDrive</span>
          <span className="alias">(Habsof Drive)</span>
        </h3>
        <p className="features-header-desc">
          Inside HbsDrive, we present everything you need to interact with your
          files in the cloud.
        </p>
      </div>
      <div className="features">
        <Feature
          image={"/images/folder.png"}
          name={"Managed Files"}
          description={
            "You can easily manage your files with a nice appearance."
          }
        />
        <Feature
          image={"/images/pie-chart.png"}
          name={"Structured"}
          description={
            "HBS drive is designed to put things in correct order for you."
          }
        />

        <Feature
          image={"/images/share.png"}
          name={"Share"}
          description={
            "Send files to anyone, even if they don't have HbsDrive account."
          }
        />
        <Feature
          image={"/images/data-protection.png"}
          name={"Secured"}
          description={
            "Keep your file safe with multiple layer of protections and virus-free."
          }
        />
      </div>
    </div>
  );
};

export default Features;
