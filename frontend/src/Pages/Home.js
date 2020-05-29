import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Axios from "axios";

import Header from "../Components/Header";
import Place from "../Components/Place"

const Container = styled.div`
  width: 80%;
  height: 80vh;
  margin: 0 auto;
  padding-top: 3rem;
  display: flex;
  justify-content: space-between;
`;
function Home() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    Axios.get('api/places').then(response => {
      console.log(response.data.places);
      setPlaces(response.data.places);
    })
  }, [])
 
  return (
    <div>
      <Header />
      <Container>
      {places && places.map((place, idx) => <Place key={idx} id={place._id} name={place.name} image={place.images[0]} />)}
      </Container>
    </div>
  );
}

export default Home;
