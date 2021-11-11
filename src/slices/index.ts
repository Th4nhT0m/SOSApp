import { combineReducers } from 'redux';
import { authReducer } from './auth-slice';
import { registerReducer } from './register-slice';
import { accidentsReducer } from './accidents-create-slice';
import { urgentReducer } from './urgent-create';
import { usersReducer } from './users-slice';
import { detailAccidentsReducer } from './details-accidents-slice';
import { helpersReducer } from './helper-slice';

const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
    accidents: accidentsReducer,
    urgentReducer: urgentReducer,
    users: usersReducer,
    detailAccidents: detailAccidentsReducer,
    helpersReducer: helpersReducer,
});
export default rootReducer;
