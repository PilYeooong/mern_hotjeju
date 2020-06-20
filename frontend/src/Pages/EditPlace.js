import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import EditPlaceForm from "../Components/EditPlaceForm";
import { LOAD_PLACE_DETAIL_REQUEST } from '../_Actions/types';
const EditPlace = ({ match }) => {
  const dispatch = useDispatch();
  const placeId = match.params.placeId;
  
  useEffect(() => {
    dispatch({
      type: LOAD_PLACE_DETAIL_REQUEST,
      data: placeId,
    })
  }, []);
  
  const { placeDetail } = useSelector(state => state.place);

  return (
    <div>
      {placeDetail && <EditPlaceForm place={placeDetail} />}
    </div>
  )
}

export default EditPlace
