import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Bookmarks from "@material-ui/icons/Bookmarks";

import Navbar from "../NavBar/NavBar";
class Header extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Button variant="outlined" color="primary">
          <Bookmarks />
        </Button>
      </div>
    );
  }
}
export default Header;
