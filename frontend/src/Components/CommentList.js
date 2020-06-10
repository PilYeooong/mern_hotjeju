import React, { useState } from 'react'

import Comment from "../Components/Comment";
import { useDispatch, useSelector } from 'react-redux';
import {LOAD_COMMENTS_REQUEST, ADD_COMMENT_REQUEST} from "../_Actions/types";
import { Button, Input } from 'antd';
import styled from 'styled-components';

const MoreButton = styled(Button)`
  margin-bottom : 1rem;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const SubmitButton = styled(Button)`
  margin-top: 1rem;
`;

const CommentList = () => {
  const dispatch = useDispatch();
  const { placeDetail, comments, hasMoreComments } = useSelector(state => state.place);
  const [comment, setComment] = useState('');

  const loadMoreComments = () => {
    dispatch({
      type: LOAD_COMMENTS_REQUEST,
      data: placeDetail._id,
      offset: comments.length,
    })
  }

  const onChangeComment = e => {
    setComment(e.target.value);
  }

  const onSubmitComment = () => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        placeId: placeDetail._id,
        comment,
      }
    })
    setComment('');
  }
  return (
    <div>
      {comments.map(comment => (
        <Comment comment={comment} />
      ))}
      {hasMoreComments && <MoreButton type="default" onClick={loadMoreComments}>더 보기</MoreButton>}
      <Input.TextArea value={comment} onChange={onChangeComment} />
      <ButtonBox>
        <SubmitButton type="primary" onClick={onSubmitComment}>댓글 작성</SubmitButton>
      </ButtonBox>
    </div>
  )
}

export default CommentList
