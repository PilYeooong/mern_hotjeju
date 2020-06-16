import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { SEARCH_PLACE_REQUEST } from "../_Actions/types";

import styled from "styled-components";
import { Input } from "antd";

const Form = styled.form`
  width: 50%;
`;

const SearchInput = styled(Input)`
  width: 100%;
`;

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
    history.push(`/search/${searchValue}`);
    SetSearchValue('');
  }, [searchValue]);

  return (
    <Form action="" onSubmit={onSubmitSearch}>
      <SearchInput placeholder="Search Hot Place" type="text" value={searchValue} onChange={onChangeSearchValue} />
    </Form>
  );
};

SearchForm.propTypes = {
  history: PropTypes.object.isRequired,
}


export default SearchForm;
