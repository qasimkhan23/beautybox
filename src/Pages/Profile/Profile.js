import { CustomCard } from "../../components/Card/Card";
import { MDBContainer } from "mdbreact";
import React from "react";
import Header from "../../components/Header/header";
import AddCircle from "@material-ui/icons/AddCircle";
import Settings from "@material-ui/icons/Settings";
import { MDBInput } from "mdbreact";

import {
  Card,
  Avatar,
  Button,
  Tooltip,
  Typography,
  Modal,
  Backdrop,
  Fade
} from "@material-ui/core";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      editorState: EditorState.createEmpty(),
      ArticleValue: ""
    };
  }
  handleModal = () => {
    this.setState({
      open: !this.state.open
    });
  };
  onEditorStateChange = editorState => {
    console.log("editor state", convertToRaw(editorState.getCurrentContent()));
    this.setState({
      editorState
    });
  };

  render() {
    const { editorState, open, ArticleValue } = this.state;

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
              justifyContent: "center"
            }}
            open={open}
            onClose={this.handleModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Fade in={open}>
              <div
                style={{
                  backgroundColor: "#f7f7f7",
                  // border: "2px solid #000",
                  // boxShadow: the,
                  height: 600,
                  width: 800,
                  padding: 16
                }}
              >
                <h2 id="transition-modal-title">
                  <MDBInput
                    label="Full Name"
                    icon="pen"
                    onChange={e => console.log("text", e.target.value)}
                  />
                </h2>
                <p id="transition-modal-description">
                  <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                    onChange={e =>
                      this.setState({
                        ArticleValue: draftToHtml(e)
                      })
                    }
                  />
                  <textarea disabled value={ArticleValue} />
                  <div dangerouslySetInnerHTML={{ __html: ArticleValue }} />
                </p>
              </div>
            </Fade>
          </Modal>
          <div
            style={{
              margin: 4,
              marginTop: 100,
              marginBottom: 100
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
                  flexDirection: "column"
                }}
              >
                <Avatar
                  src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
                  style={{
                    margin: 10,
                    width: 160,
                    height: 160
                  }}
                />
                <div style={{ marginTop: 8, marginBottom: 8 }}>
                  <Typography variant="h5" component="h2">
                    Writer
                  </Typography>
                </div>
                <div style={{ flexDirection: "row" }}>
                  <Button onClick={this.handleModal}>
                    <Tooltip title="Create Post">
                      <AddCircle fontSize="large" />
                    </Tooltip>
                  </Button>
                  <Button>
                    <Tooltip title="Settings">
                      <Settings fontSize="large" />
                    </Tooltip>
                  </Button>
                </div>
              </Card>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-8">
              <div className="row">
                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>
                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>
                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>
                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>

                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>
                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>
                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>
                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>
                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>
                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>
                <div style={{ margin: 16 }}>
                  <CustomCard
                    CardMaxWidth={200}
                    CardMediaHeight={120}
                    onClick={() => console.log("clickeddd")}
                  />
                </div>

                {/* <div className="col-md-5" style={{ margin: 8 }}>
                  <CustomCard />
                </div> */}
              </div>
            </div>
          </div>
        </MDBContainer>
      </div>
    );
  }
}
