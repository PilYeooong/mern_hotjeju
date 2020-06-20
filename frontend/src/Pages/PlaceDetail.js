import React, { useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_PLACE_DETAIL_REQUEST,
  TOGGLE_LIKE_REQUEST,
  TOGGLE_WISH_REQUEST,
} from "../_Actions/types";
import { Card } from "antd";
import { LikeOutlined, LikeFilled, HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import { SERVER } from "../Utils/api";

import CommentList from "../Components/Comment/CommentList";
import Map from "../Components/Map";
import { Link } from "react-router-dom";

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

const PlaceInfo = styled.div`
  display: flex;
  justify-content: space-around;
 `;
const PlaceCard = styled(Card)`
  width: 45%;
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

  const toggleLike = () => {
    dispatch({
      type: TOGGLE_LIKE_REQUEST,
      data: {
        placeId: placeId,
        isLiked: placeDetail.isLiked,
      },
    });
  };

  const toggleWish = () => {
    dispatch({
      type: TOGGLE_WISH_REQUEST,
      data: {
        placeId: placeId,
        isWished: placeDetail.isWished,
      }
    })
  }

  return (
    <>
      <Helmet>
        <title>Hot Jeju</title>
      </Helmet>
      {placeDetail && placeDetail.images && (
        <Wrapper>
          <Container>
            <PlaceInfo>
              <PlaceCard
                cover={
                  <PlaceImage src={`${SERVER}/${placeDetail.images[0]}`} />
                }
                actions={[
                  placeDetail.isLiked ? (
                    <LikeFilled key="unlike" onClick={toggleLike} />
                  ) : (
                    <LikeOutlined key="like" onClick={toggleLike} />
                  ),
                  placeDetail.isWished ? ( 
                    <HeartTwoTone key="unwish" twoToneColor="#eb2f96" onClick={toggleWish}/> 
                    ) : (
                      <HeartOutlined key="wish" onClick={toggleWish} />
                    ),
                ]}
              >
                <Card.Meta
                  title={placeDetail.name}
                  description={placeDetail.description}
                />
                <PlaceAddress>주소 - {placeDetail.address}</PlaceAddress>
              </PlaceCard>
              <Map name={placeDetail.name} address={placeDetail.address} />
            </PlaceInfo>
            <Link to={`${placeDetail._id}/edit`}>수정하기</Link>
            <CommentList />
          </Container>
        </Wrapper>
      )}
    </>
  );
}

export default PlaceDetail;
