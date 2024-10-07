import { combineReducers } from "redux";
import { languageReducer } from "./modules/language";
import { authReducer } from "./modules/auth";
import { sidebarReducer } from "./modules/sidebar";

const rootReducer = combineReducers({
  language: languageReducer,
  auth: authReducer,
  sidebar: sidebarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
