import { keyAPI } from "$/assets/API-key";
import "./Search.scss";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../Card/Card";
import MovieContext from "$/Contex";

const Search = () => {
  const { searchName } = useParams();
  const [movie, setMovie] = useState([]);

  async function getSearchName(key) {
    let getAPI = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchName}`
    );
    let { results } = getAPI.data;
    setMovie(results);
  }

  useEffect(() => {
    getSearchName(keyAPI);
  }, [searchName]);
  return (
    <div id="search">
      <div className="container">
        <h2>
          Резултать поиска <span>{searchName}</span>
        </h2>
        <div className="search">
          {movie.length > 0 ? (
            movie.map((el) => <Card item={el} key={el.id} />)
          ) : (
            <p>
              Ничего не найдено по запросу: <strong>{searchName}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
