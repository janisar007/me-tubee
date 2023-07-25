//it will give the most popular videos from yt api.

import request from "../../api";
import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS } from "../actionType"

export const getPopularVideos = () => async dispatch => {
    try {
        dispatch({
            type: HOME_VIDEOS_REQUEST,
        });
        //now we have to grab the data using axios whose instance(request) is created in api.jsx->
        //https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=[YOUR_API_KEY] HTTP/1.1
        //ye above url pass krna hai .get() me. per v3/ tak request instance me hi define kar diya hai ab uske aage yaha likhenege. aur phir age k url k liye hum ek configuration object pass kar denge->
        const res = await request.get('/videos', {
            params: {
                //ye sare elements uper wale url se hai.
                part: "snippet,contentDetails,statistics",
                chart: "mostPopular",
                regionCode: "IN", //ise hum users object se lenge jab sign in karte hai abhi k liye hardcore kar diya hai.
                maxResults: 20,
                pageToken: '',//The pageToken parameter identifies a specific page in the result set that should be returned.
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
                catagory: 'All',
            },
        });
        
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: HOME_VIDEOS_FAIL,
            payload: error.message,
        });
        
    }
}

//ye keyword wo catagory hai jisper click kiya jaega.
//getState is a function jise call karne per global state object mil jata hai store ka. jo ki store.jsx me define hai.
export const getVideosByCatagory = (keyword) => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOME_VIDEOS_REQUEST,
        });
        //now we have to grab the data using axios whose instance(request) is created in api.jsx->
        //https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=[YOUR_API_KEY] HTTP/1.1
        //ye above url pass krna hai .get() me. per v3/ tak request instance me hi define kar diya hai ab uske aage yaha likhenege. aur phir age k url k liye hum ek configuration object pass kar denge->
        const res = await request.get('/search', {
            params: {
                //ye sare elements uper wale url se hai.
                part: "snippet",
                maxResults: 20,
                pageToken: getState().homeVideos.nextPageToken,//it will be taken from global state.
                q: keyword,
                type: 'video', //since endpoint will return channel, video, and playlist but we only want videos.

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
}