import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { REMOVE_PLACE_REQUEST } from "../../_Actions/types";

import { SERVER } from "../../Utils/api";

import styled from "styled-components";
import { StarTwoTone, DeleteOutlined, EditOutlined } from "@ant-design/icons";

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
  flex-direction: column;
`;

const PlaceInfo = styled.div`
  display: flex;
`;

const Name = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 1rem;
`;
const DeleteBtn = styled(DeleteOutlined)`
  cursor: pointer;
`;
const EditBtn = styled(EditOutlined)`
  cursor: pointer;
`;

function MyPlace({ id, name, image }) {
  const dispatch = useDispatch();

  const onRemovePlace = () => {
    dispatch({
      type: REMOVE_PLACE_REQUEST,
      data: id,
    });
  };
  return (
    <Container>
      <PlaceBox>
        <PlaceLink to={`/place/${id}`}>
          <Image src={`${SERVER}/${image}`} />
        </PlaceLink>
        <Description>
          <PlaceInfo>
            <Name>{name}</Name>
          </PlaceInfo>
          <ButtonBox>
            <DeleteBtn onClick={onRemovePlace} />
            <Link to={`/place/${id}/edit`}>
              <EditBtn />
            </Link>
          </ButtonBox>
        </Description>
      </PlaceBox>
    </Container>
  );
}

MyPlace.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default MyPlace;
