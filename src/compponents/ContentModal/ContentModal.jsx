import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useState } from "react";
import { img_500, options, unavailable } from "../../config/config";
import axios from "axios";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./ContentModal.css";
import Carousel from "../../compponents/Carousel/Carousel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  overflow: "auto",
  scrollbarWidth: "none !important",
  maxHeight: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  background: "#282c34",
  p: 4,
};

function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState([]);
  const [video, setVideo] = useState("");
  const [error, setError] = useState(false);
  const fetchData = async (id) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?external_source=tvdb_id`,
        options
      );
      setContent(data);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  const fetchVideo = async (id) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        options
      );
      setVideo(data?.results?.[0]?.key);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  if (error) {
    return (
      <div>
        <h2>There was an error loading!</h2>
      </div>
    );
  }

  return (
    <div>
      <div
        className="media"
        onClick={() => {
          handleOpen();
          fetchData(id);
          fetchVideo(id);
        }}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        disableScrollLock={false}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="scrollbar">
            {content && (
              <div className={"classes.paper"}>
                <div className="ContentModal">
                  <img
                    src={
                      content.poster_path
                        ? `${img_500}/${content.poster_path}`
                        : unavailable
                    }
                    alt={content.name || content.title}
                    className="ContentModal__portrait"
                  />
                  <img
                    src={
                      content.backdrop_path
                        ? `${img_500}/${content.backdrop_path}`
                        : unavailable
                    }
                    alt={content.name || content.title}
                    className="ContentModal__landscape"
                  />
                  <div className="ContentModal__about">
                    <span className="ContentModal__title">
                      {content.name || content.title} (
                      {(
                        content.first_air_date ||
                        content.release_date ||
                        "-----"
                      ).substring(0, 4)}
                      )
                    </span>
                    {content.tagline && (
                      <i className="tagline">{content.tagline}</i>
                    )}

                    <span className="ContentModal__description">
                      {content.overview}
                    </span>
                    <div>
                      <Carousel media_type={media_type} id={id} />
                    </div>
                    <Button
                      variant="contained"
                      startIcon={<YouTubeIcon />}
                      color="secondary"
                      target="__blank"
                      href={`https://www.youtube.com/watch?v=${video}`}
                    >
                      Watch the Trailer
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default ContentModal;
