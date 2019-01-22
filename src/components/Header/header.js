import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Bookmarks from "@material-ui/icons/Bookmarks";
import Sidebar from '../Sidebar/Sidebar'
import Navbar from "../Navbar/Navbar";
class Header extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Button variant="outlined" color="primary">
          <Bookmarks />
        </Button>
        <Sidebar/>  
      </div>
    );
  }
}
export default Header;
