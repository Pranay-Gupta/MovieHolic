import React from "react";
import { Box } from "@mui/system";
import Banner from "../Components/Banner";
import Trending from "../Components/Home/Trending";
import TopSeries from "../Components/Home/TopSeries";
import TopMovies from "../Components/Home/TopMovies";
import UpComing from "../Components/Home/UpComing";

function Home() {
  const styles = {
    home: {
      bgcolor: "#010c16",
      width: "100%",
      height: "100%",
      position: "relative",
      top: "80vh",
      left: "0",
    },
  };

  return (
    <>
      <Banner />
      <Box sx={styles.home}>
        <Trending />
        <TopMovies />
        <TopSeries />
        <UpComing />
      </Box>
    </>
  );
}

export default Home;
