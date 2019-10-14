import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBContainer
} from "mdbreact";
import React from "react";

const Slider = () => {
  // const classes = makeStyles({
  //   card: {
  //     maxWidth: 345
  //   },
  //   media: {
  //     height: 140
  //   }
  // });

  return (
    <MDBContainer>
      <MDBCarousel
        activeItem={1}
        length={1}
        slide={true}
        showControls={false}
        showIndicators={true}
        multiItem
        style={{ height: "100%" }}
      >
        <div
          style={{
            backgroundColor: "#f2f2f2",
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
                          with over 6,000 species, ranging across all continents
                          except Antarctica
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
                  <Card style={{ maxWidth: 275 }}>
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
                          with over 6,000 species, ranging across all continents
                          except Antarctica
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
                  <Card style={{ maxWidth: 275 }}>
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
                          with over 6,000 species, ranging across all continents
                          except Antarctica
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
                  <Card style={{ maxWidth: 275 }}>
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
                          with over 6,000 species, ranging across all continents
                          except Antarctica
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
            </MDBCarouselItem>
          </MDBCarouselInner>
        </div>
      </MDBCarousel>
    </MDBContainer>
  );
};

export default Slider;
