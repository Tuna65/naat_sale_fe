import { combineReducers } from "redux";
import { languageReducer } from "./modules/language";
import { authReducer } from "./modules/auth";

const rootReducer = combineReducers({
  language: languageReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
