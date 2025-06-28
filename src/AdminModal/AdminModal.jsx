import React, { useEffect, useState } from "react";
import "./AdminModal.scss";

const AdminModal = ({ close, onLoginSuccess }) => {
  const [login, setLogin] = useState("");
  const [parol, setParol] = useState("");

function handleModal() {
  if (login === "admin" && parol === "123") {
    onLoginSuccess(); // ата-энеге билдирүү
    close(); // модалды жабуу
    localStorage.setItem("admin", "true"); // Бул жерде true деген текст сакталат
  } else {
    alert("Incorrect login or password");
  }
}


  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div id="adminModal">
      <div className="container">
        <div className="adminModal">
          <div className="adminModal--block">
            <input
              type="text"
              placeholder="Login/Email..."
              onChange={(e) => setLogin(e.target.value)}
            />
            <input
              type="text"
              placeholder="Parol/PIN..."
              onChange={(e) => setParol(e.target.value)}
            />
            <button onClick={handleModal}>ok</button>
            <button onClick={close}>exit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
