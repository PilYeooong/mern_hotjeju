import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_PLACE_DETAIL_REQUEST } from "../../_Actions/types";

import EditPlaceForm from "../../Components/Place/EditPlaceForm";
import { notification } from "antd";
import { FrownOutlined } from "@ant-design/icons";

const EditPlace = (props) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { placeDetail } = useSelector((state) => state.place);
  const placeId = props.match.params.placeId;
  useEffect(() => {
    dispatch({
      type: LOAD_PLACE_DETAIL_REQUEST,
      data: placeId,
    });
  }, []);
  
  useEffect(() => {
    if(userData && placeDetail){
      if(userData._id !== placeDetail.creator){
        notification.open({
          message: "접근 권한이 없습니다.",
          icon: <FrownOutlined />,
          placement: 'bottomRight',
        })
        props.history.push('/');
      }
    }
  })

  return <div>{placeDetail && <EditPlaceForm place={placeDetail} />}</div>;
};

export default EditPlace;
