import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { SERVER } from "../Utils/api";

import styled from "styled-components";
import { CloseOutlined } from "@ant-design/icons";
import { TOGGLE_WISH_REQUEST } from "../_Actions/types";

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
  flex-direction: column;
  justify-content: space-between;
`;

const Name = styled.div`
  width: 60%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

function WishList({ id, name, image }) {

  const dispatch = useDispatch();
  const removeWish = () => {
    dispatch({
      type: TOGGLE_WISH_REQUEST,
      data: {
        placeId: id,
        isWished: true,
      }
    })
  }
  return (
    <Container>
      <PlaceBox>
        <PlaceLink to={`/place/${id}`} params={{ placeId: 1 }}>
          <Image src={`${SERVER}/${image}`} />
        </PlaceLink>
        <Description>
          <Name>{name}</Name>
          <CloseOutlined onClick={removeWish} />
        </Description>
      </PlaceBox>
    </Container>
  );
}

WishList.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default WishList;
