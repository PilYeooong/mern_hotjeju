import React, { useCallback, useRef } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Form, Input, Button, Upload, Modal, Select } from "antd";
import { useDispatch } from "react-redux";
import { UPLOAD_IMAGES_REQUEST, EDIT_PLACE_REQUEST, REMOVE_IMAGE } from "../_Actions/types";

const Wrapper = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlaceForm = styled(Form)`
  width: 100%;
`;

const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 3rem;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const { Option } = Select;

const EditPlaceForm = ({ place }) => {
  const imageInput = useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const onChangeImage = (e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('images', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData
    })
  }

  // const onClickImageUpload = useCallback(() => {
  //   // 이 function이 실행될때 imageInput이 클릭되도록
  //   imageInput.current.click();
  // }, [imageInput.current]);

  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      index
    })
  }, []);

  const onFinish = (values) => {
    const {
      category,
      name,
      description,
      address,
    } = values;
    const formData = new FormData();
    formData.append("category", category);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    place.images.forEach((i) => {
      formData.append('images', i);
    });
    try {
      dispatch({
        type: EDIT_PLACE_REQUEST,
        data: {
          placeId: place._id,
          formData: formData
        }
      });
      history.push(`/place/${place._id}`)
    } catch(e){
      console.error(e);
    }
  };
  return (
    <Wrapper>
      <Helmet>
        <title>핫플 수정하기 | Hot Jeju</title>
      </Helmet>

      {place && place.name && (
        <PlaceForm {...layout} onFinish={onFinish} encType="multipart/form-data">
          <Form.Item
            name="category"
            label="Category"
            initialValue={place.category.name}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="카테고리" allowClear>
              <Option value="ocean">바다</Option>
              <Option value="cafe">카페</Option>
              <Option value="restaurant">식당</Option>
              <Option value="museum">박물관</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "내용을 입력해 주세요" }]}
            initialValue={place.name}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "설명을 입력해 주세요" }]}
            initialValue={place.description}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "장소를 입력해 주세요" }]}
            hasFeedback
            initialValue={place.address}
          >
            <Input />
          </Form.Item>
          {place.images &&
            place.images.map((image, i) => (
              <ImageContainer>
                <Image src={`http://localhost:5000/${image}`} alt="" />
                <Button onClick={onRemoveImage(i)}>삭제</Button>
              </ImageContainer>
            ))}
            <Form.Item>
              <Input type="file" multiple ref={imageInput} onChange={onChangeImage}/>
            </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </PlaceForm>
      )}
    </Wrapper>
  );
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 16 },
};

export default EditPlaceForm;
