import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Gallery from "../Pages/Gallery/Gallery";
import News from "../Pages/News/news";
import Signin from "../Pages/Signin/Signin";
import Signout from "../Pages/Signout/Signout";
import Profile from '../Pages/Profile/Profile'
import Signup from "../Pages/Signup/Signup";
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" exact component={Profile} />

        <Route path="/news" exact component={News} />
        <Route path="/signin" exact component={Signin} />

        <Route path="/signout" exact component={Signout} />

        <Route path="/gallery" exact component={Gallery} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
     
    );
  }
}

export default Routes;
