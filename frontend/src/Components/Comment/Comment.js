import React from "react";
import PropTypes from "prop-types";

import { Comment as AntdComment, Tooltip } from "antd";
import moment from "moment";

function Comment({ comment }) {
  return (
    <>
      <AntdComment
        author={<a>{comment && comment.creator && comment.creator.nickname}</a>}
        content={<p>{comment.text}</p>}
        datetime={
          <Tooltip title={moment().format(comment.createdAt)}>
            <span>{moment(comment.createdAt).fromNow()}</span>
          </Tooltip>
        }
      />
    </>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
