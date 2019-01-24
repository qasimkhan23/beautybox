import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "./style.css";
const Navbar = props => {
  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <button className="btn">
            <i class="fas fa-bars fa-2x" onClick={props.click} s />
          </button>
          <Typography
            variant="display1"
            color="inherit"
            style={{ marginLeft: 100, fontFamily: "italic" }}
          >
            Beauty Box - Latest Fashion News & Updates
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Navbar;
