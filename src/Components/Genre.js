import React, { useEffect } from "react";
import { Box, Chip } from "@mui/material";

import { getGenres } from "../Api";

function Genre({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
  setContent
}) {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
    setContent([]);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
    setContent([]);
  };

  useEffect(() => {
    getGenres(type).then((data) => {
      setGenres(data);
    });

  }, []);

  return (
    <Box >
      {selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          variant="outlined"
          onClick={() => handleAdd(genre)}
        />
      ))}
    </Box>
  );
}

export default Genre;
