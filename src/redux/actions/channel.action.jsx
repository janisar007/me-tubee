import request from "../../api";
import {
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  SET_SUBSCRIPTION_STATUS,
} from "../actionType";

export const getChannelDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_DETAILS_REQUEST,
    });

    const { data } = await request.get("/channels", {
      params: {
        part: "snippet, statistics, contentDetails",
        id: id,
      },
    });

    // console.log(data);

    dispatch({
      type: CHANNEL_DETAILS_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: CHANNEL_DETAILS_FAIL,
      payload: error.response.data,
    });
  }
};

//ye action mai ye janne k liye bana raha hu ki user mera subscribed hai ya nahi. ye janne k liye authentication toekn bhi jaroori hai jise mai getSate(jo ki mujhe state dega jisme token store hai) se le lunga->
export const checkSubscriptionStatus = (id) => async (dispatch, getState) => {
  try {
    const { data } = await request.get("/subscriptions", {
      params: {
        part: "snippet",
        forChannelId: id,
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    // console.log(data);

    //Note: is data object me ek field hai jiska name items hai. agr uski length 0 hai to iska matlb tum subscribed nahi ho aur agr 0 nahi hai to subscribed ho->
    dispatch({
      type: SET_SUBSCRIPTION_STATUS,
      payload: data.items.length != 0, //that means if not 0 then payload will be true(subscribed) else false(not subs.)
    });
    // console.log(getState().auth.accessToken);
    // console.log(data);
  } catch (error) {
    console.log(error.response.data);
  }
};
