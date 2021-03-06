import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_MAIN_PLACES_REQUEST,
  LOAD_IMAGES_REQUEST,
  SORT_BY_LIKES,
} from "../_Actions/types";

import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Button } from "antd";

import Place from "../Components/Place/Place";
import ImageSlide from "../Components/ImageSlide";
import Category from "../Components/Category";

const Container = styled.div`
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  padding: 3rem 0 0 5rem;
  display: flex;
  flex-wrap: wrap;
`;

const Order = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
`;

const OrderByRank = styled(Button)``;

function Home() {
  const dispatch = useDispatch();
  const { places } = useSelector((state) => state.place);
  const { images } = useSelector((state) => state.image);

  useEffect(() => {
    dispatch({
      type: LOAD_MAIN_PLACES_REQUEST,
    });
    dispatch({
      type: LOAD_IMAGES_REQUEST,
    });
  }, []);

  const orderByRank = () => {
    dispatch({
      type: SORT_BY_LIKES,
    });
  };

  return (
    <div>
      <Helmet>
        <title>핫 제주 | Hot Jeju</title>
      </Helmet>
      {images && <ImageSlide images={images} />}
      <Category />
      <Order>
        <OrderByRank type="link" onClick={orderByRank}>
          추천순
        </OrderByRank>
      </Order>
      <Container>
        {places &&
          places.map((place, idx) => (
            <Place
              key={idx}
              id={place._id}
              name={place.name}
              image={place.images[0]}
              likeCount={place.likers.length}
            />
          ))}
      </Container>
    </div>
  );
}

export default Home;
