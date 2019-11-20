import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

import "./style.css";
const NavBar = props => {
  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <button className="btn">
            <i class="fas fa-bars fa-1x" onClick={props.click} s />
          </button>
          <Typography
            variant="display1"
            color="inherit"
            style={{ marginLeft: 32, fontSize: 32, fontFamily: "italic" }}
          >
            Beauty Box
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
