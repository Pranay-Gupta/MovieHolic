import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, CircularProgress, Grid, InputBase, Tabs } from "@mui/material";
import Tab from "@mui/material/Tab";

import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { getSearch } from "../Api";
import InfiniteScroll from "react-infinite-scroll-component";
import SinglePage from "../Components/Details/SinglePage";

function Search() {
  const [search, setSearch] = useState("");
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const [type, setType] = useState("movie");
  const handleForm = (e) => {
    e.preventDefault();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setContent([]);
    setPage(1);
    setSearch(e.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPage(1);
    setType(!value ? "tv" : "movie");
    setContent([]);
  };
  const fetchData = () => {
    getSearch(type, search, page).then((data) => {
      setContent([...content, data?.results]);
      setTotalPages(data?.total_pages);
    });
  };
  useEffect(() => {
    const abortCont = new AbortController();
    fetchData();
    return () => abortCont.abort();
  }, [search, value, page]);
  const nextData = () => {
    if (page > totalPages) {
      setHasMore(false);
      return;
    }
    setPage(page + 1);
  };

  const handleClick = () => {
    setContent([]);
    setPage(1);
    fetchData();
  };

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          mt: "10vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" color="white">
          Unlimited movies, TV shows and more.
        </Typography>

        <form
          style={{
            marginTop: "5vh",
            backgroundColor: "white",
            display: "flex",
            width: "60%",
          }}
          variant="standard"
          onSubmit={(e) => handleForm(e)}
        >
          <InputBase
            placeholder="Search for movies, tv shows and more..."
            sx={{ p: 1.5, flex: 1 }}
            onChange={(e) => handleSubmit(e)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "15%", borderRadius: 0 }}
            onClick={handleClick}
          >
            <SearchIcon />
          </Button>
        </form>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            sx={{ mt: 5 }}
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Movies" value={0} sx={{ color: "white" }} />
            <Tab label="TV Shows" value={1} sx={{ color: "white" }} />
          </Tabs>
        </Box>
      </Container>
      {search && (
        <InfiniteScroll
          dataLength={content.length}
          style={{ marginTop: "5vh", overflow: "hidden" }}
          next={nextData}
          hasMore={hasMore}
          loader={
            <Box sx={{ display: "flex", justifyContent: "center", mt: "5vh" }}>
              <CircularProgress size={80} />
            </Box>
          }
        >
          <Container maxWidth="xl">
            <Grid container spacing={2}>
              {content?.map((video) => (
                <SinglePage content={video} key={video?.id} type={type} />
              ))}
            </Grid>
          </Container>
        </InfiniteScroll>
      )}
    </>
  );
}

export default Search;
