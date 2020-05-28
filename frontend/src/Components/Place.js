import React from 'react'
import styled from "styled-components";

const Container = styled.div`
  width: 30%;
  height: 330px;
  /* border: 1px solid black; */
  border-radius: 10%;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 70%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10%;
`;

const Description = styled.div`

`;

function Place({ name, image }) {
  return (
    <Container>
      <ImageBox>
        <Image src={`http://localhost:5000/${image}`} />
      </ImageBox>
    </Container>
  )
}

export default Place
