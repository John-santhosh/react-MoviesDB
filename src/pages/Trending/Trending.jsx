import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../compponents/SingleContent/SingleContent";
import "./Trending.css";
import CustomPagination from "../../compponents/Pagination/CustomPagination";
const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchTrending = async () => {
    setLoading(true);
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    };
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${page}`,
        options
      );
      setContent(data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);
  if (loading) {
    return <div className="custom-loader"></div>;
  }
  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content.length !== 0 &&
          content.map((item) => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.first_air_date || item.release_date}
              media_type={item.media_type}
              vote_average={item.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} page={page} />
    </div>
  );
};

export default Trending;
