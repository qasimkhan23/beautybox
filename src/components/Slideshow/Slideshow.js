import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBContainer
} from "mdbreact";
import React from "react";

class SliderComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles:[]
    }
  }
  getArticles = () => {
    fetch(
      `http://localhost:3000/api/articles`,
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
      <MDBContainer>
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          totalSlides={this.state.articles.length - 1}
        >
           <div
            style={{
              backgroundColor: "#f7f7f7",
              marginTop: 24,
              padding: 20,
              flex: 1,
              minHeight: 500
            }}
          >
          <Slider>
            {
              this.state.articles.map((item, index) => (
                <Slide index={index}>
                  <div className="row">
                  <div className="col-md-3">
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
                            Lizards are a widespread group of squamate reptiles,
                            with over 6,000 species, ranging across all
                            continents except
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary">
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                 
                </div>
                </Slide>
                
              ))
            }


          </Slider>
          </div>
          <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
        </CarouselProvider>
        {/* <MDBCarousel
          activeItem={3}
          length={3}
          slide={true}
          showControls={false}
          showIndicators={true}
          multiItem
          style={{ height: "100%" }}
        >
          <div
            style={{
              backgroundColor: "#f7f7f7",
              marginTop: 24,
              padding: 20,
              flex: 1,
              minHeight: 500
            }}
          >
            <MDBCarouselInner>
              <MDBCarouselItem itemId="1">
                <div className="row">
                  <div className="col-md-3">
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
                            Lizards are a widespread group of squamate reptiles,
                            with over 6,000 species, ranging across all
                            continents except
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary">
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                 
                </div>
              </MDBCarouselItem>
            </MDBCarouselInner>
          </div>
        </MDBCarousel> */}
      </MDBContainer>
    );
  }
}

export default SliderComponent;
