import { combineReducers } from 'redux';
import user from "./user_reducer";
import place from "./place_reducer";

const rootReducer = combineReducers({
    user,
    place,
});

export default rootReducer;