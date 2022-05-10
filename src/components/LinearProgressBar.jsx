import { Box, LinearProgress, Typography } from "@mui/material";
import { useContext } from "react";
import { FileAndFolderContext } from "../contexts/FileAndFolderContext";

export default function LinearProgressWithLabel(props) {
  const { error } = useContext(FileAndFolderContext);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "220px",
      }}
    >
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          color={error ? "inherit" : "success"}
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 10 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
