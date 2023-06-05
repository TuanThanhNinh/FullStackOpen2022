import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

// axios.get("http://localhost:3001/persons").then((response) => {
//   const persons = response.data;
//   console.log(persons);
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
