import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Container, Rating } from "@mui/material";
import { getCast, getTrailerID, getTrending } from "../Api";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import ModalYouTube from "../Components/ModalYouTube";
function Banner({ id, type, content }) {
  const shortDetails = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const styles = {
    banner: {
      background: `url(https://image.tmdb.org/t/p/original/${content.poster_path}) center center/cover no-repeat`,
      display: "flex",
      alignItems: "center",
      height: "70vh",
      width: "100%",
      opacity: 1,
      zIndex: 0,
      position: "absolute",
      top: 0,
      left: 0,
      "&:after": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: "linear-gradient(120deg, #000,#1769aa,#000)",
        // "linear-gradient(120deg, #000,#f44336,#1769aa,#f44336,#000)",
        opacity: 0.8,
        zIndex: -1,
      },
    },
    container: {
      display: "flex",
    },

    button: {
      position: "relative",
      my: 3,
      mr: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  const [trailerId, setTrailerId] = useState();
  useEffect(() => {
    getTrailerID(id, type).then((data) => {
      setTrailerId(data);
      console.log({content});
    });
  },[id,type]);

  const [openModal, setOpenModal] = useState(false);
  const handleClick = () => {
    setOpenModal(true);
  };
  const imageUrl = `https://image.tmdb.org/t/p/original/${content.poster_path}`;
  return (
    <Box sx={styles.banner}>
      <Container maxWidth="xl" sx={styles.container}>
        <Box>
          <img
            src={imageUrl}
            alt=""
            style={{ height: "400px", width: "320px", objectFit: "contain" }}
          />
        </Box>

        <Box sx={{ ml: "30px" }}>
          <Typography variant="h3" color="white" gutterBottom>
            {content.title || content.name}
          </Typography>
          <Box display="flex">
            <Box display="flex">
              {(content.vote_average !== 0) && (
                <Rating
                  name="read-only"
                  sx={{ outlineColor: "yellow" }}
                  value={content.vote_average / 2}
                  precision={0.5}
                  readOnly
                />
              )}
              {(content.vote_count !== 0) && (
                <Typography variant="body1" color="white" sx={{ mr: 4 }}>
                  ({content.vote_count})
                </Typography>
              )}
            </Box>
            {(content.vote_average !== 0)&&
            <Typography variant="body1" color="white" sx={{ mr: 4 }}>
              IMDB {content.vote_average}
            </Typography>}
            {content.runtime &&
            <Typography variant="body1" color="white" sx={{ mr: 4 }}>
              {Math.floor(content.runtime / 60)}h {content.runtime % 60}m
            </Typography>}

            {content.genres?.map((g) => (
              <Typography
                variant="body1"
                color="white"
                gutterBottom
                sx={{ mr: 1 }}
              >
                {g.name}
              </Typography>
            ))}
            {/* <Typography variant="body1" color="white" sx={{ mr: 4 }}>
               {content.media_type}
            </Typography> */}
         

          </Box>
          {
              type === 'movie' ?(
                <Typography variant="body1" color="white">
                  Movie
                </Typography>
              ) :(
                <Typography variant="body1" color="white">
                  Tv Series
                </Typography>
              )

            }
          <Typography variant="h6" color="white" sx={{my:3}} gutterBottom>
            <em>{content.tagline}</em>
          </Typography>
          <Typography variant="h5" color="white" gutterBottom>
            Overview
          </Typography>
          <Typography variant="body1" color="white" gutterBottom>
            {shortDetails(content?.overview, 350)}
          </Typography>
       
          <Box display="flex" sx={{mt:3}}>
            <Button
              variant="contained"
              sx={styles.button}
              onClick={handleClick}
            >
              <PlayCircleFilledIcon color="inherit" />
              <Typography variant="subtitle1" color="white" sx={{ mx: 1 }}>
                Play
              </Typography>
            </Button>
          </Box>
          {/* <Cast id={id} type={type}/> */}
        </Box>
        {openModal && trailerId && (
          <ModalYouTube
            open={openModal}
            setOpen={setOpenModal}
            trailerId={trailerId}
          />
        )}
      </Container>
        
    </Box>
  );
}

export default Banner;
