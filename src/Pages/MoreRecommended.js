import { CircularProgress, Typography, Grid, Container } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getDetails, getRecommended, getTopRated, getTrending } from "../Api";
import SinglePage from "../Components/Details/SinglePage";
import { useParams } from "react-router-dom";
function MoreRecommended() {
  const styles = {
    more: {

      height: "100%",
    },
  };
  const { title,idFromDetails,type } = useParams();
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState();

  useEffect(()=>{
    getRecommended(idFromDetails,type,page).then((data)=>{
      setContent([...content, data?.results]);
      setTotalPages(data?.total_pages);
      
    })
  }, [page]);
  const nextData = () => {
      if (page > totalPages) {
        setHasMore(false);
        return;
      }
      setPage(page + 1);
  };

  return (
    <Box sx={styles.more}>
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
          {title}
        </Typography>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            {content?.map((video, i) => (
              <SinglePage content={video} />
            ))}
          </Grid>
        </Container>
      </InfiniteScroll>
    </Box>
  );
}

export default MoreRecommended;
