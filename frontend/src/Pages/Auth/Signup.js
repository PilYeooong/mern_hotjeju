import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import { Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";

import { registerUser } from "../../_Actions/user_action";

const Wrapper = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignupForm = styled(Form)`
  width: 60%;
`;

function Signup(props) {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const { email, username, password } = values;
    const data = { email, username, password };
    
    await dispatch(registerUser(data)).then((response) => {
      if (response.payload.success) {
        notification.open({
          message: "회원가입 성공",
          description: "로그인 페이지로 이동합니다.",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />
        });
        props.history.push("/login");
      } else {
        notification.open({
          message: "회원가입 실패",
          description: "이메일/암호를 확인해주세요.",
          icon: <FrownOutlined style={{ color: "#ff3333" }} />
        });
      }
    });
  };
  return (
    <Wrapper>
      <Helmet>
        <title>회원 가입 | Hot Jeju</title>
      </Helmet>
      <SignupForm {...layout} onFinish={onFinish}>
        <Form.Item
          label="이메일"
          name="email"
          rules={[
            { required: true, message: "이메일을 작성하여 주세요." },
            { type: "email", message: "유효한 이메일을 작성하여 주세요" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="이름"
          name="username"
          rules={[
            { required: true, message: "이름을 작성하여 주세요." },
            { min: 2, message: "2글자 이상을 입력해 주세요." },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="비밀번호"
          name="password"
          rules={[
            { required: true, message: "비밀번호를 작성하여 주세요." },
            { min: 5, message: "5자 이상의 비밀번호를 입력해주세요." },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="비밀번호 확인"
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "동일한 비밀번호를 작성하여 주세요.",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("비밀번호가 일치하지 않습니다.");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            회원가입
          </Button>
        </Form.Item>
      </SignupForm>
    </Wrapper>
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 16 },
};

export default Signup;
