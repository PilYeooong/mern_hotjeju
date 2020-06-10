import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { SERVER } from "../Utils/api";

const Container = styled.div`
  width: 30%;
  height: 330px;
  border-radius: 10%;
  margin-right: 2rem;
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
  border-radius: 10%;
`;

const Description = styled.div``;

function Place({ id, name, image }) {
  return (
    <Container>
      <PlaceBox>
        <PlaceLink to={`/place/${id}`} params={{ placeId: 1 }}>
          <Image src={`${SERVER}/${image}`} />
        </PlaceLink>
        <Description>{name}</Description>
      </PlaceBox>
    </Container>
  );
}

Place.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Place;
