import React, {useState} from 'react'
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import HomeScreen from './screen/homeScreen/HomeScreen';

import './_app.scss'
import LoginScreen from './screen/loginScreen/LoginScreen';


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

  // const [sidebar, toggleSidebar] = useState(false);

  // const handleToggleSidebar = () => toggleSidebar(value => !value); //here value is current sidebar variable.

  return (

    //is poore block of code ko hum sepreate function(Layout) me dal denge routing k liye->
    // <>
    //   <Header handleToggleSidebar={handleToggleSidebar}/>
    //   <div className="app__container">
    //     <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar}/>
    //     <Container fluid className="app__main"> {/*fluid container tag k sath ane wale extra padding ko hata deta hai.*/}
    //       <HomeScreen/>
    //     </Container>
    //   </div>
    // </>

    <Router>
      <Routes>
        <Route path='/' element={<Layout children={<HomeScreen/>}/>}/>

        <Route path='/auth' element={<LoginScreen/>}/>

        <Route path='/search' element={<h1>this is search page.</h1>}/>

        {/* <Route path='*' element={<Layout children={<HomeScreen/>}/>}/> */} {/*it will create a new route per that invalid path and render our homescreen there. but Navigate will rerender from this invalid route path to homeScreen.*/}
        <Route path="*" element={<Navigate to ="/" />}/>
      </Routes>
    </Router>

    // <LoginScreen/>
  )
}

export default App
