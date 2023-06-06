import React, { useEffect, useState } from "react";
import Genres from "../../compponents/Genres";
import { useGenres } from "../../hooks/useGenre";
import axios from "axios";
import SingleContent from "../../compponents/SingleContent/SingleContent";
import CustomPagination from "../../compponents/Pagination/CustomPagination";

const Series = () => {
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);
  const [content, setContent] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  const genereForURL = useGenres(selectedGenres);
  // console.log(genereForURL);
  const fetchMovies = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    };

    try {
      const { data } = await axios(
        `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genereForURL}`,
        options
      );
      setNumOfPages(data.total_pages);
      setContent(data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, [page, genereForURL]);

  return (
    <div>
      <span className="pageTitle">Discover Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        page={page}
        setPage={setPage}
      />
      {loading ? (
        <div className="custom-loader"></div>
      ) : (
        <>
          {" "}
          <div className="trending">
            {content.length === 0 ? (
              <div className="notFound">
                <h2>Sorry! No Movies found</h2>
              </div>
            ) : (
              content.map((item) => (
                <SingleContent
                  key={item.id}
                  id={item.id}
                  poster={item.poster_path}
                  title={item.title || item.name}
                  date={item.first_air_date || item.release_date}
                  media_type="tv"
                  vote_average={item.vote_average}
                />
              ))
            )}
          </div>
          {numOfPages > 1 && (
            <CustomPagination numOfPages={200} setPage={setPage} page={page} />
          )}
        </>
      )}
    </div>
  );
};

export default Series;
