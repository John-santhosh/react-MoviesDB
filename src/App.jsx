import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./compponents/Header/Header";
import FixedBottomNavigation from "./compponents/MainNav";
import { Container } from "@mui/material";
import Trending from "./pages/Trending/Trending";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Search from "./pages/Search/Search";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" element={<Trending />}></Route>
            <Route path="/movies" element={<Movies />}></Route>
            <Route path="/series" element={<Series />}></Route>
            <Route path="/search" element={<Search />}></Route>
          </Routes>
        </Container>
      </div>
      <FixedBottomNavigation></FixedBottomNavigation>
    </BrowserRouter>
  );
}

export default App;
