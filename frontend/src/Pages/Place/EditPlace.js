import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditPlaceForm from "../../Components/Place/EditPlaceForm";
import { LOAD_PLACE_DETAIL_REQUEST } from "../../_Actions/types";
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
        props.history.push('/');
      }
    }
  })

  return <div>{placeDetail && <EditPlaceForm place={placeDetail} />}</div>;
};

export default EditPlace;
