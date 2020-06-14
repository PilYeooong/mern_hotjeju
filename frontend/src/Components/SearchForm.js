import React, { useState, useCallback } from "react";

import { useDispatch } from "react-redux";
import { SEARCH_PLACE_REQUEST } from "../_Actions/types";

import { Input } from "antd";

const SearchForm = ({ history }) => {
  const dispatch = useDispatch();

  const [searchValue, SetSearchValue] = useState("");

  const onChangeSearchValue = useCallback((e) => {
    SetSearchValue(e.target.value);
  }, []);

  const onSubmitSearch = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: SEARCH_PLACE_REQUEST,
      data: encodeURIComponent(searchValue),
    });
    history.push(`/${searchValue}`);
  }, [searchValue]);

  return (
    <form action="" onSubmit={onSubmitSearch}>
      <Input value={searchValue} onChange={onChangeSearchValue} />
    </form>
  );
};

export default SearchForm;
