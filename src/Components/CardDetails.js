import { Card, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDetails } from "../Api";

function CardDetails({ id, type }) {
  const [content, setContent] = useState([]);
  useEffect(() => {
    getDetails(id, type).then((data) => {
      setContent(data);
    });
  }, [id,type]);

  const navigate = useNavigate();
  const loadDetails = () => {
    navigate(`/details/${type}/${id}`);
  };

  const imageUrl = `https://image.tmdb.org/t/p/original/${content.poster_path}`;
  return (
    <Box
      sx={{
        transition: "transform 450ms",
        "&:hover": { cursor: "pointer", transform: "scale(1.1)" },
      }}
      onClick={loadDetails}
    >
      <Card
        sx={{ maxWidth: 320, m: 1, bgcolor: "black", position: "relative" }}
      >
        <CardMedia component="img" image={imageUrl} height="150" />
        <Typography
          variant="subtitle2"
          color="white"
          sx={{ textAlign: "center", m: 1 }}
        >
          {content.title || content.name}
        </Typography>
      </Card>
    </Box>
  );
}

export default CardDetails;
