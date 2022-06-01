import React, { useContext, useEffect } from "react";
import "./home.scss";
import Navbar from "../../components/HomeNavbar/Navbar";
import HeroSection from "../../components/HomeHero/HeroSection";
import Features from "../../components/HomeFeatures/Features";
import Showcase from "../../components/ShowcaseSection/Showcase";
import CTA from "../../components/CallToAction/CTA";
import Footer from "../../components/Footer/Footer";
import { ThemeContext } from "../../App";
import "aos/dist/aos.css";
import AOS from "aos";

function Home() {
  const { mode, setMode } = useContext(ThemeContext);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div className={`main ${mode}`}>
      <div className="home-container">
        <Navbar mode={mode} setMode={setMode} />
        <HeroSection mode={mode} />
        <Features mode={mode} />
        <Showcase mode={mode} />
        <CTA mode={mode} />
        <Footer mode={mode} setMode={setMode} />
      </div>
    </div>
  );
}

export default Home;
