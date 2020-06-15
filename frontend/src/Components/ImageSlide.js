import React from "react";
import { Zoom } from "react-slideshow-image";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 50vh;
  background-color: lightgray;
  & * {
    height: 100%;
  }
`;

const Image = styled.img`
  width: 100%;
`;

const zoomOutProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  scale: 0.4,
  arrows: true,
};

const ImageSlide = ({ images }) => {
  return (
    <Container>
        <Zoom {...zoomOutProperties}>
          {
            images.map((each, index) => <Image key={index} src={`http://localhost:5000/${each}`} />)
          }
        </Zoom>
    </Container>
  );
};

export default ImageSlide;
