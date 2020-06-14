import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import Place from "../Components/Place";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  padding-top: 3rem;
  display: flex;
  flex-wrap: wrap;
`;

const SearchResult = styled.div`
  width: 100%;
  height: 10%;
  font-size: 2em;
  text-align: center;
`;

function Search() {
  const { places } = useSelector((state) => state.place);

  useEffect(() => {
    if (places) {
      console.log(places.length);
    }
  }, [places]);

  return (
    <div>
      <Helmet>
        <title>검색 결과 | Hot Jeju</title>
      </Helmet>
      <Container>
        {places && places.length !== 0 ? (
          places.map((place, idx) => (
            <Place
              key={idx}
              id={place._id}
              name={place.name}
              image={place.images[0]}
            />
          ))
        ) : (
          <SearchResult>검색결과가 존재하지 않습니다.</SearchResult>
        )}
      </Container>
    </div>
  );
}

export default Search;
