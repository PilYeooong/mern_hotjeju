import React, { useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_PLACE_DETAIL_REQUEST } from "../_Actions/types";
import { Card, Comment, Tooltip } from "antd";
import { SERVER } from "../Utils/api";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 3rem;
`;
const Container = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
`;
const PlaceCard = styled(Card)`
  width: 100%;
`;
const PlaceImageBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const PlaceImage = styled.img`
  width: 100%;
  height: 520px;
`;

const PlaceAddress = styled.div`
  margin-top: 2rem;
`;

function PlaceDetail(props) {
  const {
    match: {
      params: { placeId },
    },
  } = props;
  const dispatch = useDispatch();
  const { placeDetail } = useSelector((state) => state.place);

  useEffect(() => {
    dispatch({
      type: LOAD_PLACE_DETAIL_REQUEST,
      data: placeId,
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>Hot Jeju</title>
      </Helmet>
      {placeDetail && placeDetail.images && (
        <Wrapper>
          <Container>
            <PlaceCard cover={<PlaceImage src={`${SERVER}/${placeDetail.images[0]}`} />}>
              <Card.Meta title={placeDetail.name} description={placeDetail.description} />
              <PlaceAddress>주소 - {placeDetail.address}</PlaceAddress>
            </PlaceCard>
          </Container>
        </Wrapper>
      )}
    </>
  );
}

export default PlaceDetail;
