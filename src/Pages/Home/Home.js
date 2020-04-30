import { CustomCard } from "../../components/Card/Card";
import React from "react";
import { Pagination } from "react-bootstrap";
import Header from "../../components/Header/header";
import Slider from "../../components/Slideshow/Slideshow";
import ls from "local-storage";
import {
  Avatar,
  Backdrop,
  Button,
  Card,
  Fade,
  Modal,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  ListItemSecondaryAction,
  ListItem,
  List,
  Typography,
  Grid,
  ListItemIcon,
  IconButton,
  TextField,
} from "@material-ui/core";
// import { DeleteIcon, PencilIcon } from "@material-ui/icons";
import Icon from "@material-ui/core/Icon";

import { MDBBtn, MDBContainer, MDBInput } from "mdbreact";

import AccountCircle from "@material-ui/icons/AccountCircle";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openRead: false,
      publicComment: "",
      editComment: "",
      articleId: "",
      articleComments: [],
      article: null,
      activePage: 0,
      upperPageBound: 5,
      lowerPageBound: 5,
      totalPages: null,
      pageBound: 5,
      articles: [],
      user: null,
      image: null,
      item: [
        {
          name: "a",
        },
        {
          name: "b",
        },
        {
          name: "b",
        },
        {
          name: "b",
        },
      ],
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
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        let temp = [];
        for (let i = 0; i < res.totalCount; i++) {
          temp.push({});
        }
        this.setState({ articles: res.articles, item: temp });
      });
  };
  componentDidMount() {
    this.getArticles();
  }
  handleReadModal = (title, body, article) => {
    this.setState({
      readTitle: title,
      readBody: body,
      openRead: !this.state.openRead,
      articleComments: article.comments,
      articleId: article._id,
      article: article,
    });
  };
  closeReadModal = () => {
    this.setState({
      openRead: false,
    });
  };
  handleChange = (event) => {
    this.setState({ publicComment: event.target.value });
  };
  showEditField = (commentId) => {
    this.state.articleComments.map((item, index) => {
      let temp = this.state.articleComments;
      if (item._id == commentId) {
        temp[index]["edit"] = true;
      }
      this.setState({ articleComments: temp }, () =>
        console.log("comments", this.state.articleComments)
      );
    });
  };
  addComment = () => {
    fetch(`http://localhost:3000/api/articles/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": ls.get("token"),
      },

      body: JSON.stringify({
        articleid: this.state.articleId,
        comment: this.state.publicComment,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("=======coment edit ress", res);
        this.getArticles();
        this.setState({ articleComments: res.comments });
      })
      .catch((err) => console.log(err));
  };

  handleEditComment = (commentId) => {
    fetch(`http://localhost:3000/api/articles/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": ls.get("token"),
      },

      body: JSON.stringify({
        articleid: this.state.articleId,
        comment: this.state.editComment,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("=======coment edit ress", res);
        this.getArticles();
        this.setState({ articleComments: res.comments });
      })
      .catch((err) => console.log(err));
  };
  handleDeleteComment = (commentId) => {
    fetch(`http://localhost:3000/api/articles/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": ls.get("token"),
      },

      body: JSON.stringify({
        articleid: this.state.articleId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("=======coment delete ress", res);
        this.setState({ articleComments: res.comments });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { openRead, publicComment, articleComments } = this.state;
    return (
      <div>
        <Header />
        <Slider />
        <MDBContainer>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            open={openRead}
            onClose={this.closeReadModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openRead}>
              <div
                style={{
                  backgroundColor: "#f7f7f7",
                  // border: "2px solid #000",
                  // boxShadow: the,
                  height: 600,
                  width: 1200,
                  padding: 64,
                  overflowY: "scroll",
                }}
              >
                <h4>{this.state.readTitle}</h4>

                <div
                  style={{ textAlign: "justify", flex: 1 }}
                  dangerouslySetInnerHTML={{ __html: this.state.readBody }}
                />

                <MDBBtn
                  color="primary"
                  rounded
                  size="md"
                  style={{ marginTop: 50 }}
                  onClick={this.closeReadModal}
                >
                  Back
                </MDBBtn>

                <div
                  style={{
                    flex: 1,
                    justifyContent: "space-around",
                    marginTop: 50,
                  }}
                >
                  <h3>Comments</h3>
                  <div style={{ marginTop: 50 }}>
                    <Grid container spacing={0} alignItems="center">
                      <Grid item>
                        <AccountCircle fontSize="large" />
                      </Grid>
                      <Grid item>
                        <TextField
                          style={{ width: 1050, marginTop: 8 }}
                          value={publicComment}
                          onChange={this.handleChange}
                          multiline
                          rowsMax={4}
                          InputLabelProps={{ fontSize: 20 }}
                          id="input-with-icon-grid"
                          label="Add a Public Comment"
                        />
                        <MDBBtn
                          color="primary"
                          rounded
                          size="sm"
                          onClick={this.addComment}
                        >
                          Submit
                        </MDBBtn>
                      </Grid>
                    </Grid>
                  </div>
                  <div style={{ flex: 1, marginTop: 50 }}>
                    <List
                      style={{
                        width: "100%",
                        maxWidth: "100ch",
                      }}
                    >
                      {articleComments.map((item) => (
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            {item.profileImage ? (
                              <Avatar
                                alt="Remy Sharp"
                                src={require(`../../uploads/${item.profileImage}`)}
                              />
                            ) : (
                              <Avatar
                                alt="Remy Sharp"
                                src={require(`../../uploads/default.jpg`)}
                              />
                            )}
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <div style={{ flexDirention: "row" }}>
                                {item.authorname + " "}
                                {this.state.article.author._id ==
                                item.authorid ? (
                                  <Typography
                                    component="span"
                                    variant="caption"
                                    style={{ display: "inline" }}
                                    color="textPrimary"
                                  >
                                    (Author)
                                  </Typography>
                                ) : null}
                              </div>
                            }
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  style={{ display: "inline" }}
                                  color="textPrimary"
                                >
                                  {item.comment}
                                </Typography>
                                {item.edit ? (
                                  <>
                                    <TextField
                                      style={{ width: 800, marginTop: 8 }}
                                      value={this.state.editComment}
                                      onChange={(e) =>
                                        this.setState({
                                          editComment: e.target.value,
                                        })
                                      }
                                      multiline
                                      rowsMax={4}
                                      InputLabelProps={{ fontSize: 20 }}
                                      id="input-with-icon-grid"
                                      label="Edit Comment"
                                    />
                                    <MDBBtn
                                      color="primary"
                                      rounded
                                      size="sm"
                                      onClick={() =>
                                        this.handleEditComment(item._id)
                                      }
                                    >
                                      Submit
                                    </MDBBtn>
                                  </>
                                ) : null}
                              </React.Fragment>
                            }
                          />
                          {item.authorid == ls.get("userId") ? (
                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                aria-label="edit"
                                onClick={() => this.showEditField(item._id)}
                              >
                                <Icon>edit</Icon>
                              </IconButton>
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() =>
                                  this.handleDeleteComment(item._id)
                                }
                              >
                                <Icon>delete</Icon>
                              </IconButton>
                            </ListItemSecondaryAction>
                          ) : null}
                        </ListItem>
                      ))}
                    </List>
                  </div>
                </div>
              </div>
            </Fade>
          </Modal>
          <div
            style={{
              margin: 4,
              marginTop: 24,
              marginBottom: 24,
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
            {this.state.articles.length > 0
              ? this.state.articles.map((item) => (
                  <div className="col-md-3" style={{ margin: 16 }}>
                    <CustomCard
                      ContentTitle={item.title}
                      ContentDescription={item.body}
                      // CardMediaHeight={120}
                      // CardMaxWidth={200}
                      onClick={() =>
                        this.handleReadModal(item.title, item.body, item)
                      }
                    />
                  </div>
                ))
              : null}

          <Pagination
            size="lg"
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margin: 16,
              marginBottom: 100,
            }}
          >
            <Pagination.Prev
              onClick={() =>
                this.setState({
                  activePage:
                    this.state.activePage > 0
                      ? this.state.activePage - 1
                      : this.state.activePage,
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
                      : this.state.activePage,
                })
              }
            />
          </Pagination>
        </MDBContainer>
      </div>
    );
  }
}
