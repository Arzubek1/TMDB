import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import "./index.scss";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import RootContex from "./Contex/RootContex";

createRoot(document.getElementById("root")).render(
<StrictMode>
  <RootContex>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </RootContex>
</StrictMode>

);
