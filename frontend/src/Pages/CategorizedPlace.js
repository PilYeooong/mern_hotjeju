import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import Place from "../Components/Place";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_CATEGORIZED_PLACES_REQUEST } from "../_Actions/types";

const Container = styled.div`
  width: 80%;
  height: 80vh;
  margin: 0 auto;
  padding-top: 3rem;
  display: flex;
  flex-wrap: wrap;
`;

function CategorizedPlace(props) {
  const dispatch = useDispatch();
  const { places } = useSelector((state) => state.place);
  const {
    match: {
      params: { category },
    },
  } = props;
  useEffect(() => {
    dispatch({
      type: LOAD_CATEGORIZED_PLACES_REQUEST,
      data: category,
    });
  }, []);

  return (
    <div>
      <Helmet>
        <title>핫 제주 | Hot Jeju</title>
      </Helmet>
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

export default CategorizedPlace;
