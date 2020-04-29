import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";

export const CustomCard = (props) => {
  return (
    <Card
      raised={true}
      style={{ maxWidth: props.CardMaxWidth }}
      onClick={props.onClick}
      style={props.style}
    >
      <CardActionArea>
        <CardMedia
          style={{ height: props.CardMediaHeight }}
          image={props.image}
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" noWrap>
            {props.ContentTitle}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            noWrap
          >
            {props.ContentDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={props.onClickButton1}>
          {props.ButtonTitle1}
        </Button>
        <Button size="small" color="primary" onClick={props.onClickButton2}>
          {props.ButtonTitle2}
        </Button>
      </CardActions>
    </Card>
  );
};
CustomCard.defaultProps = {
  image:
    "https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg",
  title: "Contemplative Reptile",
  ContentTitle: "Card",
  ContentDescription:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  ButtonTitle1: "Share",
  ButtonTitle2: "Learn More",
  CardMaxWidth: 275,
  CardMediaHeight: 180,
};
