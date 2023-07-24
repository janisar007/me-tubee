import React, {useEffect, useState} from 'react'
import {Container} from 'react-bootstrap';
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import HomeScreen from './screen/homeScreen/HomeScreen';

import './_app.scss'
import LoginScreen from './screen/loginScreen/LoginScreen';
import { useSelector } from 'react-redux';


const Layout = ({children}) => {
  const [sidebar, toggleSidebar] = useState(false);

  const handleToggleSidebar = () => toggleSidebar(value => !value); //here value is current sidebar variable
  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar}/>
      <div className="app__container">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar}/>
        <Container fluid className="app__main"> {/*fluid container tag k sath ane wale extra padding ko hata deta hai.*/}
          {/*<HomeScreen/>*/} {/*is homeScreen ko hum as a parameter pass karenge layout ka*/} 
          {children}

          
        </Container>
      </div>
    </>
  );
}


function App() {
  //Now i have to protect my routes(yani agar user k paas accessToken nahi hai to use /auth page per hi redirect kar do)->
  const {accessToken, loading} = useSelector(state => state.auth);

  const navigate = useNavigate();//NOTE: i can only use this useNavigate Hook in that component(file) that is wrapped around BrowserRoute. i mean is should be a descendet of BrowserRoute beacuse we are navigating throw thr routes. so just go to index.js and wrap the App component with BrowserRoute and remove the Route wrapper from here. 

  useEffect(() => {

    if(!loading && !accessToken) {
      navigate('/auth');
    }

  }, [accessToken, loading, navigate]);

  return (

 
      <Routes>
        <Route path='/' element={<Layout children={<HomeScreen/>}/>}/>

        <Route path='/auth' element={<LoginScreen/>}/>

        <Route path='/search' element={<h1>this is search page.</h1>}/>

        {/* <Route path='*' element={<Layout children={<HomeScreen/>}/>}/> */} {/*it will create a new route per that invalid path and render our homescreen there. but Navigate will rerender from this invalid route path to homeScreen.*/}
        <Route path="*" element={<Navigate to ="/" />}/>
      </Routes>

    // <LoginScreen/>
  )
}

export default App
