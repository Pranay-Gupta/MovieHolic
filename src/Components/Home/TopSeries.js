import React, { useEffect, useState } from "react";
import { getTopRated } from "../../Api";
import CarouselDetails from "../CarouselDetails";

function TopSeries() {
  const [topTv, setTopTv] = useState([]);
  useEffect(() => {
    getTopRated("tv",1).then((data) => {
      setTopTv(data?.results);
    });
  }, []);

  return <div>
              <CarouselDetails
          title="Top Rated Series"
          content={topTv}
          type="tv"
        />
  </div>;
}

export default TopSeries;
