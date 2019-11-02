import { CustomCard } from "../../components/Card/Card";
import { MDBContainer } from "mdbreact";
import React from "react";
import { Pagination } from "react-bootstrap";
import Header from "../../components/Header/header";
import Slider from "../../components/Slideshow/Slideshow";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 0,
      upperPageBound: 5,
      lowerPageBound: 5,
      pageBound: 5,
      item: [
        {
          name: "a"
        },
        {
          name: "b"
        },
        {
          name: "b"
        },
        {
          name: "a"
        },
        {
          name: "b"
        },
        {
          name: "b"
        }
      ]
    };
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  render() {
    return (
      <div>
        <Header />
        <Slider />
        <MDBContainer>
          <div
            className="row"
            style={{ margin: 4, marginTop: 24, marginBottom: 24 }}
          >
            <div className="col-md-3" style={{ margin: 16 }}>
              <CustomCard onClick={() => console.log("clickeddd")} />
            </div>
            <div className="col-md-3" style={{ margin: 16 }}>
              <CustomCard />
            </div>
          </div>

          <Pagination
            size="lg"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Pagination.First />
            <Pagination.Prev
              onClick={() =>
                this.setState({
                  activePage:
                    this.state.activePage > 0
                      ? this.state.activePage - 1
                      : this.state.activePage
                })
              }
            />

            <Pagination.Ellipsis />
            {this.state.item.map((item, index) =>
              index < this.state.pageBound - 1 ? (
                <div>
                  {index === this.state.activePage ? (
                    <Pagination.Item active={index + 1}>
                      {index + 1}
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item
                      onClick={() => this.setState({ activePage: index })}
                    >
                      {index + 1}
                    </Pagination.Item>
                  )}
                </div>
              ) : null
            )}

            <Pagination.Ellipsis />
            <Pagination.Next
              onClick={() =>
                this.setState({
                  activePage:
                    this.state.activePage < this.state.item.length - 1
                      ? this.state.activePage + 1
                      : this.state.activePage
                })
              }
            />
            <Pagination.Last />
          </Pagination>
        </MDBContainer>
      </div>
    );
  }
}
