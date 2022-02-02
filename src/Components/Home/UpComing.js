import React, { useEffect, useState } from "react";
import { getUpComing } from "../../Api";
import CarouselDetails from "../CarouselDetails";

function UpComing() {
  const [upComing, setUpComing] = useState([]);

  useEffect(() => {
    getUpComing(1).then((data) => {
      setUpComing(data?.results);
    });
  }, []);
  return <div>
       <CarouselDetails
          title="Upcoming Movies"
          content={upComing}
          type="movie"
        />
  </div>;
}

export default UpComing;
