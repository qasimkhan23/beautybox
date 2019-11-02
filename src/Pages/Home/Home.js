import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
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
              <Card raised={true} style={{ maxWidth: 275 }}>
                <CardActionArea>
                  <CardMedia
                    style={{ height: 180 }}
                    image="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
                    title="Contemplative Reptile"
                  />
                  <CardContent style={{ height: 150 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </div>
            <div className="col-md-3" style={{ margin: 16 }}>
              <Card raised={true} style={{ maxWidth: 275 }}>
                <CardActionArea>
                  <CardMedia
                    style={{ height: 180 }}
                    image="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
                    title="Contemplative Reptile"
                  />
                  <CardContent style={{ height: 150 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
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
