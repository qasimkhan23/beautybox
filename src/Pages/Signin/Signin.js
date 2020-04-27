import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { MDBBtn, MDBInput } from "mdbreact";
import React from "react";
import { withRouter } from "react-router-dom";
import Header from "../../components/Header/header";
import ls from "local-storage";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleSubmit = () => {
    if (this.state.email !== "" && this.state.password !== "") {
      fetch(`http://localhost:3000/api/auth/`, {
        method: "POST",
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          ls.set("token", res.token);
          ls.set("userId", res.id);

          let { history } = this.props;
          history.push({
            pathname: `/`,
          });
        })
        .catch((err) => {
          console.log("errorrrrre", err);
        });
    } else {
      alert("Please fill the form");
    }
  };
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Card
            style={{
              margin: 100,
              padding: 32,
            }}
          >
            <Typography variant="h5" component="h3">
              SignIn
            </Typography>
            <div className="row">
              <div className="col-md-12">
                <MDBInput
                  label="Username"
                  icon="user"
                  onChange={(e) => this.handleEmail(e)}
                  value={this.state.email}
                  validate={true}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <MDBInput
                  label="Password"
                  icon="eye"
                  type="password"
                  onChange={(e) => this.handlePassword(e)}
                  value={this.state.password}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <MDBBtn
                  color="primary"
                  rounded
                  size="md"
                  onClick={this.handleSubmit}
                >
                  Submit
                </MDBBtn>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default withRouter(Signin);
