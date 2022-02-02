import React, { useEffect, useState } from "react";
import { getTopRated } from "../../Api";
import CarouselDetails from "../CarouselDetails";

function TopMovies() {
  const [topMovie, setTopMovie] = useState([]);
  useEffect(() => {
    getTopRated("movie",1).then((data) => {
      setTopMovie(data?.results);
    });
  }, []);
  return (
    <div>
      <CarouselDetails
        title="Top Rated Movies"
        content={topMovie}
        type="movie"
      />
    </div>
  );
}

export default TopMovies;
