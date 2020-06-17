import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { SERVER } from "../Utils/api";

import styled from "styled-components";
import { StarTwoTone } from "@ant-design/icons";

const Container = styled.div`
  width: 30%;
  height: 330px;
  border-radius: 5%;
  margin-right: 1.5rem;
  border: 1px solid #dbdbdb;
`;

const PlaceBox = styled.div`
  width: 100%;
  height: 70%;
`;

const PlaceLink = styled(Link)`
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const Description = styled.div`
  padding: 1em;
  font-size: 20px;
  display: flex;
  /* justify-content: center; */
`;

const Name = styled.div`
  width: 60%;
  display: flex;
  justify-content: flex-end;
`;

const Grade = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 40%;
`;

const Star = styled(StarTwoTone)`
  margin-right: 0.5rem;
`;
const LikeCount = styled.div``;

function Place({ id, name, image, likeCount }) {
  return (
    <Container>
      <PlaceBox>
        <PlaceLink to={`/place/${id}`} params={{ placeId: 1 }}>
          <Image src={`${SERVER}/${image}`} />
        </PlaceLink>
        <Description>
          <Name>{name}</Name>
          <Grade>
            <Star twoToneColor="#eb2f96" />
            <LikeCount>{likeCount}</LikeCount>
          </Grade>
        </Description>
      </PlaceBox>
    </Container>
  );
}

Place.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
};

export default Place;
