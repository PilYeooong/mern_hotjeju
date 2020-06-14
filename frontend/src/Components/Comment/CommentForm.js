import React, { useState, useCallback } from "react";

import { useDispatch } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../../_Actions/types";

import styled from "styled-components";
import { Button, Input } from "antd";

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled(Button)`
  margin-top: 1rem;
`;

const CommentForm = ({ placeId }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");


  const onChangeComment = useCallback((e) => {
    setComment(e.target.value);
  }, []);

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        placeId: placeId,
        comment,
      },
    });
    setComment("");
  }, [placeId, comment]);

  return (
    <>
      <Input.TextArea value={comment} onChange={onChangeComment} />
      <ButtonBox>
        <SubmitButton type="primary" onClick={onSubmitComment}>
          댓글 작성
        </SubmitButton>
      </ButtonBox>
    </>
  );
};

export default CommentForm;
