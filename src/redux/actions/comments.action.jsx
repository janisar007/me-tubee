import {
  COMMENT_LIST_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_SUCCESS,
} from "../actionType";

import request from "../../api";

export const getCommentsOfVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMENT_LIST_REQUEST,
    });

    const { data } = await request.get("/commentThreads", {
      params: {
        part: "snippet",
        videoId: id,
      },
    });

    dispatch({
      type: COMMENT_LIST_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: COMMENT_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

//here text is actual comment text-> also to add comment you have to be authorized so we need access token from state->
export const addComment = (id, text) => async (dispatch, getState) => {
  try {
    const obj = {
      snippet: {
        videoId: id,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    };

    await request.post("/commentThreads", obj, {
      params: {
        part: "snippet",
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({
      type: CREATE_COMMENT_SUCCESS,
    });

    //now jab bhi hamara comment successfully create ho kar hamare sommentList k store me store ho jata hai to comments ko phir se render ya refresh kar do-> isse new commented comment bhi dikhne lagega ->
    // dispatch(getCommentsOfVideoById(id));

    //acha ek problem ye bhi hai ki hame page hi reload krna pad raha hai new comment k display hone k liye. to ise solve krne k liye bas somment success k 2 sec baad ise dispatch karo ->
    setTimeout(() => dispatch(getCommentsOfVideoById(id)), 6000);
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};
