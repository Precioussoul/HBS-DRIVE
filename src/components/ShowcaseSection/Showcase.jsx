import React from "react";
import Section from "./Section";
import SectionTwo from "./SectionTwo";

const Showcase = ({ mode }) => {
  return (
    <div className="showcase">
      <Section mode={mode} />
      <SectionTwo mode={mode} />
    </div>
  );
};

export default Showcase;
