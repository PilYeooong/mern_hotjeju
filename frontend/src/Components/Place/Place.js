import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { SERVER } from "../../Utils/api";

import styled from "styled-components";
import { StarTwoTone } from "@ant-design/icons";

const Container = styled.div`
  width: 30%;
  height: 330px;
  border-radius: 5%;
  margin-right: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #dbdbdb;
`;

const PlaceBox = styled.div`
  width: 100%;
  height: 70%;
`;

const PlaceLink = styled(Link)``;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const Description = styled.div`
  padding: 1em;
  font-size: 20px;
  display: flex;
`;

const Name = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const Grade = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 20px;
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
        </Description>
        <Grade>
            <Star twoToneColor="#eb2f96" />
            <LikeCount>{likeCount}</LikeCount>
          </Grade>
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
