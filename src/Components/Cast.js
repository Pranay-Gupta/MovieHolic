import { Box, Card, CardMedia, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { getCast } from "../Api";

function Cast({ id, type }) {
  const [cast, setCast] = useState([]);
  useEffect(() => {
    getCast(id, type).then((data) => {
      setCast(data);
    });
  }, [id, type]);

  const items = cast.map((c) => (
    <Box
      sx={{
        transition: "transform 450ms",
      }}
    >
      <Card
        sx={{ maxWidth: 250, m: 1, bgcolor: "black", position: "relative" }}
      >
        <CardMedia
          component="img"
          image={
            c.profile_path
              ? `https://image.tmdb.org/t/p/original/${c.profile_path}`
              : "https://img.search.brave.com/082a2gQ9GyoNF_74CRa4dMhA9d__F7ND4UAXE9b5HXE/rs:fit:510:550:1/g:ce/aHR0cHM6Ly93d3cu/c3RibGF6ZXlteC5j/by51ay93cC1jb250/ZW50L3VwbG9hZHMv/MjAxNy8wMS9Oby1J/bWFnZS1BdmFpbGFi/bGUuanBn"
          }
          height="220"
        />
        <Typography
          variant="subtitle2"
          color="white"
          sx={{ textAlign: "center", m: 1 }}
        >
          {c.name}
        </Typography>
      </Card>
    </Box>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" color="white" sx={{ pt: 1 }} gutterBottom>
        Top Cast
      </Typography>
      <AliceCarousel
        mouseTracking
        responsive={responsive}
        items={items}
        animationDuration={2000}
        disableButtonsControls
      />
    </Container>
  );
}

export default Cast;
