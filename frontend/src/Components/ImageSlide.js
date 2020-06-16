import React from "react";
import { Zoom } from "react-slideshow-image";

import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 80%;
  height: 60vh;
  margin: 0 auto 3rem;
  padding-top: 2rem;
  & * {
    width: 100%;
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
        {images.map((image, index) => (
          <Link to={`/place/${image.placeId}`}>
            <Image key={index} src={`http://localhost:5000/${image.src}`} />
          </Link>
        ))}
      </Zoom>
    </Container>
  );
};

export default ImageSlide;
