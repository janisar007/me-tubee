import firebase from 'firebase/app'
import auth from '../../firebase'

//we are going to dispath this login action creater from our LoginScreen.
export const login = () => {
    //since we are using google auth provider, we have to make a google auth provider object. iske liye auth object chahiye ise firebase.js se expoert liya hai.->
    async (dispatch) => {
        try {

            const provider = new firebase.auth.GoogleAuthProvider(); //it will give the object.

            //ab sign in method me is provider object pass krna hoga ->
            const res = await auth.signInWithPopup(provider);
            console.log(res);

            
        } catch (error) {
            
        }
    }
}