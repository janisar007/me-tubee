import React from 'react';
import './_video.scss';

import { AiFillEye } from 'react-icons/ai';

function Video() {
  return (
    <div className="video">

      <div className="video__top">
        <img src='https://i.ytimg.com/vi/iXPe1W4Zuho/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLD9jYu0IPDi4keqAjd5fMFHBI72ew' alt=''/>
        <span>05:43</span>
      </div>

      <div className="video__title">
        Create app in 5 minutes #made by shubhas chandra bos
      </div>

      <div className="video__details">
        <span>
          <AiFillEye/> 5m Views •
        </span>
        <span>5 days ago</span>
      </div>
      <div className="video__channel">
        <img src='https://yt3.ggpht.com/-MtFGUi2B1IfGiGWdLCk48gqk5Gb5TpqKNEXrI5Nou15fTFK2PgTP-nI852SIDnLbdOjy1-x=s68-c-k-c0x00ffffff-no-rj' alt=''/>
        <p>Rainbow Hat Jr</p>
      </div>
    </div>
  );
}

export default Video;

