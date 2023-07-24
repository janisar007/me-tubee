import { LOAD_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from "../actionType";

// const initialState = {
//     accessToken: null, //agar ye token nahi hai to user is not autherized. ye token google se login per milta hai. which is stored in an object (res) in auth.action.jsx.
//     user: null,
//     loading: false
// }
//after applying sessionStorage->
const initialState = {
    //this sessionStorages are defined in auth.action.jsx. it is used to keep the page there after reload else after reload we lost acessToken and we are redirected to login page.
    accessToken: sessionStorage.getItem('meTube-access-token')?sessionStorage.getItem('meTube-access-token'):null,
    user: sessionStorage.getItem('meTube-user')?JSON.parse(sessionStorage.getItem('meTube-user')):null,
    loading: false
}

//authReducer ko store me import krna hoga.
export const authReducer = (prevState = initialState, action) => {
    //payload is data related to action.
    const {type, payload} = action;

    switch (type) {
        case LOGIN_REQUEST:
            return {
                ...prevState,
                loading: true
            }

        case LOGIN_SUCCESS:
            return {
                ...prevState,
                accessToken: payload,
                loading: false
            }

        case LOGIN_FAIL:
            return {
                ...prevState,
                accessToken: null,
                loading: false,
                error: payload
            }

        case LOAD_PROFILE: //handling user
            return {
                ...prevState,
                user: payload //user should be updated with payload.
            }

        case LOG_OUT: //handling user
            return {
                ...prevState,
                accessToken: null,
                user: null
            }
    
        default:
            return prevState
    }

}