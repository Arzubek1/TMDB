import React, { useContext, useEffect, useState } from "react";
import "./TopRated.scss";
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

const TopRated = () => {
  const [allfilms, setAllFilms] = useState(1);
  const { dark, language } = useContext(MovieContext);
  const navigate = useNavigate();

  const topRatedAPI = `https://api.themoviedb.org/3/movie/top_rated?api_key=${keyAPI}&language=${language}&page=${allfilms}`;

  const [topRated, setTopRated] = useState([]);
  const [recommendedIndex, setRecommendedIndex] = useState(0);

  // Топ фильмдерди алуу
  async function getTopRated() {
    try {
      const res = await axios.get(topRatedAPI);
      const { results } = res.data;
      setTopRated(results);
    } catch (error) {
      console.error("TopRated load error", error);
    }
  }

  const recommendedFilms = topRated.slice(7, 17);

  // recommended carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setRecommendedIndex((prev) => (prev + 1) % recommendedFilms.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [recommendedFilms]);

  useEffect(() => {
    getTopRated();
  }, [allfilms, language]);

  return (
    <div
      id="topRated"
      style={{ background: dark ? "rgb(1, 1, 55)" : "#fff", transition: "0.3s" }}
    >
      <div className="container">
        <h1 style={{ color: dark ? "white" : "#222" }}>
          {translations.category[language]}
        </h1>

        <div className="topRated-title">
          <div className="janry">
            <h3 style={{ color: dark ? "white" : "#222" }}>
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
              {recommendedFilms.length > 0 && (
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

        <div className="topRated">
          <div className="topRated--blocks">
            {topRated.map((item) => (
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

            <h3 style={{ color: "#e19608" }}>
              {allfilms}... <span>500</span>
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

export default TopRated;
