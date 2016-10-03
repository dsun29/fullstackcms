import { createStore, combineReducers, applyMiddleware } from 'redux';
import PostReducer from './reducers/PostReducer.jsx';
import UserReducer from './reducers/UserReducer.jsx';
import thunk from 'redux-thunk';

export function makeStore(state) {
    const reducers = combineReducers({PostReducer, UserReducer});
    return createStore(reducers, state, applyMiddleware(thunk));
}
