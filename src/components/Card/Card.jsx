import React, { useContext } from "react";
import "./Card.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import tmdb from "../../assets/images/unnamed.png";
import MovieContext from "$/Contex";
const Card = ({ item }) => {
  const navigate = useNavigate();
  const { dark, setDark } = useContext(MovieContext);
  const percentage = Math.round(item.vote_average * 10);

  let color = "";
  if (percentage >= 70) {
    color = "#21d07a"; // Жашыл
  } else if (percentage >= 40) {
    color = "#d2d531"; // Сары
  } else {
    color = "#db2360"; // Кызыл
  }
  return (
    <div
      className="card"
      onClick={() => navigate(`/movieDetails/${item.id}`)}
      style={{ boxShadow: dark && "none", border: dark && "2px solid rgba(255, 255, 255, 0.61)", background: "transparent" }}
    >
      <div className="card--img">
        {item.poster_path === null ? (
          <img src={tmdb} alt="" />
        ) : (
          <img
            src={`https://media.themoviedb.org/t/p/w440_and_h660_face${item.poster_path}`}
            alt=""
          />
        )}
      </div>
      <div className="card--info">
        <h3 style={{ color: dark ? "white" : "black" }}>{item.title}</h3>
        <h4 style={{color: dark && "white"}}>{item.release_date}</h4>
      </div>
      <div className="circularProgressbar">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textSize: "30px",
            textColor: "#fff",
            pathColor: color,
            trailColor: "#204529",
          })}
        />
      </div>
    </div>
  );
};

export default Card;
