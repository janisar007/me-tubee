import React, { useState } from "react";
import "./_header.scss";

import { FaBars } from "react-icons/fa"; //fa:font awsome.
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md"; //md: material design.
import { useNavigate } from "react-router-dom";

function Header({ handleToggleSidebar }) {
  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
  };

  return (
    <div className="header">
      <FaBars
        className="header__menu"
        size={26}
        onClick={() => handleToggleSidebar()}
      />{" "}
      {/*three lines*/}
      <img
        src="https://pngimg.com/uploads/youtube/youtube_PNG2.png"
        alt=""
        className="header__logo"
      />
      {/*form>input+button*/}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>
      {/*i also goning to add some dommy icons(dic)*/}
      <dic className="header__icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img
          src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png"
          alt="avatar"
        />
      </dic>
    </div>
  );
}

export default Header;
