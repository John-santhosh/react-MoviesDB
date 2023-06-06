import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import TvIcon from "@mui/icons-material/Tv";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
export default function FixedBottomNavigation() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    // ref.current.ownerDocument.body.scrollTop = 0;
    if (value === 0) {
      navigate("/");
    }
    if (value === 1) {
      navigate("/Movies");
    }
    if (value === 2) {
      navigate("/Series");
    }
    if (value === 3) {
      navigate("/search");
    }
  }, [value]);
  const style = { color: value === 0 ? "#fff" : "#c6f300" };
  return (
    <Box sx={{ pb: 4, backgroundColor: "#2d3131a" }} ref={ref}>
      <CssBaseline />

      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: "100",
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{ background: "#5d626e" }}
        >
          {/* <Link to="/" > */}
          <BottomNavigationAction
            style={{ color: value === 0 ? "#c6f300" : "#fff" }}
            label="Trending"
            icon={<WhatshotIcon />}
          />
          {/* </Link> */}
          <BottomNavigationAction
            style={{ color: value === 1 ? "#c6f300" : "#fff" }}
            label="Movies"
            icon={<MovieIcon />}
          />
          <BottomNavigationAction
            style={{ color: value === 2 ? "#c6f300" : "#fff" }}
            label="TV series"
            icon={<TvIcon />}
          />
          <BottomNavigationAction
            style={{ color: value === 3 ? "#c6f300" : "#fff" }}
            label="Search"
            icon={<SearchIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
