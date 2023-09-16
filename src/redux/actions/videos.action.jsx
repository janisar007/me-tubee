//it will give the most popular videos from yt api.

import request from "../../api";
import {
  CHANNEL_VIDEOS_FAIL,
  CHANNEL_VIDEOS_REQUEST,
  CHANNEL_VIDEOS_SUCCESS,
  HOME_VIDEOS_FAIL,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  SEARCHED_VIDEO_FAIL,
  SEARCHED_VIDEO_REQUEST,
  SEARCHED_VIDEO_SUCCESS,
  // RELATED_VIDEO_FAIL,
  // RELATED_VIDEO_REQUEST,
  // RELATED_VIDEO_SUCCESS,
  SELECTED_VIDEO_FAIL,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
  SUBSCRIPTIONS_CHANNEL_FAIL,
  SUBSCRIPTIONS_CHANNEL_REQUEST,
  SUBSCRIPTIONS_CHANNEL_SUCCESS,
} from "../actionType";

export const getPopularVideos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });
    //now we have to grab the data using axios whose instance(request) is created in api.jsx->
    //https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=[YOUR_API_KEY] HTTP/1.1
    //ye above url pass krna hai .get() me. per v3/ tak request instance me hi define kar diya hai ab uske aage yaha likhenege. aur phir age k url k liye hum ek configuration object pass kar denge->
    const res = await request.get("/videos", {
      params: {
        //ye sare elements uper wale url se hai.
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN", //ise hum users object se lenge jab sign in karte hai abhi k liye hardcore kar diya hai.
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken, //The pageToken parameter identifies a specific page in the result set that should be returned.
        //no need to pass accessToken(see docs)
      },
    });
    // console.log(res);

    //res me top 20 popular videos ka data aa chuka hoga ab ise reducer me bhejte hai->
    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: res.data.items,
        //i have to put nextPage token in my redux store so i can continue the pagination->
        nextPageToken: res.data.nextPageToken,
        catagory: "All",
      },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: error.message,
    });
  }
};

//ye keyword wo catagory hai jisper click kiya jaega.
//getState is a function jise call karne per global state object mil jata hai store ka. jo ki store.jsx me define hai.
export const getVideosByCatagory = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });

    const res = await request.get("/search", {
      params: {
        //ye sare elements uper wale url se hai.
        part: "snippet",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken, //it will be taken from global state.
        q: keyword,
        type: "video", //since endpoint will return channel, video, and playlist but we only want videos.
      },
    });
    // console.log(res);

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: res.data.items,
        //i have to put nextPage token in my redux store so i can continue the pagination->
        nextPageToken: res.data.nextPageToken,
        catagory: keyword,
      },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: error.message,
    });
  }
};

export const getVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SELECTED_VIDEO_REQUEST,
    });

    const { data } = await request.get("/videos", {
      params: {
        part: "snippet, statistics",
        id: id,
      },
    });

    // console.log(data);

    dispatch({
      type: SELECTED_VIDEO_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: SELECTED_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

//this is for related video in the side->
// export const getRelatedVideos = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: RELATED_VIDEO_REQUEST,
//     });

//     const { data } = await request.get("/search", {
//       params: {
//         part: "snippet",
//         relatedToVideoId: id,
//         maxResults: 15,
//         type: "video",
//       },
//     });

//     // console.log(data);

//     dispatch({
//       type: RELATED_VIDEO_SUCCESS,
//       payload: data.items,
//     });
//   } catch (error) {
//     console.log(error.response.data.message);
//     dispatch({
//       type: RELATED_VIDEO_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

//here keyword is the query(see serachScreen.jsx in useEffect).
export const getVideosBySearch = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEARCHED_VIDEO_REQUEST,
    });

    const res = await request.get("/search", {
      params: {
        //ye sare elements uper wale url se hai.
        part: "snippet",
        maxResults: 20,
        q: keyword,
        type: "video,channel", //since endpoint will return channel, video, and playlist but we only want videos.
      },
    });
    // console.log(res);

    dispatch({
      type: SEARCHED_VIDEO_SUCCESS,
      payload: res.data.items,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: SEARCHED_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

//this action is from video14
export const getSubscriptionChannel = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_REQUEST,
    });

    const { data } = await request.get("/subscriptions", {
      params: {
        part: "snippet,contentDetails",
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    // console.log(data);

    //Note: is data object me ek field hai jiska name items hai. agr uski length 0 hai to iska matlb tum subscribed nahi ho aur agr 0 nahi hai to subscribed ho->
    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_SUCCESS,
      payload: data.items, //that means if not 0 then payload will be true(subscribed) else false(not subs.)
    });
    // console.log(getState().auth.accessToken);
    // console.log(data);
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_FAIL,
      payload: error.response.data, //that means if not 0 then payload will be true(subscribed) else false(not subs.)
    });
  }
};

//this action is from video15     (id == channelId)
export const getVideosByChannel = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_VIDEOS_REQUEST,
    });

    //1. get upload playlist id
    const {
      data: { items },
    } = await request.get("/channels", {
      params: {
        part: "contentDetails",
        id: id,
      },
    });

    const uploadPlayListId = items[0].contentDetails.relatedPlaylists.uploads;

    //1. get video by playlist id
    const { data } = await request.get("/playlistItems", {
      params: {
        part: "contentDetails,snippet",
        playlistId: uploadPlayListId,
        maxResults: 30,
      },
    });

    // console.log(items);

    dispatch({
      type: CHANNEL_VIDEOS_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: CHANNEL_VIDEOS_FAIL,
      payload: error.response.data,
    });
  }
};
