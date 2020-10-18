import { combineReducers } from "redux";
import covid_reducer from './covid_reducer'

const rootReducer = combineReducers({
    covid_reducer: covid_reducer
})

export default rootReducer
