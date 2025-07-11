import React, { useContext, useEffect, useRef, useState } from "react";
import "./Header.scss";
import { IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import logo from "$/assets/images/tmdb-logo.svg";
import { MdKeyboardArrowDown, MdOutlineDarkMode } from "react-icons/md";
import { CiLaptop, CiLight } from "react-icons/ci";
import { BsFillPencilFill } from "react-icons/bs";
import MovieContext from "$/Contex";
import AdminModal from "$/AdminModal/AdminModal";
import { RiMenu2Fill } from "react-icons/ri";
import translations from "$/Translation/Translation";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

const Header = () => {
  const [languageModalOne, setLanguageModalOne] = useState(false);
  const [languageModalTwo, setLanguageModalTwo] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [themeModal, setThemeModal] = useState(false);
  const navigate = useNavigate();
  const langRef = useRef(null);
  const themeRef = useRef(null);
  const [adminModal, setAdminModal] = useState(false);
  const [responsModal, setResponsModal] = useState(false);
  const [resFilms, setResFilms] = useState(false);
  const [resSerial, setResSerial] = useState(false);
  const [resPersons, setResPersons] = useState(false);
  const responseRef = useRef(null);
  const [isAdminLogged, setIsAdminLogged] = useState(() => {
    return localStorage.getItem("admin") === "true";
  });
  //THEME DARK-MODE
  const { dark, setDark, language, setLanguage } = useContext(MovieContext);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop >= 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function darkLocal() {
    localStorage.setItem("darkMode", "true");
    setDark(true);
    setThemeModal(false);
  }

  function lightLocal() {
    localStorage.setItem("darkMode", "false");
    setDark(false);
    setThemeModal(false);
  }

  function systemLocal() {
    localStorage.setItem("darkMode", "system");

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    setDark(prefersDark.matches);

    // Өзгөргөнүн live угуу
    prefersDark.addEventListener("change", (e) => {
      setDark(e.matches);
    });

    setThemeModal(false);
  }

  function handleLanguageChange(value) {
    setLanguage(value);
    localStorage.setItem("language", value);
    setLanguageModalOne(false);
    setLanguageModalTwo(false);
  }
  function resPopular() {
    navigate("/popular");
    setResponsModal(false);
  }
  function resTop() {
    navigate("/topRated");
    setResponsModal(false);
  }
  // Тышка клик болгондо тил модалын жабуу
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLanguageModalOne(false);
        setLanguageModalTwo(false);
      }

      if (themeRef.current && !themeRef.current.contains(e.target)) {
        setThemeModal(false);
      }
      if (responseRef.current && !responseRef.current.contains(e.target)) {
        setResponsModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header id="header" className={isScrolled ? "scrolled" : ""}>
      <div className="container">
        <div className="header">
          <div className="header--left">
            <h2 onClick={() => setResponsModal(true)}>
              <RiMenu2Fill />
            </h2>
            <Link to={"/"}>
              <img src={logo} alt="img" />
            </Link>
            <div
              className="respons-menu"
              style={{
                marginLeft: responsModal ? "0" : "-400px",
                transition: ".7s",
                background: dark && "#010137",
              }}
              ref={responseRef}
            >
              <h1
                onClick={() => setResponsModal(false)}
                style={{ color: dark && "white" }}
              >
                <HiOutlineArrowNarrowLeft />
                close
              </h1>
              <div
                className="films"
                style={{
                  height: resFilms ? "200px" : "50px",
                  transition: ".7s",
                }}
              >
                <h3
                  onClick={() => setResFilms(!resFilms)}
                  style={{ color: dark && "white" }}
                >
                  • {translations.headerNav1[language]}
                </h3>

                <a
                  onClick={() => resPopular()}
                  style={{
                    background: dark && "transparent",
                    color: dark && "white",
                  }}
                >
                  • {translations.popular[language]}
                </a>
                <a
                  onClick={() => resTop()}
                  style={{
                    background: dark && "transparent",
                    color: dark && "white",
                  }}
                >
                  • {translations.topRated[language]}
                </a>
                <a
                  style={{
                    background: dark && "transparent",
                    color: dark && "white",
                  }}
                >
                  • {translations.new[language]}
                </a>
              </div>
              <div
                className="serial"
                style={{
                  height: resSerial ? "200px" : "50px",
                  transition: ".7s",
                }}
              >
                <h3
                  onClick={() => setResSerial(!resSerial)}
                  style={{ color: dark && "white" }}
                >
                  • {translations.headerNav2[language]}
                </h3>{" "}
                <a
                  style={{
                    background: dark && "transparent",
                    color: dark && "white",
                  }}
                >
                  • {translations.turkish[language]}
                </a>
                <a
                  style={{
                    background: dark && "transparent",
                    color: dark && "white",
                  }}
                >
                  • {translations.russian[language]}
                </a>
                <a
                  style={{
                    background: dark && "transparent",
                    color: dark && "white",
                  }}
                >
                  • {translations.korean[language]}
                </a>
              </div>
               <div
                className="themeres"
                style={{
                  height: themeModal ? "200px" : "50px",
                  transition: ".7s",
                }}
              >
                <h3
                  onClick={() => setThemeModal(!themeModal)}
                  style={{ color: dark && "white" }}
                >
                  • {translations.theme[language]}
                </h3>{" "}
                <a
                  style={{
                    background: dark && "transparent",
                    color: dark && "white",
                  }}
                  onClick={lightLocal}
                >
                  • {translations.light[language]}
                </a>
                <a
                  style={{
                    background: dark && "transparent",
                    color: dark && "white",
                  }}
                  onClick={darkLocal}
                >
                  • {translations.dark[language]}
                </a>
                <a
                  style={{
                    background: dark && "transparent",
                    color: dark && "white",
                  }}
                  onClick={systemLocal}
                >
                  • system
                </a>
               
              </div>
              <div
                className="persons"
                style={{
                  height: resPersons ? "200px" : "50px",
                  transition: ".7s",
                }}
              >
                <h3
                  onClick={() => setResPersons(!resPersons)}
                  style={{ color: dark && "white" }}
                >
                  • {translations.headerNav3[language]}{" "}
                </h3>{" "}
                <a
                  style={{
                    background: dark && "transparent",
                    color: dark && "white",
                  }}
                >
                  • {translations.actors[language]}
                </a>
                <a
                  style={{
                    background: dark && "transparent",
                    color: dark && "white",
                  }}
                >
                  • {translations.actresses[language]}
                </a>
              </div>
            </div>
            <div className="main-nav">
              {translations.headerNav1[language]}
              <div className="drop-menu">
                <a onClick={() => navigate("/popular")}>
                  {translations.popular[language]}
                </a>
                <a onClick={() => navigate("/topRated")}>
                  {translations.topRated[language]}
                </a>
                <a>{translations.new[language]}</a>
              </div>
            </div>
            <div className="main-nav">
              {translations.headerNav2[language]}
              <div className="drop-menu">
                <a>{translations.turkish[language]}</a>
                <a>{translations.russian[language]}</a>
                <a>{translations.korean[language]}</a>
              </div>
            </div>
            <div className="main-nav">
              {translations.headerNav3[language]}
              <div className="drop-menu">
                <a>{translations.actors[language]}</a>
                <a>{translations.actresses[language]}</a>
              </div>
            </div>
          </div>
          <div className="header--right">
            <div className="theme">
              <h3 onClick={() => setThemeModal(true)}>
                Theme{" "}
                <span>
                  <BsFillPencilFill />
                </span>
              </h3>
              <div
                className="drop-theme"
                style={{ display: themeModal ? "flex" : "none" }}
                ref={themeRef}
              >
                <h4 onClick={darkLocal}>
                  Dark{" "}
                  <span>
                    <MdOutlineDarkMode />
                  </span>
                </h4>
                <h4 onClick={lightLocal}>
                  Light{" "}
                  <span>
                    <CiLight />
                  </span>
                </h4>
                <h4 onClick={systemLocal}>
                  System{" "}
                  <span>
                    <CiLaptop />
                  </span>
                </h4>
              </div>
            </div>
            <div
              className="language"
              onClick={() => setLanguageModalOne(true)}
              ref={langRef}
            >
              <h3>{language.slice(-2)}</h3>
              <div
                className="language--block"
                style={{
                  display: languageModalOne ? "flex" : "none",
                  height: languageModalTwo ? "200px" : "80px",
                }}
              >
                <h3
                  onClick={() => setLanguageModalTwo(true)}
                  className="subLangugeblock"
                >
                  {language}
                  <span>
                    <MdKeyboardArrowDown />
                  </span>
                </h3>
                <ul className="language--block__item">
                  <li onClick={() => handleLanguageChange("en-US")}>English</li>
                  <li onClick={() => handleLanguageChange("ru-RU")}>Russian</li>
                  <li onClick={() => handleLanguageChange("ky-KG")}>
                    Kyrgyzcha
                  </li>
                </ul>
              </div>
            </div>
            <h3 onClick={() => setAdminModal(true)}>
              {isAdminLogged ? "Admin" : "Login"}
            </h3>
          </div>
        </div>
      </div>
      {adminModal && (
        <AdminModal
          close={() => setAdminModal(false)}
          onLoginSuccess={() => setIsAdminLogged(true)}
        />
      )}
    </header>
  );
};

export default Header;
