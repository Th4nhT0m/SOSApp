import { combineReducers } from 'redux';
import { authReducer } from './auth-slice';
import { registerReducer } from './register-slice';
import { accidentsReducer } from './accidents-create-slice';
import { urgentReducer } from './urgent-create';

const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
    accidents: accidentsReducer,
    urgentReducer: urgentReducer,
});
export default rootReducer;
