import {createStore, applyMiddleware} from 'redux';

import {composeWithDevTools} from 'redux-devtools-extension'; //composewithdevtool will help us to vidualize our store. 
import thunk from 'redux-thunk'; //thunk is a middleware.

const initialState = {
    name: 'Sumit',
    age: '21'
}

const reducer = (initialState) => initialState;

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store; //Now to connect redux to react-app we have to wrap this store around <App/> in index.js