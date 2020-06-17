import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { Button } from "antd";
import {
  LOAD_CATEGORIZED_PLACES_REQUEST,
  LOAD_MAIN_PLACES_REQUEST,
} from "../_Actions/types";

const MenuBar = styled.div`
  width: 50%;
  height: 20%;
  margin: 0 auto;
  margin-top: 6rem;
  display: flex;
  justify-content: space-between;
`;

const All = styled(Button)`
  cursor: pointer;
  color: black;
  font-size: 20px;
`;

const Cafe = styled(Button)`
  cursor: pointer;
  color: black;
  font-size: 20px;
`;

const Ocean = styled(Button)`
  cursor: pointer;
  color: black;
  font-size: 20px;
`;

const Restaurant = styled(Button)`
  cursor: pointer;
  color: black;
  font-size: 20px;
`;

const Museum = styled(Button)`
  cursor: pointer;
  color: black;
  font-size: 20px;
`;

const Category = () => {
  const dispatch = useDispatch();

  const onClickAll = () => {
    dispatch({
      type: LOAD_MAIN_PLACES_REQUEST,
    });
  };
  const onClickCategory = (category) => () => {
    dispatch({
      type: LOAD_CATEGORIZED_PLACES_REQUEST,
      data: category,
    });
  };

  return (
    <MenuBar>
      <All type="link" onClick={onClickAll}>
        전체보기
      </All>
      <Cafe type="link" onClick={onClickCategory("cafe")}>
        카페
      </Cafe>
      <Ocean type="link" onClick={onClickCategory("ocean")}>해변</Ocean>
      <Restaurant type="link" onClick={onClickCategory("restaurant")}>식당</Restaurant>
      <Museum type="link" onClick={onClickCategory("museum")}>박물관</Museum>
    </MenuBar>
  );
};

export default Category;
