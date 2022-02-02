import React, { useEffect } from "react";
import { Button, Container, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AliceCarousel from "react-alice-carousel";
import CardDetails from "./CardDetails";
import { useNavigate } from "react-router-dom";

function CarouselDetails({ title, content, type, idFromDetails }) {
  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 4,
    },
    1024: {
      items: 6,
    },
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    if (title === "Trending") navigate(`/${title}/mTrending`);
    else if (title === "Top Rated Movies") navigate(`/${title}/mTopRatedMovie`);
    else if (title === "Top Rated Series")
      navigate(`/${title}/mTopRatedSeries`);
    else if (title === "Upcoming Movies") navigate(`/${title}/mUpcomingMovie`);
    else if (title === "Recommended")
      navigate(`/${title}/${idFromDetails}/${type}/mRecommended`);
  };
  return (
    <>
      <Container maxWidth="xl" sx={{ py: "3em" }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4" color="white" gutterBottom>
            {title}
          </Typography>

          <Button
            color="primary"
            size="small"
            sx={{ p: 0 }}
            onClick={handleNavigate}
          >
            <Typography variant="button" color="primary">
              {" "}
              See More
            </Typography>
          </Button>
        </Box>

        <AliceCarousel
          mouseTracking
          infinite
          responsive={responsive}
          items={content?.map((video) => (
            <CardDetails
              id={video.id}
              type={video.media_type ? video.media_type : type}
              key={video.id}
            />
          ))}
          animationDuration={5000}
          autoPlay
          disableDotsControls
          keyboardNavigation={true}
          disableButtonsControls

        />
      </Container>
    </>
  );
}

export default CarouselDetails;
