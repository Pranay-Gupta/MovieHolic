import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Banner from "../Components/Banner";

function Tv() {
  const styles = {
    tv: {
      bgcolor: "black",
      width: "100%",
      height: "100%",
      position: "relative",
      top:'80vh',
      left: "0",
    },
  };
  return (
    <>
    <Banner/>
    <Box sx={styles.tv}>
      <Typography variant="h3" color="white">
        Tv
      </Typography>
    </Box>
    </>
  );
}

export default Tv;
