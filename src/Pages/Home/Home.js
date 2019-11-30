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
      articles: [],
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
          name: "b"
        }
      ]
    };
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  getArticles = () => {
    fetch(
      `http://localhost:3000/api/articles?pageNumber=${this.state.activePage}&pageSize=6`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(res =>
        this.setState({ articles: res }, () =>
          console.log("articles", this.state.articles)
        )
      );
  };
  componentDidMount() {
    this.getArticles();
  }
  render() {
    return (
      <div>
        <Header />
        <Slider />
        <MDBContainer>
          <div
            // className="row"
            style={{
              margin: 4,
              marginTop: 24,
              marginBottom: 24,
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {this.state.articles.length > 0
              ? this.state.articles.map(item => (
                  <div className="col-md-3" style={{ margin: 16 }}>
                    <CustomCard
                      ContentTitle={item.title}
                      ContentDescription={item.body}
                      // CardMediaHeight={120}
                      // CardMaxWidth={200}
                      onClick={() => console.log("clickeddd")}
                    />
                  </div>
                ))
              : null}
          </div>

          <Pagination
            size="lg"
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margin: 16,
              marginBottom: 100
            }}
          >
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

            {this.state.item.map((item, index) =>
              index < this.state.pageBound - 1 ? (
                <div>
                  {index === this.state.activePage ? (
                    <Pagination.Item active={index + 1}>
                      {index + 1}
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item
                      onClick={() =>
                        this.setState({ activePage: index }, () =>
                          this.getArticles()
                        )
                      }
                    >
                      {index + 1}
                    </Pagination.Item>
                  )}
                </div>
              ) : null
            )}

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
          </Pagination>
        </MDBContainer>
      </div>
    );
  }
}
