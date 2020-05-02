import {
  Avatar,
  Backdrop,
  Button,
  Card,
  Fade,
  Modal,
  CircularProgress,
  Tooltip,
  Typography,
} from "@material-ui/core";
import AddCircle from "@material-ui/icons/AddCircle";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Settings from "@material-ui/icons/Settings";
import {
  ContentState,
  convertToRaw,
  EditorState,
  AtomicBlockUtils,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import ls from "local-storage";
import { MDBBtn, MDBContainer, MDBInput } from "mdbreact";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { CustomCard } from "../../components/Card/Card";
import React from "react";
import { Editor } from "react-draft-wysiwyg";
// import Editor from "draft-js-plugins-editor";
import createImagePlugin from "draft-js-image-plugin";
import createToolbarPlugin from "draft-js-static-toolbar-plugin";
import { Pagination } from "react-bootstrap";

import Header from "../../components/Header/header";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.globalImagePath = require.context("../../uploads", true);

    this.state = {
      open: false,
      editorState: EditorState.createEmpty(),
      loadImage: false,
      ArticleValue: "",
      title: "",
      articles: [],
      edit: false,
      id: "",
      openDelete: false,
      readTitle: "",
      readBody: "",
      openRead: false,
      user: "",
      file: null,
      image: null,
      activePage: 0,
      totalPages: null,
      pageBound: 5,
      item: [],
      notFound: "",
    };
  }

  getUserInfo = () => {
    fetch(`http://localhost:3000/api/users/me`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "x-auth-token": ls.get("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          user: res,
          loadImage: false,
          image: require(`../../uploads/${res.profileImage}`),
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  closeModal = () => {
    this.setState({
      open: !this.state.open,
      editorState: EditorState.createEmpty(),
      title: "",
    });
  };
  handleModal = () => {
    this.setState({
      open: !this.state.open,
      editorState: EditorState.createEmpty(),
    });
  };
  handleDeleteModal = (id) => {
    this.setState({
      openDelete: !this.state.openDelete,
      id: id,
      editorState: EditorState.createEmpty(),
    });
  };
  handleEditModal = (title, body, id) => {
    const contentBlock = htmlToDraft(body);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        open: !this.state.open,
        editorState,
        title,
        edit: true,
        id,
        ArticleValue: draftToHtml(
          convertToRaw(editorState.getCurrentContent())
        ),
      });
    }
  };

  handleTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  componentDidMount() {
    this.getMyArticles();
    this.getUserInfo();
  }
  getMyArticles = () => {
    fetch(
      `http://localhost:3000/api/articles/profile?pageNumber=${this.state
        .activePage + 1}&pageSize=6`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          "x-auth-token": ls.get("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 404) {
          this.setState({ notFound: res.message });
        } else {
          let temp = [];
          for (let i = 0; i < res.totalCount; i++) {
            temp.push({});
          }
          this.setState({
            articles: res.articles,
            item: temp,
          });
        }
      })

      .catch((err) => {
        console.log("errorrrrre", err);
      });
  };
  handlePublish = () => {
    fetch(`http://localhost:3000/api/articles/`, {
      method: "POST",
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.ArticleValue,
        isPublished: true,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": ls.get("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.handleModal();
        this.getMyArticles();
      })
      .catch((err) => {
        console.log("errorrrrre", err);
      });
  };
  handleEdit = () => {
    fetch(`http://localhost:3000/api/articles/${this.state.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": ls.get("token"),
      },
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.ArticleValue,
        isPublished: true,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.handleModal();
        this.getMyArticles();
        this.setState({ edit: false });
      })
      .catch((err) => {
        console.log("errorrrrre", err);
      });
  };
  handleDelete = () => {
    fetch(`http://localhost:3000/api/articles/${this.state.id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "x-auth-token": ls.get("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.handleDeleteModal();
        this.getMyArticles();
      })
      .catch((err) => {
        console.log("errorrrrre", err);
      });
  };
  handleReadModal = (title, body) => {
    this.setState({
      readTitle: title,
      readBody: body,
      openRead: !this.state.openRead,
    });
  };
  closeReadModal = () => {
    this.setState({
      openRead: false,
    });
  };
  uploadImage = (e) => {
    let file = e.target.files[0];

    let form = new FormData();

    form.append("avatar", file);
    this.setState({ loadImage: true });
    fetch(`http://localhost:3000/api/users/profileimage`, {
      method: "POST",

      body: form,
      headers: {
        "x-auth-token": ls.get("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.getUserInfo();
      })
      .catch((err) => {
        console.log("errorrrrre", err);
      });
  };

  uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
      resolve({
        data: {
          link: require(file),
        },
      });
    });
  };
  onChange = (e) => {
    this.setState({
      ArticleValue: draftToHtml(e),
    });
  };
  render() {
    const {
      editorState,
      open,
      ArticleValue,
      openDelete,
      openRead,
      loadImage,
      user,
      image,
    } = this.state;

    return (
      <div>
        <Header />
        <MDBContainer style={{ backgroundColor: "#f7f7f7", padding: 8 }}>
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
                {/* <style jsx>
                  {`
                    img {
                      height: 400px;
                    }
                  `}
                </style> */}
                <div
                  style={{ textAlign: "justify" }}
                  dangerouslySetInnerHTML={{ __html: this.state.readBody }}
                />

                <MDBBtn
                  color="primary"
                  rounded
                  size="md"
                  style={{ marginTop: 400 }}
                  onClick={this.closeReadModal}
                >
                  Back
                </MDBBtn>
              </div>
            </Fade>
          </Modal>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            open={openDelete}
            onClose={this.handleDeleteModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openDelete}>
              <div
                style={{
                  backgroundColor: "#f7f7f7",
                  // border: "2px solid #000",
                  // boxShadow: the,
                  // height: 600,
                  // width: 800,
                  padding: 16,
                  // overflowY: "scroll",
                }}
              >
                Are you sure you want to delete this Article?
                {/* <div dangerouslySetInnerHTML={{ __html: ArticleValue }} /> */}
                <MDBBtn
                  color="primary"
                  rounded
                  size="md"
                  onClick={this.handleDeleteModal}
                >
                  Cancel
                </MDBBtn>
                <MDBBtn
                  color="danger"
                  rounded
                  size="md"
                  onClick={this.handleDelete}
                >
                  Delete
                </MDBBtn>
              </div>
            </Fade>
          </Modal>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            open={open}
            onClose={this.closeModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div
                style={{
                  backgroundColor: "#f7f7f7",
                  // border: "2px solid #000",
                  // boxShadow: the,
                  height: 600,
                  width: 1000,
                  padding: 64,
                  overflowY: "scroll",
                }}
              >
                <h2 id="transition-modal-title">
                  <MDBInput
                    label="Full Name"
                    icon="pen"
                    value={this.state.title}
                    onChange={(e) => this.handleTitle(e)}
                  />
                </h2>
                <p id="transition-modal-description">
                  <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                    // toolbar={{
                    //   image: {
                    //     uploadCallback: this.uploadImageCallBack,
                    //     alt: { present: true, mandatory: false },
                    //   },
                    // }}
                    onChange={(e) => this.onChange(e)}
                  />
                </p>
                {this.state.edit == true ? (
                  <MDBBtn
                    color="primary"
                    rounded
                    size="md"
                    style={{ marginTop: 400 }}
                    onClick={this.handleEdit}
                  >
                    Publish
                  </MDBBtn>
                ) : (
                  <MDBBtn
                    color="primary"
                    rounded
                    size="md"
                    style={{ marginTop: 400 }}
                    onClick={this.handlePublish}
                  >
                    Publish
                  </MDBBtn>
                )}
              </div>
            </Fade>
          </Modal>
          <div
            style={{
              margin: 4,
              marginTop: 100,
              marginBottom: 100,
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
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {!loadImage ? (
                  <Avatar
                    src={image}
                    style={{
                      margin: 10,
                      width: 160,
                      height: 160,
                    }}
                  />
                ) : (
                  <CircularProgress />
                )}
                <div style={{ marginTop: 8, marginBottom: 8 }}>
                  <Typography variant="h5" component="h2">
                    {this.state.user.name}
                  </Typography>
                </div>
                <div style={{ flexDirection: "row" }}>
                  <Button onClick={this.handleModal}>
                    <Tooltip title="Create Post">
                      <AddCircle fontSize="large" />
                    </Tooltip>
                  </Button>

                  <input
                    id="myInput"
                    type="file"
                    ref={(ref) => (this.upload = ref)}
                    style={{ display: "none" }}
                    onChange={this.uploadImage}
                  />

                  <Button
                    onClick={() => {
                      this.upload.click();
                    }}
                  >
                    <Tooltip title="Add Profile Image">
                      <AddAPhotoIcon fontSize="large" />
                    </Tooltip>
                  </Button>
                </div>
              </Card>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-8">
              <div className="row">
                {this.state.articles.length > 0 ? (
                  this.state.articles.map((item) => (
                    <div style={{ margin: 16 }}>
                      <CustomCard
                        style={{ width: 300 }}
                        // CardMaxWidth={200}
                        // CardMediaHeight={120}
                        ContentTitle={item.title}
                        ContentDescription={""}
                        ButtonTitle1="Edit"
                        onClickButton1={() =>
                          this.handleEditModal(item.title, item.body, item._id)
                        }
                        ButtonTitle2="Delete"
                        onClickButton2={() => this.handleDeleteModal(item._id)}
                        onImageClick={() =>
                          this.handleReadModal(item.title, item.body)
                        }
                      />
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p>{this.state.notFound}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
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
                this.setState(
                  {
                    activePage:
                      this.state.activePage > 0
                        ? this.state.activePage - 1
                        : this.state.activePage,
                  },
                  () => this.getMyArticles()
                )
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
                          this.getMyArticles()
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
                this.setState(
                  {
                    activePage:
                      this.state.activePage < this.state.item.length - 1
                        ? this.state.activePage + 1
                        : this.state.activePage,
                  },
                  () => this.getMyArticles()
                )
              }
            />
          </Pagination>
        </MDBContainer>
      </div>
    );
  }
}
