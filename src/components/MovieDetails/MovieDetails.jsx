import React, { useEffect, useState } from "react";
import "./MovieDetails.scss";
import { useParams } from "react-router-dom";
import { keyAPI } from "$/assets/API-key";
import axios from "axios";
import { BsInfo } from "react-icons/bs";
import { RiMenuFold2Fill } from "react-icons/ri";
import { FaBookmark, FaCaretRight } from "react-icons/fa";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

// Import react-circular-progressbar module and styles
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoIosHeart } from "react-icons/io";
import Actors from "../Actors/Actors";

const MovieDetails = () => {
  const { movieid } = useParams();
  const [movieDtl, setMovieDtl] = useState({});

  //MovieDetails API
  const dtlAPI = `https://api.themoviedb.org/3/movie/${movieid}?api_key=${keyAPI}&language=en-US`;

  async function getMovieDetails() {
    let res = await axios.get(dtlAPI);
    let { data } = res;
    console.log(data);

    setMovieDtl(data);
  }

  const percentage = Math.round(movieDtl.vote_average * 10);
  let color = "";
  if (percentage >= 70) {
    color = "#21d07a"; // Жашыл
  } else if (percentage >= 40) {
    color = "#d2d531"; // Сары
  } else {
    color = "#db2360"; // Кызыл
  }
  
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    getMovieDetails();
  }, []);
  return (
    <>
      <div
        id="movieDetails"
        style={{
          backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces/${movieDtl.backdrop_path})`,
        }}
      >
        <div className="container">
          <div className="movieDetails">
            <div className="movieDetails--img">
              <img
                src={`https://media.themoviedb.org/t/p/w440_and_h660_face${movieDtl.poster_path}`}
                alt=""
              />
            </div>
            <div className="movieDetails--content">
              <h1>
                {movieDtl.title}{" "}
                <span>({movieDtl.release_date?.slice(0, 4)})</span>
              </h1>
              <div className="movieDetails--content__info">
                <h3>
                  <span>{movieDtl.release_date}</span> •{" "}
                  <span>{movieDtl.genres?.map((el) => el.name + "/")}</span> •{" "}
                  <span>
                    {Math.floor(movieDtl.runtime / 60)}h {movieDtl.runtime % 60}
                    min
                  </span>
                </h3>
              </div>
              <div className="rating">
                <div
                  className="rating-div"
                  style={{
                    width: 50,
                    height: 50,
                    background: "#081c22",
                    borderRadius: "50%",
                    border: "2px solid #204529",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <CircularProgressbar
                    value={Math.round(movieDtl.vote_average * 10)}
                    text={`${Math.round(movieDtl.vote_average * 10)}%`}
                    styles={buildStyles({
                      textSize: "30px",
                      textColor: "#fff",
                      pathColor: color,
                      trailColor: "#204529",
                    })}
                  />
                </div>
                <h2>Рейтинг</h2>
                <h3>
                  What's your Vibe?{" "}
                  <span>
                    <BsInfo />
                  </span>
                </h3>
              </div>
              <div className="movieDetails--content__icons">
                <Tippy content="Menu" theme="custom-theme">
                  <h2>
                    <RiMenuFold2Fill />
                  </h2>
                </Tippy>
                <Tippy content="Favorite" theme="custom-theme">
                  <h2>
                    <IoIosHeart />
                  </h2>
                </Tippy>
                <Tippy content="Save" theme="custom-theme">
                  <h2>
                    <FaBookmark />
                  </h2>
                </Tippy>
                <h3>
                  <FaCaretRight /> <span>Воспроизвести трейлер</span>
                </h3>
              </div>
              <div className="movieDetails--content__text">
                <h2>
                  <i>"{movieDtl.tagline}"</i>
                </h2>
                <h1>Обзор</h1>
                <p>{movieDtl.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Actors movieid={movieid} />
    </>
  );
};

export default MovieDetails;
