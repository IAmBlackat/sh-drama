import { combineReducers } from 'redux'
import historyReducer from './history/historyReducer'

const combineReducer = combineReducers({
    history: historyReducer

})

export default combineReducer