import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Header from "../../components/Header/header";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, TextField, Button } from "@material-ui/core";

const styles = {};
const Signup = props => {
  // const { classes } = props;
  return (
    <div>
      <Header />
      <div className="container">
        <Card
          style={{
            margin: 100,
            padding: 32,
            paddingLeft: 80
          }}
        >
          <Typography variant="h5" component="h3">
            SignUp
          </Typography>

          {/* <div className="row">
            <div className="col-md-12">
              <MDBInput label="Full Name" icon="user" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <MDBInput label="Email" icon="mail" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <MDBInput label="Create Password" icon="eye" type="password" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <MDBInput label="Confirm Password" icon="eye" type="password" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <MDBBtn color="primary" rounded size="md">
                Submit
              </MDBBtn>
            </div>
          </div> */}
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirm: ""
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .matches(/^[A-Za-z]+$/, "Please provide a valid name")
                .min(3, "Must be 3 letters or more")
                .max(30, "Must be 30 letters or less")
                .required("Required"),
              password: Yup.string()
                .min(4)
                .max(30)
                .required("Required"),
              confirm: Yup.string().required("Required"),

              email: Yup.string()
                .min(3)
                .max(30)
                .email()
                .required("Required")
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log("vaavavavava", values);
              // Add(values, resetForm, setSubmitting);
            }}
          >
            {formik => (
              <MDBContainer>
                <form onSubmit={formik.handleSubmit}>
                  <div style={{ marginBlockEnd: 32 }}>
                    <MDBRow>
                      <MDBCol md="12">
                        <div>
                          <TextField
                            id="name"
                            label="Name"
                            style={{ width: 700 }}
                            margin="normal"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            helperText={
                              <ErrorMessage name="name">
                                {msg => (
                                  <div style={{ color: "red" }}>{msg}</div>
                                )}
                              </ErrorMessage>
                            }
                          />
                        </div>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>
                      <MDBCol md="12">
                        <div>
                          <TextField
                            id="email"
                            label="Email"
                            style={{ width: 700 }}
                            margin="normal"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            // InputLabelProps={{
                            //   shrink: true
                            // }}
                            helperText={
                              <ErrorMessage name="email">
                                {msg => (
                                  <div style={{ color: "red" }}>{msg}</div>
                                )}
                              </ErrorMessage>
                            }
                          />
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="12">
                        <div>
                          <TextField
                            id="password"
                            label="Password"
                            style={{ width: 700 }}
                            margin="normal"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            // InputLabelProps={{
                            //   shrink: true
                            // }}
                            helperText={
                              <ErrorMessage name="password">
                                {msg => (
                                  <div style={{ color: "red" }}>{msg}</div>
                                )}
                              </ErrorMessage>
                            }
                          />
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="12">
                        <div>
                          <TextField
                            id="confirm"
                            label="Confirm Password"
                            style={{ width: 700 }}
                            margin="normal"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirm}
                            // InputLabelProps={{
                            //   shrink: true
                            // }}
                            helperText={
                              <ErrorMessage name="confirm">
                                {msg => (
                                  <div style={{ color: "red" }}>{msg}</div>
                                )}
                              </ErrorMessage>
                            }
                          />
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </div>
                  <MDBRow>
                    <MDBCol md="12">
                      <div style={{ alignItems: "center" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={formik.handleSubmit}
                        >
                          Register
                        </Button>
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>
                </form>
              </MDBContainer>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
};

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
