import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 45%;
  /* background-color: green; */
`;

const Map = ({ name, address }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP}&libraries=services,clusterer&autoload=false`;
    document.head.appendChild(script);
    // kakao.maps.load(() => {
      script.onload = () => {
        const { kakao } = window;
        kakao.maps.load(() => {
        let container = document.getElementById("map");
        let options = {
          center: new kakao.maps.LatLng(37.506502, 127.053617),
          level: 7,
        };

        const map = new kakao.maps.Map(container, options);

        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(`${address}`, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            var marker = new kakao.maps.Marker({
              map: map,
              position: coords,
            });

            var infowindow = new kakao.maps.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:6px 0;">${name}</div>`,
            });
            infowindow.open(map, marker);

            map.setCenter(coords);
          }
        });
      });
    };
  }, []);

  return <Container id="map"></Container>;
};

export default Map;
