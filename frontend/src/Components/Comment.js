import React from 'react'
import { Card, Comment, Tooltip } from "antd";

function Comment() {
  return (
    <Comment
    // actions={actions}
    author={<a>Han Solo</a>}
    content={
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully
        and efficiently.
      </p>
    }
    datetime={
      <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().fromNow()}</span>
      </Tooltip>
    }
  />
  )
}

export default Comment
