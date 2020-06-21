import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { LOAD_USER_REQUEST } from "../../_Actions/types";

import styled from "styled-components";

import MyPlace from "../../Components/Profile/MyPlace";
import WishList from "../../Components/Profile/WishList";

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
        {userInfo && (
          <>
            <h3>{userInfo.nickname}</h3>
            <h3>{userInfo.email}</h3>
          </>
        )}
      </UserInfo>
      <h4>찜한 핫플</h4>
      <PlaceList>
        {userInfo &&
          userInfo.wishList.map((place) => (
            <WishList key={place._id} id={place._id} name={place.name} image={place.images[0]}/>
          ))}
      </PlaceList>
      <h4>업로드한 핫플</h4>
      <PlaceList>
        {userInfo &&
          userInfo.places.map((place) => (
            <MyPlace key={place._id} id={place._id} name={place.name} image={place.images[0]} likeCount={place.likers.length} />
          ))}
      </PlaceList>
    </Container>
  );
}

Profile.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default Profile;
