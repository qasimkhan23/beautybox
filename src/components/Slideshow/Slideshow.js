import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBContainer,
} from "mdbreact";
import React from "react";

class SliderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }
  getArticles = () => {
    fetch(`http://localhost:3000/api/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => this.setState({ articles: res }));
  };
  componentDidMount() {
    this.getArticles();
  }
  render() {
    return (
      <MDBContainer>
        <div
          style={{
            backgroundColor: "#f7f7f7",
            marginTop: 24,
            // padding: 20,
            flex: 1,

            // minHeight: 500
          }}
        >
          <Carousel
            autoPlay={true}
            dynamicHeight={true}
            infiniteLoop={true}
            interval={2000}
            thumbWidth={500}
          >
            <div>
              <img src={require("../../images/4.jpg")} />
            </div>
            <div>
              <img src={require("../../images/2.jpg")} />
            </div>
            <div>
              <img src={require("../../images/3.jpg")} />
            </div>
            <div>
              <img src={require("../../images/4.jpg")} />
            </div>
            <div>
              <img src={require("../../images/5.jpg")} />
            </div>
            <div>
              <img src={require("../../images/6.jpg")} />
            </div>
          </Carousel>
        </div>
      </MDBContainer>
    );
  }
}

export default SliderComponent;
