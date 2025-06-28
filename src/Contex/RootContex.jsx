import React, { useEffect, useState } from "react";
import MovieContext from ".";

const RootContext = ({ children }) => {
  // ✅ Тилди localStorage'тен ал
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en-US";
  });

  // ✅ Тил өзгөрсө localStorage'ке сакта
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored === null || stored === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark;
    }
    return JSON.parse(stored);
  });

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      if (stored === "system") {
        setDark(e.matches);
      }
    };

    if (stored === "system") {
      setDark(mediaQuery.matches);
      mediaQuery.addEventListener("change", handleChange);
    }

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== "system") {
      localStorage.setItem("darkMode", JSON.stringify(dark));
    }
  }, [dark]);

  return (
    <MovieContext.Provider value={{ dark, setDark, language, setLanguage }}>
      {children}
    </MovieContext.Provider>
  );
};

export default RootContext;
