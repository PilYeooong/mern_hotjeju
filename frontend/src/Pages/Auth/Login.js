import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import { Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";

import { loginUser } from "../../_Actions/user_action";

const Wrapper = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled(Form)`
  width: 60%;
`;

function Login(props) {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const { email, password } = values;
    const data = { email, password };

    await dispatch(loginUser(data)).then(response => {
      if(response.payload.loginSuccess){
        notification.open({
          message: "로그인 성공",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />
        })
        props.history.push('/');
      } else {
        notification.open({
          message: "로그인 실패",
          description: "이메일/암호를 확인해주세요.",
          icon: <FrownOutlined style={{ color: "#ff3333" }} />
        })
      }
    })
  }
  return (
    <Wrapper>
      <Helmet>
        <title>로그인 | Hot Jeju</title>
      </Helmet>
      <LoginForm {...layout} onFinish={onFinish}>
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
          label="비밀번호"
          name="password"
          rules={[
            { required: true, message: "비밀번호를 작성하여 주세요." },
          ]}
        >
          <Input.Password />
        </Form.Item>
       

        <Form.Item {...tailLayout} style={{ paddingLeft: "2rem" }}>
          <Button type="primary" htmlType="submit">
            로그인
          </Button>
        </Form.Item>
      </LoginForm>
    </Wrapper>
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 18 },
};

export default Login;
