import firebase from 'firebase/compat/app'
import auth from '../../firebase'
import { LOAD_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from '../actionType';

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
                // console.log(res);

                const accessToken = res.credential.accessToken;

                const profile = {
                    name: res.additionalUserInfo.profile.name, //.name
                    photoURL: res.additionalUserInfo.profile.picture,
                }

                //---------------------------
                //here is a thing : agr hum reload karte hai to accessToken null ho jata hai aur hum phir se login page per redirect kar diye jaate hai. to ise solve karne k liye-> redux me ya kahi ek sessoinStoage hota hai us storage me hum `somePrefixYouLike`-access-token item me hum accessToken dal denge aur aese hi `somePrefixYouLike`-user me profile daal denge. aur phir isi k hisaab se auth.reducer me ja kar initialState ko change kar denge.
                //This sessionStore can be seen in inspect->application->Storage->session storage.

                sessionStorage.setItem('meTube-access-token', accessToken);
                sessionStorage.setItem('meTube-user', JSON.stringify(profile));
                //---------------------------

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

//2. action for logout button ->
export const logout = () => {
    return (
       async dispatch => {
        //using firebase it is very easy to log out ->
        await auth.signOut();
        dispatch({
            type:LOG_OUT,
        });

        sessionStorage.removeItem('meTube-access-token');
        sessionStorage.removeItem('meTube-user');
       }
    );
}