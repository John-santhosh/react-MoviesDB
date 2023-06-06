import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture, options } from "../../config/config";

import "./Carousel.css";
const handleDragStart = (e) => e.preventDefault();

const Gallery = ({ media_type, id }) => {
  const [credits, setCredits] = useState();
  const [loading, setLoading] = useState(true);
  // const
  const fetchCredits = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/credits`,
        options
      );
      console.log(data);
      setCredits(data.cast);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCredits();
  }, []);
  if (loading) {
    return <div className="custom-loader"></div>;
  }

  const items = credits.map((c) => {
    return (
      <div key={c.id} className="carouselItem">
        <img
          src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
          alt={c?.name}
          onDragStart={handleDragStart}
          className="carouselItem__img"
        />
        <b className="carouselItem__txt">{c?.name}</b>
      </div>
    );
  });
  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };
  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  );
};

export default Gallery;
