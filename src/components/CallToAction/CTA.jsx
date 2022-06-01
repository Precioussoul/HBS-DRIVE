import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./cta.scss";

const CTA = ({ mode }) => {
  const navigate = useNavigate();
  return (
    <Box data-aos="fade-up" className="callToAction">
      <div className={`cta ${mode}`}>
        <Button
          variant="contained"
          disableElevation
          sx={{
            padding: "15px 30px",
            borderRadius: 20,
          }}
          onClick={() => navigate("/signup")}
        >
          Sign up for free
        </Button>
      </div>
    </Box>
  );
};

export default CTA;
