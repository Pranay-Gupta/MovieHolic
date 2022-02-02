import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Banner from "../Components/Banner";
import { getGenres, getLatestMovies, getMovies, getTopRated } from "../Api";
import useGenreId from "../hooks/useGenreId";
import MoreTopRatedMovie from "./MoreTopRatedMovie";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress, Container, Grid } from "@mui/material";
import SinglePage from "../Components/Details/SinglePage";

function Movie() {
  const styles = {
    movie: {
      bgcolor: "#010c16",
      width: "100%",
      height: "100%",
      position: "relative",
      top: "0",
      left: "0",
    },
  };

  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    getTopRated('movie',page).then((data) => {
      setContent([...content, data?.results]);
      setTotalPages(data?.total_pages);
    });
  }, [page]);
  const nextData = () => {

      if (page > totalPages) {
        setHasMore(false);
        return;
      }
      setPage(page + 1);

  };
  const genreId = useGenreId(genres);
  useEffect(() => {
    getMovies(12).then((data) => {
      setMovies(data);
      console.log({ movies });
    });
  }, []);
  useEffect(() => {
    getGenres("movie").then((data) => {
      setGenres(data);
    });
  }, []);

  return (
    <>

      <Box sx={styles.movie}>
      <InfiniteScroll
        dataLength={content.length} //This is important field to render the next data
        next={nextData}
        hasMore={hasMore}
        loader={
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress size={80} />
          </Box>
        }
      >
        <Typography
          variant="h4"
          color="white"
          sx={{ mt: "10vh", mb: "25px", textAlign: "center" }}
        >
          Movie
        </Typography>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            {content?.map((video) => (
              <SinglePage content={video} key={video.id} type='movie'/>
            ))}
          </Grid>
        </Container>
      </InfiniteScroll>
      </Box>
    </>
  );
}

export default Movie;
