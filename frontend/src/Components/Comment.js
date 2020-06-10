import React from "react";
import { Button, Comment as AntdComment, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_COMMENTS_REQUEST } from "../_Actions/types";
import moment from "moment";

function Comment({ comment }) {
  return (
    <>
      <AntdComment
        // actions={actions}
        author={<a>{comment && comment.creator && comment.creator.nickname}</a>}
        content={<p>{comment.text}</p>}
        datetime={
          <Tooltip title={moment().format(comment.createdAt)}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    </>
  );
}

export default Comment;
