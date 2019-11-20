import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";

import MailIcon from "@material-ui/icons/Mail";
import NavBar from '../NavBar/NavBar'
import { withRouter } from "react-router-dom";

const styles = {
  list: {
    width: 250
  }
};

class TemporaryDrawer extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };
  handleClick = page => {
    let { history } = this.props;

    page = page.toLowerCase();
    if (page === "home") {
      page = "";
    }
    history.push({
      pathname: `/${page}`
    });
  };

  render() {
    const { classes } = this.props;
    console.log("props", this.props);

    const sideList = (
      <div className={classes.list} style={{ backgroundColor: "#f2f2f2" }}>
        <List>
          {["Home", "Profile","News", "Gallery"].map((text, index) => (
            <ListItem button key={text} onClick={() => this.handleClick(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Signin", "Signup", "Signout"].map((text, index) => (
            <ListItem button key={text} onClick={() => this.handleClick(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(TemporaryDrawer));
