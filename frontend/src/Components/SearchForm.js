import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { SEARCH_PLACE_REQUEST } from "../_Actions/types";

import { Input } from "antd";

const SearchForm = ({ history }) => {
  const dispatch = useDispatch();
  const [searchValue, SetSearchValue] = useState("");
  const onChangeSearchValue = (e) => {
    SetSearchValue(e.target.value);
  };
  const onSubmitSearch = (e) => {
    e.preventDefault();
    dispatch({
      type: SEARCH_PLACE_REQUEST,
      data: searchValue,
    });
    history.push(`/${searchValue}`);
  };
  return (
    <form action="" onSubmit={onSubmitSearch}>
      <Input value={searchValue} onChange={onChangeSearchValue} />
    </form>
  );
};

export default SearchForm;
