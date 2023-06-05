import { img_300, unavailable } from "../../config/config";
import ContentModal from "../ContentModal/ContentModal";
import "./SingleContent.css";
const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <div className={vote_average > 5 ? "badge" : "badge secondary"}>
        {vote_average.toFixed(1)}
      </div>
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt=""
      />
      <strong className="title">{title}</strong>

      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    </ContentModal>
  );
};

export default SingleContent;
