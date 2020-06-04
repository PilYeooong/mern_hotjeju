import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Header from "../Components/Header";
import Axios from "axios";

const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  padding-top: 3rem;
`;
const Container = styled.div`
  width: 80%;
  height: 70%;
  margin: 0 auto;
`;
const PlaceName = styled.h5``;
const PlaceImageBox = styled.div`
  width: 100%;
`;
const PlaceImage = styled.img`
  width: 350px;
  height: 350px;
`;
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
        console.log(response.data);
        setPlaceInfo(response.data.place);
      } else {
        console.log("fail to load");
      }
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Hot Jeju</title>
      </Helmet>
      {placeInfo && placeInfo.images && (
        <Wrapper>
          <Container>
            <PlaceImageBox>
              {placeInfo.images.map((image, idx) => (
                <PlaceImage key={idx} src={`http://localhost:5000/${image}`} />
              ))}
            </PlaceImageBox>
            <PlaceName>{placeInfo.name}</PlaceName>
            <PlaceDescription>{placeInfo.description}</PlaceDescription>
            <PlaceAddress>{placeInfo.address}</PlaceAddress>
          </Container>
        </Wrapper>
      )}
    </>
  );
}

export default PlaceDetail;
