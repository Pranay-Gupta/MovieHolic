import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button} from "@mui/material";
import { getTrailerID, getTrending } from "../Api";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import ModalYouTube from '../Components/ModalYouTube';
import { useNavigate } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
function Banner() {
  const [content, setContent] = useState([]);
  useEffect(() => {
    getTrending(Math.floor(Math.random() * 10 + 1)).then((data) => {
      setContent(data.results[Math.floor(Math.random() * data.results.length - 1)]);
      console.log({ content });
    });
  }, []);

  const shortDetails = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const styles = {
    banner: {
      background: `url(https://image.tmdb.org/t/p/original/${content.poster_path}) center center/cover no-repeat`,

      height: "120vh",
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
        backgroundImage:
          "linear-gradient(120deg,rgba(0,0,0,.8) 0,rgba(0,0,0,0.3) 60%,rgba(0,0,0,.8) 100%)",
          // "linear-gradient(120deg,#f50000,#00b1f5 60%,rgba(0,0,0,.8) 100%)",
        opacity: 0.7,
        zIndex: -1,
      },
    },

    details: {
      position: "relative",
      top: "25vh",
      left: "10vw",
      width: "35vw",
      height: "50vh",
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
    getTrailerID(content.id, content.media_type).then((data) => {
      setTrailerId(data);
      
    });
  });

  const [openModal, setOpenModal] = useState(false);
  const handleClick = () => {
    setOpenModal(true);
    // window.open(`https://www.youtube.com/watch?v=${trailerId}`, "_blank");
  };
const navigate = useNavigate();
const loadDetails = ()=>{
  navigate(`/details/${content.media_type}/${content.id}`)
};

  return (
    <Box sx={styles.banner}>
      <Box sx={styles.details}>
        <Typography variant="h2" color="white" gutterBottom>
          {content.title || content.name}
        </Typography>
        <Typography variant="h6" color="white" gutterBottom>
          {shortDetails(content?.overview, 350)}
        </Typography>
        <Box display="flex">
          <Button variant="contained" sx={styles.button} onClick={handleClick}>
            <PlayCircleFilledIcon color="inherit" />
            <Typography variant="subtitle1" color="white" sx={{ mx: 1 }}>
              Play
            </Typography>
          </Button>
          <Button variant="outlined" color="primary" sx={styles.button} onClick={loadDetails}>
           <InfoIcon/>
            <Typography variant="subtitle1" color="white" sx={{ mx: 1 }}>
              Info
            </Typography>
          </Button>
            {openModal && trailerId && <ModalYouTube open={openModal} setOpen={setOpenModal} trailerId={trailerId}/> }
        </Box>
      </Box>
    </Box>
  );
}

export default Banner;
