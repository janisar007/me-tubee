import React from "react";
import "./_sidebar.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/auth.action";

import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdSentimentDissatisfied,
} from "react-icons/md";
import { Link } from "react-router-dom";

function Sidebar({ sidebar, handleToggleSidebar }) {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav
      className={sidebar ? "sidebar open" : "sidebar"}
      onClick={() => handleToggleSidebar()}
    >
      {" "}
      {/*if sidebar is true we want both the classes else only sidebar*/}
      <li>
        <MdHome size={23} />
        <span>Home</span>
      </li>
      <Link to="/feed/subscriptions">
        <li>
          <MdSubscriptions size={23} />
          <span>Subscribtions</span>
        </li>
      </Link>
      <li>
        <MdThumbUp size={23} />
        <span>Liked Video</span>
      </li>
      <li>
        <MdHistory size={23} />
        <span>History</span>
      </li>
      <li>
        <MdLibraryBooks size={23} />
        <span>Library</span>
      </li>
      <li>
        <MdSentimentDissatisfied size={23} />
        <span>I don't Know</span>
      </li>
      <hr /> {/*its a line*/}
      <li onClick={logoutHandler}>
        <MdExitToApp size={23} />
        <span>Log Out</span>
      </li>
      <hr />
    </nav>
  );
}

export default Sidebar;
