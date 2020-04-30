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
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Settings from "@material-ui/icons/Settings";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import ls from "local-storage";
import { MDBBtn, MDBContainer, MDBInput } from "mdbreact";
import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { CustomCard } from "../../components/Card/Card";
import Header from "../../components/Header/header";
var images = require.context("../../uploads", true);

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
        console.log("resss", res);
        this.setState({
          user: res,
          loadImage: false,
          image: require(`../../uploads/${res.profileImage}`),
        });
      })
      .catch((err) => {
        console.log("errorrrrre", err);
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
    });
  };
  handleDeleteModal = (id) => {
    this.setState({
      openDelete: !this.state.openDelete,
      id: id,
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
    console.log("editor state", convertToRaw(editorState.getCurrentContent()));
    this.setState({
      editorState,
    });
  };

  componentDidMount() {
    this.getMyArticles();
    this.getUserInfo();
  }
  getMyArticles = () => {
    fetch(`http://localhost:3000/api/articles/profile`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-auth-token": ls.get("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("resss", res);
        //         const blocksFromHtml = htmlToDraft(res[0].body);
        // const { contentBlocks, entityMap } = blocksFromHtml;
        // const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        // const editorState = EditorState.createWithContent(contentState);
        // this.setState({
        //   test:blocksFromHtml
        // })
        this.setState({
          articles: res,
        });
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
        console.log("resss", res);
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
        console.log("resss", res);
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
        console.log("resss", res);
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
        console.log("ressssss====upload image=========", res);
        this.getUserInfo();
        
      })
      .catch((err) => {
        console.log("errorrrrre", err);
      });
  };

  // onChange = (e) => {
  //   this.setState({ file: e.target.files[0] }, () => this.uploadImage());
  // };
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
    console.log("userrr", user.profileImage);

    return (
      <div>
        <Header />
        <MDBContainer style={{ backgroundColor: "#f7f7f7" }}>
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
                  overflowY: "scroll",
                }}
              >
                Are you sure you want to delete this Article?
                <div dangerouslySetInnerHTML={{ __html: ArticleValue }} />
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
                  width: 1200,
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
                    onChange={(e) =>
                      this.setState({
                        ArticleValue: draftToHtml(e),
                      })
                    }
                  />

                  <textarea disabled value={ArticleValue} />
                  <textarea disabled value={this.state.test} />

                  <div dangerouslySetInnerHTML={{ __html: ArticleValue }} />
                </p>
                {this.state.edit == true ? (
                  <MDBBtn
                    color="primary"
                    rounded
                    size="md"
                    onClick={this.handleEdit}
                  >
                    Publish
                  </MDBBtn>
                ) : (
                  <MDBBtn
                    color="primary"
                    rounded
                    size="md"
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
                {this.state.articles.length > 0
                  ? this.state.articles.map((item) => (
                      <div style={{ margin: 16 }}>
                        <CustomCard
                          style={{ width: 300 }}
                          // CardMaxWidth={200}
                          // CardMediaHeight={120}
                          ContentTitle={item.title}
                          ContentDescription={""}
                          ButtonTitle1="Edit"
                          onClickButton1={() =>
                            this.handleEditModal(
                              item.title,
                              item.body,
                              item._id
                            )
                          }
                          ButtonTitle2="Delete"
                          onClickButton2={() =>
                            this.handleDeleteModal(item._id)
                          }
                          onClick={() =>
                            this.handleReadModal(item.title, item.body)
                          }
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </MDBContainer>
      </div>
    );
  }
}
