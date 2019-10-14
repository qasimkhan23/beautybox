import React from "react";
import Header from "../../components/Header/header";
import Slider from "../../components/Slideshow/Slideshow";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBContainer
} from "mdbreact";
const Home = () => {
  return (
    <div>
      <Header />
      <Slider />
      <MDBContainer>
        <div className="row" style={{ margin: 4, marginTop: 24 }}>
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
      </MDBContainer>
    </div>
  );
};
export default Home;
