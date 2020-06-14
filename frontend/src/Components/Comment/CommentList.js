import React, { useState, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { LOAD_COMMENTS_REQUEST } from "../../_Actions/types";

import styled from "styled-components";
import { Button } from "antd";

import Comment from "./Comment";
import CommentForm from "./CommentForm";

const MoreButton = styled(Button)`
  margin-bottom: 1rem;
`;


const CommentList = () => {
  const dispatch = useDispatch();
  const { placeDetail } = useSelector((state) => state.place);
  const { userData } = useSelector((state) => state.user);


  const loadMoreComments = useCallback(() => {
    dispatch({
      type: LOAD_COMMENTS_REQUEST,
      data: placeDetail._id,
      offset: placeDetail.Comments.length,
    });
  }, [placeDetail && placeDetail._id && placeDetail.Comments]);

  return (
    <>
      {placeDetail &&
        placeDetail.Comments &&
        placeDetail.Comments.map((comment) => <Comment comment={comment} />)}
      {placeDetail.hasMoreComments && (
        <MoreButton type="default" onClick={loadMoreComments}>
          더 보기
        </MoreButton>
      )}
      {userData && userData.isAuth && <CommentForm placeId={placeDetail._id} />}
    </>
  );
};

export default CommentList;
