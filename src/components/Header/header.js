import React, { Component } from "react";
import Sidebar from '../Sidebar/Sidebar'
import Navbar from "../Navbar/Navbar";
class Header extends Component {
  render() {
    return (
      <div>
        <Navbar /> 
        <Sidebar/>  
      </div>
    );
  }
}
export default Header;
