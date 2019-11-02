import { CustomCard } from "../../components/Card/Card";
import { MDBContainer } from "mdbreact";
import React from "react";
import Header from "../../components/Header/header";

import { Card, Avatar } from "@material-ui/core";

export default class Profile extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <MDBContainer style={{ backgroundColor: "#f7f7f7" }}>
          <div
            style={{
              margin: 4,
              marginTop: 100,
              marginBottom: 100
            }}
            className="row"
          >
            <div className="col-md-3">
              <Card
                raised={true}
                style={{
                  marginTop: 8,
                  padding: 16,
                  height: 320,
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <Avatar
                  src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
                  style={{
                    margin: 10,
                    width: 160,
                    height: 160
                  }}
                />
              </Card>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-8">
              <div className="row">
                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>
                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>
                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>
                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>

                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>
                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>
                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>
                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>
                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>
                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>
                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>

                {/* <div className="col-md-5" style={{ margin: 8 }}>
                  <CustomCard />
                </div> */}
              </div>
            </div>
          </div>
        </MDBContainer>
      </div>
    );
  }
}
