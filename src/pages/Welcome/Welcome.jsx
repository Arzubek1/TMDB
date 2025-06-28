import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import "./Welcome.scss";
import { useNavigate } from "react-router-dom";
import { keyAPI } from "$/assets/API-key";
import axios from "axios";
import Card from "$/components/Card/Card";
import { AnimatePresence, motion } from "framer-motion";
import MovieContext from "$/Contex";
import classNames from "classnames";
import translations from "$/Translation/Translation";

const Welcome = () => {
  //hooks
  const [search, setSearch] = useState("");
  const navigator = useNavigate();
  const [sugBtn, setSugBtn] = useState(false);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const scrollRef = useRef(null);
  const [randomBG, setRandomBG] = useState([]);
  const { dark, setDark, language } = useContext(MovieContext);

  //APILER
  const popularAPI = `https://api.themoviedb.org/3/movie/popular?api_key=${keyAPI}&language=en-US&page=7`;
  const topRatedAPI = `https://api.themoviedb.org/3/movie/top_rated?api_key=${keyAPI}&language=en-US&page=7`;

  function toSearch() {
    navigator(`search/:${search}`);
  }

  async function getPopular() {
    try {
      let res = await axios.get(popularAPI);
      let { results } = res.data;
      setPopular(results);
    } catch (err) {
      console.error(err, "popular-welcome load error");
    }
  }

  async function getTopRated() {
    try {
      let res = await axios.get(topRatedAPI);
      let { results } = res.data;
      setTopRated(results);
    } catch (error) {
      console.error(error, "TopRated load error");
    }
  }

  function scrollEnd() {
    const el = scrollRef.current;
    const isEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
    setIsEnd(isEnd);
  }

  async function randomBackground() {
    try {
      let res = await axios.get(topRatedAPI);
      let { results } = res.data;
      let getBackdrop = results.map((el) => el.backdrop_path);
      setRandomBG(getBackdrop);
    } catch (err) {
      console.error(err);
    }
  }
  const randomIndex = useMemo(() => {
    return Math.floor(Math.random() * randomBG.length);
  }, [randomBG]);

  const bgImage =
    randomBG.length > 0
      ? `https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces/${randomBG[randomIndex]}`
      : "";

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", scrollEnd);
      scrollEnd();
    }
    return () => el?.removeEventListener("scroll", scrollEnd);
  }, [popular, topRated]);

  useEffect(() => {
    getPopular();
    getTopRated();
    randomBackground();
  }, []);

  return (
    <>
      <div
        id="welcome"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="welcome-bg"></div>
        <div className="container">
          <div className="welcome">
            <h1>{translations.title[language]}</h1>
            <h2>{translations.subtitle[language]}</h2>
            <div className="welcome--form">
              <input
                type="text"
                placeholder={translations.placeholder[language]}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={toSearch}>{translations.welcomeSearchBtn[language]}</button>
            </div>
          </div>
        </div>
      </div>
      <div className="suggest--films">
        <div className="suggest--films__title">
          <h2 style={{color: dark ? "#f5f5f5" : "#1c1c1c"}}>{translations.trending[language]}</h2>
          <div className="suggest--films__title--btns" style={{border: dark && "2px solid white"}}>
<button
  onClick={() => setSugBtn(false)}
  className={classNames("btn", {
    "btn--active": !sugBtn,
    "btn--dark": dark,
  })}
  style={{color: dark ? (sugBtn ? "rgba(255, 255, 255, 0.694)": "white") : (!sugBtn ? "white" : "black")}}
>
  {translations.welcomeBtn1[language]}
</button>

<button
  onClick={() => setSugBtn(true)}
  className={classNames("btn", {
    "btn--active": sugBtn,
    "btn--dark": dark,
  })}
  style={{color: dark ? (!sugBtn ? "rgba(255, 255, 255, 0.694)": "white") : (sugBtn ? "white" : "black")}}
>
  {translations.welcomeBtn2[language]}
</button>



          </div>
        </div>
        <div className="suggest--films__wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={sugBtn ? "topRated" : "popular"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="suggest--films__wrapper--block"
              ref={scrollRef}
            >
              {(sugBtn ? topRated : popular).map((el) => (
                <Card item={el} key={el.id} />
              ))}
            </motion.div>
          </AnimatePresence>
          <div
            className="fade-right"
            style={{ opacity: isEnd ? "0" : "1" }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
