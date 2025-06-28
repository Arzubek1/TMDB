import React, { useContext, useEffect, useRef, useState } from "react";
import "./Actors.scss";
import { keyAPI } from "$/assets/API-key";
import axios from "axios";
import userIMG from "../../assets/images/user-image.webp";
import { data, useNavigate } from "react-router-dom";
import MovieContext from "$/Contex";

const Actors = ({ movieid }) => {
  const navigate = useNavigate();
  const [actors, setActors] = useState([]);
  const [atEnt, setAtEnd] = useState(false);
  const scrollRef = useRef(null);
  const { dark } = useContext(MovieContext);

  //ACTORSAPI
  const actorsAPI = `https://api.themoviedb.org/3/movie/${movieid}/credits?api_key=${keyAPI}&language=en-US`;
  async function getActors() {
    try {
      let res = await axios.get(actorsAPI);
      let { cast } = res.data;
      setActors(cast);
      console.log(cast, "actors data");
    } catch (error) {
      console.error(error);
    }
  }

  const scrollEndFade = () => {
    const el = scrollRef.current;
    const isEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
    setAtEnd(isEnd);
  };

  useEffect(() => {
    getActors();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", scrollEndFade);
      scrollEndFade();
    }
    return () => el?.removeEventListener("scroll", scrollEndFade);
  }, [actors]);
  return (
    <div id="actors">
      <div className="container">
        <h1 style={{ color: dark && "white" }}>В главных ролях</h1>
        <div className="actors--wrapper">
          <div className="actors" ref={scrollRef}>
            {actors.map((el) => (
              <div
                className="actors--blocks"
                key={el.id}
                onClick={() => navigate(`/actorsDetails/${el.id}`)}
                style={{background: dark && "#03254192", boxShadow: dark && "none"}}
              >
                {el.profile_path === null ? (
                  <img src={userIMG} alt="img" />
                ) : (
                  <img
                    src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${el.profile_path}`}
                    alt="img"
                  />
                )}

                <div className="actors--blocks__info">
                  <h3 style={{color: dark && "white"}}>{el.original_name}</h3>
                  <h4 style={{color: dark && "white"}}>{el.character}</h4>
                </div>
              </div>
            ))}
          </div>
          <div className="fade-right" style={{ opacity: atEnt ? 0 : 1 }}></div>
        </div>
      </div>
    </div>
  );
};

export default Actors;
