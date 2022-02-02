import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Banner from "../Components/Banner";
import { getTopRated, getTrending, getUpComing } from "../Api";
import CarouselDetails from "../Components/CarouselDetails";
import Trending from "../Components/Home/Trending";
import TopSeries from "../Components/Home/TopSeries";
import TopMovies from "../Components/Home/TopMovies";
import UpComing from "../Components/Home/UpComing";

function Home({ isLoading, setIsLoading }) {

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
      <Banner  />
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
