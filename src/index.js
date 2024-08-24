import React from "react";
import ReactDOM from "react-dom/client";
import "tailwindcss/tailwind.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import Rotas from "./Rotas";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className=" bg-gradient-to-t from-[#1F2026] via-#1c1918 to-[#37383F]">
    <React.StrictMode>
      <Rotas />
    </React.StrictMode>
  {/*  <footer className="bg-gradient-to-t from-[#1F2026] via-[#1c1918] to-[#37383F] text-secondary_3 py-4 text-center">
      <p>&copy; 2024 Seu Restaurante. Todos os direitos reservados.</p>
    </footer>*/}  
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
