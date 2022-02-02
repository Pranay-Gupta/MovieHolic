import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCast, getDetails, getRecommended } from "../Api";
import CarouselDetails from "../Components/CarouselDetails";
import Cast from "../Components/Cast";
import Trending from "../Components/Home/Trending";
import MoreBanner from "../Components/MoreBanner";
function Details() {
  const styles = {
    details: {
      bgcolor: "#010c16",
      width: "100%",
      height: "100%",
      position: "relative",
      top: "70vh",
      left: "0",
    },
  };
  const { type, id } = useParams();
  const [content, setContent] = useState({});
  useEffect(() => {
    getDetails(id, type).then((data) => {
      setContent(data);
    });
  }, [id,type]);
  const [recommended, setRecommended] = useState([]);
  useEffect(() => {
    getRecommended(id, type, 1).then((data) => {
      setRecommended(data?.results);
    });
  }, [id,type]);

  return (
    <>
      <MoreBanner id={id} type={type} content={content} />
      <Box sx={styles.details}>
        {recommended.length !== 0 && (
          <CarouselDetails
            title="Recommended"
            content={recommended}
            type={type}
            idFromDetails={id}
          />
        )}
       
        <Cast id={id} type={type} />
      </Box>
    </>
  );
}

export default Details;
