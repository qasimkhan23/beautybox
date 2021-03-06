import ls from "local-storage";
import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Gallery from "../Pages/Gallery/Gallery";
import Home from "../Pages/Home/Home";
import News from "../Pages/News/news";
import Profile from "../Pages/Profile/Profile";
import Settings from "../Pages/Settings/Settings";
import Signin from "../Pages/Signin/Signin";
import Signout from "../Pages/Signout/Signout";
import Signup from "../Pages/Signup/Signup";

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        ls.get("token") !== null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <Route path="/profile" exact component={Profile} /> */}
        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>

        <Route path="/news" exact component={News} />
        <Route path="/signin" exact component={Signin} />

        <Route path="/signout" exact component={Signout} />

        <Route path="/gallery" exact component={Gallery} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/settings" exact component={Settings} />
      </Switch>
    );
  }
}

export default Routes;
