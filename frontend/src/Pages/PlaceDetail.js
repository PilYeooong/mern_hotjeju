import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../Components/Header";
import Axios from "axios";

const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  padding-top: 3rem;
`;
const Container = styled.div`
  width: 50%;
  height: 70%;
  margin: 0 auto;
`;
const PlaceName = styled.h5``;
const PlaceImage = styled.img``;
const PlaceDescription = styled.div``;
const PlaceAddress = styled.div``;

function PlaceDetail(props) {
  const {
    match: {
      params: { placeId },
    },
  } = props;

  const [placeInfo, setPlaceInfo] = useState({});
  useEffect(() => {
    Axios.get(`/api/places/${placeId}`).then((response) => {
      if (response.data.success) {
        setPlaceInfo(response.data.place);
      } else {
        console.log("fail to load");
      }
    });
  }, []);

  useEffect(() => {
    console.log(placeInfo);
  }, [placeInfo]);

  return (
    <div>
      <Header />
      {placeInfo && placeInfo.images && (
        <Wrapper>
          <Container>
            <PlaceName>{placeInfo.name}</PlaceName>
            {placeInfo.images.map((image, idx) => (
              <PlaceImage
                key={idx}
                src={`http://localhost:5000/${image}`}
                style={{ width: "100px", height: "100px" }}
              />
            ))}
            <PlaceDescription>{placeInfo.description}</PlaceDescription>
            <PlaceAddress>{placeInfo.address}</PlaceAddress>
          </Container>
        </Wrapper>
      )}
    </div>
  );
}

export default PlaceDetail;
