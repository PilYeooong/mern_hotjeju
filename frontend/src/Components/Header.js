import React from "react";
import { Link, withRouter } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../_Actions/user_action";

import styled from "styled-components";

import { notification } from "antd";
import { SmileOutlined, FireFilled } from "@ant-design/icons";

import SearchForm from "./SearchForm";

const Header = styled.header`
  width: 100%;
  border-bottom: 1px solid #efefef;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
`;

const HeaderColumn = styled.div`
  width: 33%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SiteName = styled(Link)`
  color: black;
  font-size: 4rem;
`;

const BigFireFilled = styled(FireFilled)`
  font-size: 4rem;
`;
const ProfileLink = styled(Link)`
  margin-left: 1rem;
`;
const SignUpLink = styled(Link)`
  margin-left: 1rem;
`;

const LogoutLink = styled(Link)`
  margin-left: 1rem;
`;

const LoginLink = styled(Link)`
  margin-left: 1rem;
`;

const PlaceNewLink = styled(Link)``;

export default withRouter((props) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const LogOut = () => {
    dispatch(logoutUser()).then((response) => {
      if (response.payload.logoutSuccess) {
        notification.open({
          message: "로그아웃 완료",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
      }
    });
  };

  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <SiteName to="/" className>
            HotJeju
          </SiteName>
          <BigFireFilled />
        </HeaderColumn>
        <HeaderColumn>
          <SearchForm history={props.history} />
        </HeaderColumn>
        <HeaderColumn>
          {userData && userData.isAuth ? (
            <>
              <PlaceNewLink to="/place/new">핫플 추가</PlaceNewLink>
              <ProfileLink to="/profile">프로필</ProfileLink>
              <LogoutLink to="/" onClick={LogOut}>
                로그아웃
              </LogoutLink>
            </>
          ) : (
            <>
              <SignUpLink to="/accounts/signup">회원가입</SignUpLink>
              <LoginLink to="/accounts/login">로그인</LoginLink>
            </>
          )}
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});
