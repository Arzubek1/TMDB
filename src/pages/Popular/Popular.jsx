import React, { useContext, useEffect, useState } from "react";
import "./Popular.scss";
import axios from "axios";
import { keyAPI } from "$/assets/API-key";
import Card from "$/components/Card/Card";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import MovieContext from "$/Contex";
import { useNavigate } from "react-router-dom";
import translations from "$/Translation/Translation";

const Popular = () => {
  //API
  const [allfilms, setAllFilms] = useState(1);
  const { language } = useContext(MovieContext);
  const popularAPI = `https://api.themoviedb.org/3/movie/popular?api_key=${keyAPI}&language=${language}&page=${allfilms}`;

  //HOOKS
  const [popular, setPopular] = useState([]);
  const { dark, setDark } = useContext(MovieContext);
  const navigate = useNavigate();
  const [recommendedIndex, setRecommendedIndex] = useState(0);

  const getPopular = async () => {
    let res = await axios.get(popularAPI);
    let { results } = res.data;
    setPopular(results);
    console.log(results);
  };

  useEffect(() => {
    getPopular();
  }, [allfilms, language]);

  const recommendedFilms = popular.slice(7, 17);

  useEffect(() => {
    const interval = setInterval(() => {
      setRecommendedIndex((prev) => (prev + 1) % recommendedFilms.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [recommendedFilms]);

  return (
    <div id="popular">
      <div className="container">
        <h1 style={{ color: dark && "white" }}>
          {translations.category[language]}
        </h1>
        <div className="popular-title">
          <div className="janry">
            <h3 style={{ color: dark && "white" }}>
              {translations.genresTitle[language]}
            </h3>
            <div className="janry--block">
              {translations.genres[language].map((genre, index) => (
                <h4 key={index} style={{ color: dark && "white" }}>
                  {genre}
                </h4>
              ))}
            </div>
          </div>
          <div className="recommended--films">
            <h1 style={{ color: dark && "white" }}>
              {translations.recommended[language]}
            </h1>
            <div className="recommended--films__blocks">
              {recommendedFilms.length && (
                <div
                  className="recommended--films__blocks--block"
                  onClick={() =>
                    navigate(
                      `/movieDetails/${recommendedFilms[recommendedIndex].id}`
                    )
                  }
                >
                  <div className="films--img">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${recommendedFilms[recommendedIndex].poster_path}`}
                      alt={recommendedFilms[recommendedIndex].title}
                    />
                    <div className="films--img__bg"></div>
                  </div>
                  <h2>{recommendedFilms[recommendedIndex].title}</h2>
                  <h3>({recommendedFilms[recommendedIndex].release_date})</h3>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="popular">
          <div className="popular--blocks">
            {popular.map((item) => (
              <Card item={item} key={item.id} />
            ))}
          </div>
          <div className="pagination">
            <button
              onClick={() =>
                setAllFilms(allfilms > 10 ? allfilms - 10 : allfilms)
              }
              className="double1"
            >
              <MdOutlineKeyboardDoubleArrowLeft />
              <span>-10</span>
            </button>
            <button
              onClick={() =>
                setAllFilms(allfilms > 1 ? allfilms - 1 : allfilms)
              }
            >
              <IoIosArrowBack />
            </button>
            <h3 style={{ color: dark && "#e19608" }}>
              {allfilms}...{" "}
              <span style={{ color: dark && "#e19608" }}>500</span>
            </h3>
            <button onClick={() => setAllFilms(allfilms + 1)}>
              <IoIosArrowForward />
            </button>
            <button
              onClick={() => setAllFilms(allfilms + 10)}
              className="double2"
            >
              <span>+10</span>
              <MdOutlineKeyboardDoubleArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popular;
