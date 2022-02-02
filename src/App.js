import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movie from "./Pages/Movie";
import Tv from "./Pages/Tv";
import Search from "./Pages/Search";
import CssBaseline from "@mui/material/CssBaseline";
import Details from "./Pages/Details";
import MoreTrending from "./Pages/MoreTrending";
import MoreTopRatedMovie from "./Pages/MoreTopRatedMovie";
import MoreTopRatedSeries from "./Pages/MoreTopRatedSeries";
import MoreUpcomingMovies from "./Pages/MoreUpcomingMovies";
import MoreRecommended from "./Pages/MoreRecommended";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home isLoading={isLoading} setIsLoading={setIsLoading}/>} exact />
          <Route path="/movie" element={<Movie />} />
          <Route path="/details/:type/:id" element={<Details/>} />
          <Route path="/tv" element={<Tv/>} />
          <Route path="/search" element={<Search />} />
          <Route path='/:title/mTrending' element={<MoreTrending/>}/>
          <Route path='/:title/mTopRatedMovie' element={<MoreTopRatedMovie/>}/>
          <Route path='/:title/mTopRatedSeries' element={<MoreTopRatedSeries/>}/>
          <Route path='/:title/mUpcomingMovie' element={<MoreUpcomingMovies/>}/>
          <Route path='/:title/:idFromDetails/:type/mRecommended' element={<MoreRecommended/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
