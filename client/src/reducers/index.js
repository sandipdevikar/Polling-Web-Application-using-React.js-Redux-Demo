import { combineReducers } from 'redux';
import auth  from './auth';
import alert from "./alert"
import profile from "./profile"
import poll from "./poll"
export default combineReducers({alert,auth,poll,profile});
