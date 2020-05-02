import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ls from "local-storage";
import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
const styles = {
  list: {
    width: 250,
  },
};

class TemporaryDrawer extends React.Component {
  state = {
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  handleClick = (page) => {
    let { history } = this.props;

    page = page.toLowerCase();
    if (page === "home") {
      page = "";
    }
    if (page === "signout") {
      ls.clear();
      page = "";
    }
    history.push({
      pathname: `/${page}`,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list} style={{ backgroundColor: "#f2f2f2" }}>
        {ls.get("token") !== null ? (
          <List>
            {["Home", "Profile"].map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={() => this.handleClick(text)}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <HomeIcon /> : <PersonIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        ) : (
          <List>
            {["Home"].map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={() => this.handleClick(text)}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        )}
        <Divider />
        {ls.get("token") !== null ? (
          <List>
            {["Signout"].map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={() => this.handleClick(text)}
              >
                <ListItemIcon>
                  {index === 0 ? <LockOpenIcon /> : null}
                  {index === 1 ? <PersonAddIcon /> : null}

                  {index === 2 ? <ExitToAppIcon /> : null}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        ) : (
          <List>
            {["Signin", "Signup"].map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={() => this.handleClick(text)}
              >
                <ListItemIcon>
                  {index === 0 ? <LockOpenIcon /> : null}
                  {index === 1 ? <PersonAddIcon /> : null}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        )}
      </div>
    );

    return (
      <div style={{ backgroundColor: "red" }}>
        <NavBar click={this.toggleDrawer("left", true)} />

        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </Drawer>

        <Drawer
          anchor="right"
          open={this.state.right}
          onClose={this.toggleDrawer("right", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("right", false)}
            onKeyDown={this.toggleDrawer("right", false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(TemporaryDrawer));
