import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { Movie } from "@mui/icons-material";
import TvIcon from "@mui/icons-material/Tv";
import SearchIcon from "@mui/icons-material/Search";
function Header() {
 
  const styles = {
    link: {
      margin: "1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      textDecoration: "none",
      color: "white",
      width: "4rem",
      "&:hover": {
        color: "red",
      },
    },
    flexBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    iconStyle: {
      fontSize: "30px",
      transition: '0.2s ease-in',
      ':hover':{
        color: '#2196f3',
      },
    },
    activeIcon:{
      color: '#2196f3',
    },
  };

  return (
    <div>
      <AppBar
        position="fixed"
        color='transparent'
        elevation={0}
        sx={{ height: "7vh", }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" color="white">
            MovieHolic
          </Typography>
          <Box sx={styles.flexBox}>
            <Link to="/" style={styles.link}>
              <HomeIcon sx={styles.iconStyle} />
            </Link>

            <Link to="/movie" style={styles.link}>
              <Movie sx={styles.iconStyle} />
            </Link>

            <Link to="/tv" style={styles.link}>
              <TvIcon sx={styles.iconStyle} />
            </Link>

            <Link to="/search" style={styles.link }>
              <SearchIcon sx={styles.iconStyle} />
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
