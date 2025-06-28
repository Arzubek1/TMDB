import React, { useContext, useEffect, useState } from "react";
import "./ActorsDetails.scss";
import { keyAPI } from "$/assets/API-key";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MdArrowLeft } from "react-icons/md";
import { motion } from "framer-motion";
import MovieContext from "$/Contex";

const MenuItem = ({ label }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.h3
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        cursor: "pointer",
      }}
    >
      {label}
      <motion.span
        animate={{ rotate: isHover ? -90 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ display: "inline-block" }}
      >
        <MdArrowLeft />
      </motion.span>
    </motion.h3>
  );
};

const menuItems = ["Обзор", "Медиа", "Фандом", "Поделиться"];

const ActorsDetails = () => {
  const { actorsID } = useParams();
  const [actorsDetails, setActorsDetails] = useState({});
  const personAPI = `https://api.themoviedb.org/3/person/${actorsID}?api_key=${keyAPI}&language=en-US`;
  const { name, profile_path, biography, birthday } = actorsDetails;
  const [bio, setBio] = useState(false);
  const {dark} = useContext(MovieContext)


  async function getActorsDetails() {
    try {
      const res = await axios.get(personAPI);
      const { data } = res;
      setActorsDetails(data);
      console.log(data, "actorsid");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    getActorsDetails();
  }, [actorsID]);

  return (
    <div id="actorsDetails">
      <div className="actorsDetailsTOP">
        <div className="menu" style={{color: dark && "white"}}>
          {menuItems.map((item, idx) => (
            <MenuItem key={idx} label={item} />
          ))}
        </div>
        <hr />
      </div>

      <div className="container">
        <div className="actorsDetails">
          <div className="actorsDetails--image">
            <img
              src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${profile_path}`}
              alt="img"
            />
          </div>
          <div className="actorsDetails--content" style={{color: dark && "white"}}>
            <h1>
              {name} <span>( {birthday} )</span>
            </h1>
            <h3>Биография</h3>
            <p>
              {biography?.length > 400
                ? biography?.slice(0, bio ? biography.length : 400)
                : biography}
              <span
                className="read-more"
                onClick={() => setBio(true)}
                style={{
                  display: biography?.length < 400 || bio ? "none" : "inline",
                }}
              >
                Читать ещё
              </span>
            </p>

            <h3>Известность за</h3>
            <div className="actorsDetails--content__movie">{}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorsDetails;
