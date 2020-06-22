import React from "react";
import { useDispatch } from "react-redux";
import { UPDATE_NICKNAME_REQUEST } from "../../_Actions/types";

import { Form, Button, Input } from "antd";

const EditNickName = ({ userInfo }) => {
  const dispatch = useDispatch();

  const onChangeNickName = (values) => {
    const { nickname } = values;
    try {
      dispatch({
        type: UPDATE_NICKNAME_REQUEST,
        data: nickname,
      })
    } catch(e){

    }
  };
  return (
    <>
      {userInfo.nickname && (
        <Form onFinish={onChangeNickName}>
          <Form.Item
            name="nickname"
            label="닉네임"
            initialValue={userInfo.nickname}
            rules={[
              {
                required: true,
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Button>변경하기</Button>
        </Form>
      )}
    </>
  );
};

export default EditNickName;
