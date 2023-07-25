import React, { useEffect } from 'react'
import './_loginScreen.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/actions/auth.action';
//Dispatching an action means sending that action object to the Redux store so that the store can handle it appropriately. When an action is dispatched, Redux takes care of passing that action to the appropriate reducers. Reducers are pure functions responsible for updating the state based on the dispatched actions.
const LoginScreen = () => {
    const dispatch = useDispatch(); //dispatch creater.

    const handleLogin = () => {
        dispatch(login()) //dispatching the login() action.
    }

    //Now after clicking the login button we suppose to get accessToken. so if accessToken is not null then we redirect the user to homeScreen ->
    //so we can get accessToken from store, and is stored in objet named auth(initialState)(seeauth.reducer) using useSelector Hook ->
    const accessToken = useSelector(state => state.auth.accessToken); //state is just the object of golbal state in store. aur ye jo auth hai na wo store.jsx me reducer middleware me defined hai.

    const navigate = useNavigate(); //useHistory is use to redirect.
    useEffect(() => {
        if(accessToken) {
            navigate('/');
        }
    },[accessToken, navigate]); //so at any point accessToken variable modifed the function in useEffect will be re-executed.
    
  return (
    <div className="login">
        <div className="login__container">
            <img src="https://pngimg.com/uploads/youtube/youtube_PNG2.png" alt="" />
            <button onClick={handleLogin}>
                Login With google
            </button>
            <p>This Project is made using Youtube Data API</p>
        </div>
    </div>
  )
}

export default LoginScreen
