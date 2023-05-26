import { createStore, combineReducers} from "redux";
import OperationsReducer from "./reducers/reducer";

const rootReducer = combineReducers({
  OperationsReducer,
})

const store = createStore(rootReducer)
export default store