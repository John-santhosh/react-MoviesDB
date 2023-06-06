import axios from "axios";
import { useEffect } from "react";
import { options } from "../config/config";
import { Chip } from "@mui/material";
const Genres = ({
  type,
  selectedGenres,
  genres,
  setGenres,
  setSelectedGenres,
  page,
  setPage,
}) => {
  // const {set} = useGenres();

  const fetchGenres = async () => {
    try {
      const { data } = await axios(
        `https://api.themoviedb.org/3/genre/${type}/list?language=en`,
        options
      );
      setGenres(data.genres);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    const newGenre = genres.filter((item) => item.id !== genre.id);
    setGenres(newGenre);
    setPage(1);

    // console.log(a);
    // useGenres(selectedGenres)
  };

  const handleRemove = (genre) => {
    const newGenre = selectedGenres.filter((item) => item.id !== genre.id);
    setSelectedGenres(newGenre);
    setGenres([...genres, genre]);
    setPage(1);
  };
  useEffect(() => {
    fetchGenres();
  }, []);
  return (
    <div style={{ margin: "1rem 0" }}>
      {selectedGenres.length !== 0 &&
        selectedGenres.map((item) => {
          return (
            <Chip
              key={item.id}
              label={item.name}
              clickable
              size="small"
              color="primary"
              onDelete={() => handleRemove(item)}
            />
          );
        })}
      {genres.length !== 0 &&
        genres.map((item) => {
          return (
            <Chip
              key={item.id}
              label={item.name}
              clickable
              size="small"
              onClick={() => handleAdd(item)}
            />
          );
        })}
    </div>
  );
};

export default Genres;
