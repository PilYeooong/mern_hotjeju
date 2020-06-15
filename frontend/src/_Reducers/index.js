import { combineReducers } from 'redux';
import user from "./user_reducer";
import place from "./place_reducer";
import image from "./image_reducer";

const rootReducer = combineReducers({
    user,
    place,
    image,
});

export default rootReducer;