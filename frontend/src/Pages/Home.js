import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import Place from "../Components/Place";
import ImageSlide from "../Components/ImageSlide";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MAIN_PLACES_REQUEST, LOAD_IMAGES_REQUEST } from "../_Actions/types";

const Container = styled.div`
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  padding-top: 3rem;
  display: flex;
  flex-wrap: wrap;
`;

function Home() {
  const dispatch = useDispatch();
  const { places } = useSelector(state => state.place);
  const { images } = useSelector(state => state.image);

  useEffect(() => {
    dispatch({
      type: LOAD_MAIN_PLACES_REQUEST
    })
    dispatch({
      type: LOAD_IMAGES_REQUEST
    })
  }, []);

  return (
    <div>
      <Helmet>
        <title>핫 제주 | Hot Jeju</title>
      </Helmet>
      {images && <ImageSlide images={images} />}
      <Container>
        {places &&
          places.map((place, idx) => (
            <Place
              key={idx}
              id={place._id}
              name={place.name}
              image={place.images[0]}
            />
          ))}
      </Container>
    </div>
  );
}

export default Home;
