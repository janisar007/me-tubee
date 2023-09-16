import { createStore, applyMiddleware, combineReducers } from "redux";

import { composeWithDevTools } from "redux-devtools-extension"; //composewithdevtool will help us to vidualize our store.
import thunk from "redux-thunk"; //thunk is a middleware.

import { authReducer } from "./reducers/auth.reducer";
import {
  channelVideosReducer,
  homeVideosReducer,
  searchedVideoReducer,
  subscriptionsChannelReducer,
  // relatedVideoReducer,
} from "./reducers/videos.reducer";
import { selectedVideoReducer } from "./reducers/videos.reducer";
import { channelDetailsReducer } from "./reducers/channel.reducer";
import { commentListReducer } from "./reducers/comments.reducer";

// const initialState = {
//     name: 'Sumit',
//     age: '21'
// }

const rootReducer = combineReducers({
  //combine reducer ka use bas saare reducers ko ek jagah rakhne k liye karte hai.
  auth: authReducer,
  homeVideos: homeVideosReducer,
  selectedVideo: selectedVideoReducer,
  channelDetails: channelDetailsReducer,
  commentList: commentListReducer,
  // relatedVideo: relatedVideoReducer,
  searchedVideos: searchedVideoReducer,
  subscriptionsChannel: subscriptionsChannelReducer,
  channelVideos: channelVideosReducer,
});

const store = createStore(
  rootReducer,
  /*initialState*/ {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store; //Now to connect redux to react-app we have to wrap this store around <App/> in index.js
