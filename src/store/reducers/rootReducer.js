import authReducer from './authReducer';
import reimburseReducer from './reimburseReducer';
import { combineReducers } from 'redux';
import {firestoreReducer} from 'redux-firestore'

const rootReducer = combineReducers({
        auth:authReducer,
        reimburse:reimburseReducer,
        firebase:firestoreReducer
})

export default rootReducer;