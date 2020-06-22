import React from "react";
import { useDispatch } from "react-redux";
import { EDIT_NICKNAME_REQUEST } from "../../_Actions/types";

import { Form, Button, Input } from "antd";

const EditNickName = ({ userInfo }) => {
  const dispatch = useDispatch();

  const onChangeNickName = (values) => {
    const { nickname } = values;
    try {
      dispatch({
        type: EDIT_NICKNAME_REQUEST,
        data: {
          userId: userInfo._id,
          nickname,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      {userInfo.nickname && (
        <Form {...layout} onFinish={onChangeNickName}>
          <Form.Item name="email" label="이메일" initialValue={userInfo.email}>
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="nickname"
            label="닉네임"
            initialValue={userInfo.nickname}
            rules={[
              {
                required: true,
                message: "변경하실 닉네임을 작성해주세요."
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              변경하기
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 16 },
};

export default EditNickName;
