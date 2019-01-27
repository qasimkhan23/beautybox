import React from "react";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from "mdbreact";

const Slider = () => {
  return (
    <MDBContainer>
      <MDBCarousel
        activeItem={3}
        length={3}
        slide={true}
        showControls={false}
        showIndicators={true}
        multiItem
      >
        <div style={{ backgroundColor: "#faefff", marginTop: 50, padding: 20 }}>
          <MDBCarouselInner>
            <MDBCarouselItem itemId="1">
              <MDBRow>
                <MDBCol md="4">
                  <MDBCard className="mb-5">
                    <MDBCardImage
                      className="img-fluid"
                      src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
                    />
                    <MDBCardBody>
                      <MDBCardTitle>MDBCard title</MDBCardTitle>
                      <MDBCardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </MDBCardText>
                      <MDBBtn color="primary">MDBBtn</MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>

                <MDBCol md="4" className="clearfix d-none d-md-block">
                  <MDBCard className="mb-5">
                    <MDBCardImage
                      className="img-fluid"
                      src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(18).jpg"
                    />
                    <MDBCardBody>
                      <MDBCardTitle>MDBCard title</MDBCardTitle>
                      <MDBCardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </MDBCardText>
                      <MDBBtn color="primary">MDBBtn</MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>

                <MDBCol md="4" className="clearfix d-none d-md-block">
                  <MDBCard className="mb-5">
                    <MDBCardImage
                      className="img-fluid"
                      src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(35).jpg"
                    />
                    <MDBCardBody>
                      <MDBCardTitle>MDBCard title</MDBCardTitle>
                      <MDBCardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </MDBCardText>
                      <MDBBtn color="primary">MDBBtn</MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBCarouselItem>

            <MDBCarouselItem itemId="2">
              <MDBRow>
                <MDBCol md="4">
                  <MDBCard className="mb-5">
                    <MDBCardImage
                      className="img-fluid"
                      src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(60).jpg"
                    />
                    <MDBCardBody>
                      <MDBCardTitle>MDBCard title</MDBCardTitle>
                      <MDBCardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </MDBCardText>
                      <MDBBtn color="primary">MDBBtn</MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol md="4" className="clearfix d-none d-md-block">
                  <MDBCard className="mb-5">
                    <MDBCardImage
                      className="img-fluid"
                      src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(47).jpg"
                    />
                    <MDBCardBody>
                      <MDBCardTitle>MDBCard title</MDBCardTitle>
                      <MDBCardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </MDBCardText>
                      <MDBBtn color="primary">MDBBtn</MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol md="4" className="clearfix d-none d-md-block">
                  <MDBCard className="mb-5">
                    <MDBCardImage
                      className="img-fluid"
                      src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(48).jpg"
                    />
                    <MDBCardBody>
                      <MDBCardTitle>MDBCard title</MDBCardTitle>
                      <MDBCardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </MDBCardText>
                      <MDBBtn color="primary">MDBBtn</MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="3">
              <MDBRow>
                <MDBCol md="4">
                  <MDBCard className="mb-5">
                    <MDBCardImage
                      className="img-fluid"
                      src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(53).jpg"
                    />
                    <MDBCardBody>
                      <MDBCardTitle>MDBCard title</MDBCardTitle>
                      <MDBCardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </MDBCardText>
                      <MDBBtn color="primary">MDBBtn</MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol md="4" className="clearfix d-none d-md-block">
                  <MDBCard className="mb-5">
                    <MDBCardImage
                      className="img-fluid"
                      src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(45).jpg"
                    />
                    <MDBCardBody>
                      <MDBCardTitle>MDBCard title</MDBCardTitle>
                      <MDBCardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </MDBCardText>
                      <MDBBtn color="primary">MDBBtn</MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol md="4" className="clearfix d-none d-md-block">
                  <MDBCard className="mb-5">
                    <MDBCardImage
                      className="img-fluid"
                      src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(41).jpg"
                    />
                    <MDBCardBody>
                      <MDBCardTitle>MDBCard title</MDBCardTitle>
                      <MDBCardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </MDBCardText>
                      <MDBBtn color="primary">MDBBtn</MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBCarouselItem>
          </MDBCarouselInner>
        </div>
      </MDBCarousel>
    </MDBContainer>
  );
};

export default Slider;
