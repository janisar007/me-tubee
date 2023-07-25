import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS } from "../actionType";

export const homeVideosReducer = (state={
    videos:[],
    loading: false,
    nextPageToken: null,
    activeCatagory: 'All'//ye baad me catagory k action k liye define kiya hai.
}, action) => {

    const {type, payload} = action;

    switch (type) {
        case HOME_VIDEOS_SUCCESS: 
            return {
                ...state,
                videos: payload.videos,
                loading: false,
                nextPageToken: payload.nextPageToken,
                activeCatagory: payload.catagory, //ye baad me catagory k action k liye define kiya hai.
            }
    
        case HOME_VIDEOS_FAIL: 
            return {
                ...state,
                //fail hone per videos array null ho jaega. lekin is null array ko render nahi karenge. isse kam se kam porani feed to rehegi->
                // videos: payload.videos,
                loading: false,
                error: payload
            }
        case HOME_VIDEOS_REQUEST: 
            return {
                ...state,
                //fail hone per videos array null ho jaega. lekin is null array ko render nahi karenge. isse kam se kam porani feed to rehegi->
                // videos: payload.videos,
                loading: true,
                error: payload
            }
    
        default:
            return state;
    }
}