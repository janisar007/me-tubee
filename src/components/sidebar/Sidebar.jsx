import React from 'react';
import './_sidebar.scss';

import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdSentimentDissatisfied,
} from 'react-icons/md';

function Sidebar({sidebar, handleToggleSidebar}) {
  return (
    <nav 
    className={sidebar ? 'sidebar open' : 'sidebar'}
    onClick={() => handleToggleSidebar()}
    > {/*if sidebar is true we want both the classes else only sidebar*/}
      <li>
        <MdHome size={23}/>
        <span>Home</span>
      </li>

      <li>
        <MdSubscriptions size={23}/>
        <span>Subscribtions</span>
      </li>

      <li>
        <MdThumbUp size={23}/>
        <span>Liked Video</span>
      </li>

      <li>
        <MdHistory size={23}/>
        <span>History</span>
      </li>

      <li>
        <MdLibraryBooks size={23}/>
        <span>Library</span>
      </li>

      <li>
        <MdSentimentDissatisfied size={23}/>
        <span>I don't Know</span>
      </li>

      <hr/>  {/*its a line*/}

      <li>
        <MdExitToApp size={23}/>
        <span>Log Out</span>
      </li>

      <hr/>
    </nav>
  )
}

export default Sidebar
