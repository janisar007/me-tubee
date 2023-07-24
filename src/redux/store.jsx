import {createStore, applyMiddleware, combineReducers} from 'redux';

import {composeWithDevTools} from 'redux-devtools-extension'; //composewithdevtool will help us to vidualize our store. 
import thunk from 'redux-thunk'; //thunk is a middleware.

import {authReducer} from './reducers/auth.reducer';

// const initialState = {
//     name: 'Sumit',
//     age: '21'
// }

const rootReducer = combineReducers({ //combine reducer ka use bas saare reducers ko ek jagah rakhne k liye karte hai.
    auth: authReducer,
})

const store = createStore(
        rootReducer, 
        /*initialState*/{}, 
        composeWithDevTools(applyMiddleware(thunk))
    );

export default store; //Now to connect redux to react-app we have to wrap this store around <App/> in index.js