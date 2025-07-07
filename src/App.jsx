import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Welcome from "./pages/Welcome/Welcome";
import Popular from "./pages/Popular/Popular";
import Search from "./components/Search/Search";
import TopRated from "./pages/TopRated/TopRated";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import ActorsDetails from "./components/ActorsDetails/ActorsDetails";
import { useContext } from "react";
import MovieContext from "./Contex";
import { color } from "framer-motion";

function App() {
  const { dark, setDark } = useContext(MovieContext);
  let routes = [
    {
      id: 1,
      link: "/",
      page: <Welcome />,
    },
    {
      id: 2,
      link: "/popular",
      page: <Popular />,
    },
    {
      id: 3,
      link: "/search/:searchName",
      page: <Search />,
    },
    {
      id: 4,
      link: "/topRated",
      page: <TopRated />,
    },
    {
      id: 5,
      link: "/movieDetails/:movieid",
      page: <MovieDetails />,
    },
    {
      id: 6,
      link: "/actorsDetails/:actorsID",
      page: <ActorsDetails />,
    },
  ];

  return (
    <div
      style={{
        background: dark ? "rgb(1, 1, 55)" : "#f5f5f5",
        minHeight: "100vh",
        transition: "background 0.4s ease",
      }}
    >
      <Header />
      <Routes>
        {routes.map((el) => (
          <Route path={el.link} element={el.page} key={el.id} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
