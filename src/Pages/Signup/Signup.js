import { Button, Card, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { ErrorMessage, Formik } from "formik";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import React from "react";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";
import Header from "../../components/Header/header";


const equalTo = (ref,msg)=>{
  return Yup.mixed().test({
    name: 'equalTo',
    exclusive: false,
    message: msg || '${path} must be the same as ${reference}',
    params: {
      reference: ref.path,
    },
    test: function(value) {
      return value === this.resolve(ref);
    },
  });
}
Yup.addMethod(Yup.string, 'equalTo', equalTo);

class Signup extends React.Component {
  handleSubmit = (values)=>{
    fetch(
      `http://localhost:3000/api/users`,
      {
        method: "POST",
        body:JSON.stringify({
          name:values.name,
          email:values.email,
          password:values.password
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(res =>{
        let {history}= this.props;
        history.push({
          pathname: `/signin`

        })
      }
      );
  }
  render(){
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
                .min(5)
                .max(30)
                .required("Required"),
              confirm: Yup.string().equalTo(Yup.ref('password'), 'Passwords must match').required('Required'),

              email: Yup.string()
                .min(3)
                .max(30)
                .email()
                .required("Required")
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              this.handleSubmit(values);
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
                            type="Password"
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
                            type="Password"

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
  )}
};



export default withRouter(Signup);
