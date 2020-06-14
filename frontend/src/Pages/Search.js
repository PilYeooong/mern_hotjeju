import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import Place from "../Components/Place";
import { useDispatch, useSelector } from "react-redux";
// import { LOAD_MAIN_PLACES_REQUEST } from "../_Actions/types";

const Container = styled.div`
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  padding-top: 3rem;
  display: flex;
  flex-wrap: wrap;
`;

function Search() {
  const dispatch = useDispatch();
  const { places } = useSelector(state => state.place);

  return (
    <div>
      <Helmet>
        <title>검색 결과 | Hot Jeju</title>
      </Helmet>
      {/* <ImageSlide /> */}
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

export default Search;
