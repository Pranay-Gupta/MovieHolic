import { CircularProgress, Typography, Grid, Container } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getGenres, getTopRated } from "../Api";
import SinglePage from "../Components/Details/SinglePage";
import { useParams } from "react-router-dom";
import useGenreId from "../hooks/useGenreId";
import Genre from "../Components/Genre";
function MoreTopRatedMovie() {
  const styles = {
    more: {
      height: "100%",
    },
  };
  const { title } = useParams();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState();
  useEffect(() => {
    getGenres("movie").then((data) => {
      setGenres(data);
    });
  }, []);
  const genreId = useGenreId(selectedGenres);

  useEffect(() => {
    getTopRated("movie", page, genreId).then((data) => {
      setContent([...content, data?.results]);
      setTotalPages(data?.total_pages);
    });
  }, [genreId, page]);
  const nextData = () => {
    if (page > totalPages) {
      setHasMore(false);
      return;
    }
    setPage(page + 1);
  };

  return (
    <Box sx={styles.more}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: "10vh",
        }}
      >
        <Typography variant="body1" color="white" sx={{ mr: 2 }}>
          Filter By:
        </Typography>
        <Genre
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          type="movie"
          setPage={setPage}
          setContent={setContent}
        />
      </Box>
      <InfiniteScroll
        dataLength={content.length} //This is important field to render the next data
        next={nextData}
        hasMore={hasMore}
        style={{overflow:'hidden'}}
        loader={
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress size={80} />
          </Box>
        }
      >
        <Typography
          variant="h4"
          color="white"
          sx={{ mt: "5vh", mb: "25px", textAlign: "center" }}
        >
          {title}
        </Typography>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            {content?.map((video) => (
              <SinglePage content={video} key={video.id} type="movie" />
            ))}
          </Grid>
        </Container>
      </InfiniteScroll>
    </Box>
  );
}

export default MoreTopRatedMovie;
