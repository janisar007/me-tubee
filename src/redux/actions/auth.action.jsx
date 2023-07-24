import firebase from 'firebase/compat/app'
import auth from '../../firebase'
import { LOAD_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from '../actionType';

//we are going to dispath this login action creater from our LoginScreen.
export const login = () => { //creting an action.
    //since we are using google auth provider, we have to make a google auth provider object. iske liye auth object chahiye ise firebase.js se expoert liya hai.->
    return(
        async (dispatch) => {
            try {
                dispatch({
                    type: LOGIN_REQUEST
                });

                const provider = new firebase.auth.GoogleAuthProvider(); //it will give the object.

                //ab sign in method me is provider object pass krna hoga ->
                const res = await auth.signInWithPopup(provider); //is res object k ander ek accessToken hoga jiska use reducer karega login karane me(see auth.reducer.jsx)
                console.log(res);

                const accessToken = res.credential.accessToken;

                const profile = {
                    name: res.additionalUserInfo.profile.name, //.name
                    photoURL: res.additionalUserInfo.profile.picture,
                }
                dispatch({//yaha hum auth.reducer k reducer k LOGIN_SCCESS case k payload ko is accessToken se assign kar rahe hai.
                    type:LOGIN_SUCCESS,
                    payload: accessToken
                });

                dispatch({
                    type: LOAD_PROFILE,
                    payload: profile,
                });
                
            } catch (error) {
                console.log(error.message);
                dispatch({
                    type: LOGIN_FAIL,
                    payload: error.message,
                });
                
            }
        }
    );
}