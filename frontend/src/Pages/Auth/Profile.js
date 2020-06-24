import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { LOAD_USER_REQUEST } from "../../_Actions/types";

import styled from "styled-components";

import MyPlace from "../../Components/Profile/MyPlace";
import WishList from "../../Components/Profile/WishList";
import EditNickName from "../../Components/Profile/EditNickName";

const Container = styled.div`
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  padding-top: 3rem;
`;

const UserInfo = styled.div`
  height: 30%;
`;

const PlaceList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 1rem;
`;

const WishedPlaces = styled.h4`
  font-size: 20px;
  font-weight: bold;
`;

const UploadedPlaces = styled.h4`
  font-size: 20px;
  font-weight: bold;
  padding-top: 1rem;
`;

function Profile() {
  const dispatch = useDispatch();
  const { userData, userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData) {
      dispatch({
        type: LOAD_USER_REQUEST,
        data: userData._id,
      });
    }
  }, [userData]);

  return (
    <Container>
      <UserInfo>
        {userInfo && userInfo.nickname && (
          <>
            <EditNickName userInfo={userInfo} />
          </>
        )}
      </UserInfo>
      <WishedPlaces>찜한 핫플</WishedPlaces>
      <PlaceList>
        {userInfo &&
          userInfo.wishList.map((place) => (
            <WishList
              key={place._id}
              id={place._id}
              name={place.name}
              image={place.images[0]}
            />
          ))}
      </PlaceList>
      <UploadedPlaces>업로드한 핫플</UploadedPlaces>
      <PlaceList>
        {userInfo &&
          userInfo.places.map((place) => (
            <MyPlace
              key={place._id}
              id={place._id}
              name={place.name}
              image={place.images[0]}
              creator={userInfo._id}
            />
          ))}
      </PlaceList>
    </Container>
  );
}


export default Profile;
