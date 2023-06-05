import { Button, Tab, Tabs, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { options } from "../../config/config";
import Genres from "../../compponents/Genres";
import SingleContent from "../../compponents/SingleContent/SingleContent";
import CustomPagination from "../../compponents/Pagination/CustomPagination";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const fetchSearch = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${
          type ? "tv" : "movie"
        }?language=en-US&query=${searchText}&page=${page}&include_adult=false`,
        options
      );
      // console.log(data);
      setContent(data.results);
      setNumOfPages(data.total_pages);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSearch();
  }, [type]);

  if (loading) {
    return <div className="custom-loader"></div>;
  }

  return (
    <div>
      <div style={{ display: "flex", margin: "15px 0" }}>
        <TextField
          style={{ flex: 1, background: "#ffffffc3" }}
          className="searchbox"
          label="search"
          variant="filled"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <Button
          onClick={fetchSearch}
          variant="contained"
          style={{ marginLeft: 10 }}
        >
          <SearchIcon />
        </Button>
      </div>
      <Tabs
        value={type}
        indicatorColor="primary"
        textColor="primary"
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
        }}
      >
        <Tab style={{ width: "50%" }} label="Search Movies" />
        <Tab style={{ width: "50%" }} label="Search TV Series" />
      </Tabs>
      {/*  */}
      <div>
        {/* <span className="pageTitle">Discover Series</span> */}
        {/* <Genres
          type="tv"
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          page={page}
          setPage={setPage}
        /> */}
        <div className="trending">
          {content.map((item) => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.first_air_date || item.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={item.vote_average}
            />
          ))}

          {searchText &&
            content.length <= 0 &&
            (type === 0 ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
        </div>
        {numOfPages > 1 && (
          <CustomPagination
            numOfPages={numOfPages}
            setPage={setPage}
            page={page}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
