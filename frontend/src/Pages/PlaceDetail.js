import React, { useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_PLACE_DETAIL_REQUEST, LOAD_COMMENTS_REQUEST } from "../_Actions/types";
import { Button, Card } from "antd";
import { LikeOutlined, LikeFilled, HeartOutlined } from '@ant-design/icons';
import { SERVER } from "../Utils/api";

import CommentList from "../Components/CommentList";

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
  width: 50%;
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
  const isLiked = false;
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
            <PlaceCard cover={<PlaceImage src={`${SERVER}/${placeDetail.images[0]}`} />} actions={[ isLiked ? <LikeFilled key="like" /> : <LikeOutlined key="unlike" />, <HeartOutlined key="wishlist"/>]} >
              <Card.Meta title={placeDetail.name} description={placeDetail.description} />
              <PlaceAddress>주소 - {placeDetail.address}</PlaceAddress>
            </PlaceCard>
            <CommentList />
          </Container>
        </Wrapper>
      )}
    </>
  );
}

export default PlaceDetail;
