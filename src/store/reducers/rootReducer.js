import authReducer from "./authReducer";
import reimburseReducer from "./reimburseReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  reimburse: reimburseReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
