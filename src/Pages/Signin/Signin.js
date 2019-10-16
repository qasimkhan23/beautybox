import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Header from "../../components/Header/header";
import { MDBInput } from "mdbreact";
import { MDBBtn } from "mdbreact";

import Card from "@material-ui/core/Card";

const styles = {};
const Signin = props => {
  // const { classes } = props;
  return (
    <div>
      <Header />
      <div className="container">
        <Card
          style={{
            margin: 100,
            padding: 32
          }}
        >
          <Typography variant="h5" component="h3">
            SignIn
          </Typography>
          <div className="row">
            <div className="col-md-12">
              <MDBInput label="Username" icon="user" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <MDBInput label="Password" icon="eye" type="password" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <MDBBtn color="primary" rounded size="md">
                Submit
              </MDBBtn>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

Signin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signin);
