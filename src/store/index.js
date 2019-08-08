import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {timelineReducer} from '../reducers/timelineReducer';
import {headerReducer} from '../reducers/headerReducer';

const reducers = combineReducers({timeline: timelineReducer, header: headerReducer});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;