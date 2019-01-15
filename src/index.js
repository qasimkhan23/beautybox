import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";
// import header from './components/Header/header';
// import layout from './components/hoc/Layout/layout';
// import SideNav from './components/Header/SideNav/sidenav';
const App = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
