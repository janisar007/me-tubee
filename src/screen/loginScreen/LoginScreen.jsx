import React from 'react'
import './_loginScreen.scss';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/auth.action';

const LoginScreen = () => {
    
  return (
    <div className="login">
        <div className="login__container">
            <img src="https://pngimg.com/uploads/youtube/youtube_PNG2.png" alt="" />
            <button >
                Login With google
            </button>
            <p>This Project is made using Youtube Data API</p>
        </div>
    </div>
  )
}

export default LoginScreen
