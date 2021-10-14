import { combineReducers } from 'redux';
import { authReducer } from './auth-slice';
import { registerReducer } from './register-slice';

const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
});
export default rootReducer;
